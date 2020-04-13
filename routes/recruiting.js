const express = require('express');
const router = express.Router();
const cfb = require('cfb-data');
const Alias = require('../models/Alias');

// @route       GET api/recruiting/commits/:team/:year
// @desc        Get the commits for a team in a given year
// @access      Public
router.get('/commits/:team/:year', async (req, res) => {
  try {
    const { team, year } = req.params;
    const result = await cfb.recruiting.getSchoolCommits(team, year);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server error: ' + error.message);
  }
});

// @route       GET api/recruiting/rankings/:year
// @desc        Get team recruiting rankings for a given year
// @access      Public
router.get('/rankings/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const result = await cfb.recruiting.getSchoolRankings(year);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server error: ' + error.message);
  }
});

// @route       GET api/recruiting/allplayers/:year/:group
// @desc        Get the rankings of all rankings in a class.  This will make 80+ requests
// @access      Public
router.get('/allplayers/:year/:group', async (req, res) => {
  try {
    const { year, group } = req.params;
    let hasData = true;
    let page = 1;
    let ranks = [];

    do {
      let data = await cfb.recruiting.getPlayerRankings({
        year: year,
        page: page,
        group: group
      });

      if (data.length) {
        ranks.push(...data);
        page++;
      } else {
        hasData = false;
      }
    } while (hasData);
    res.json(ranks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server error: ' + error.message);
  }
});

// @route       GET api/recruiting//rosterBreakdown/:teamName
// @desc        Get team recruiting rankings for entire roster
// @access      Public
router.get('/rosterBreakdown/:teamName', async (req, res) => {
  try {
    const { teamName } = req.params;
    const alias = await Alias.findOne({ name: teamName.replace('-', ' ') });

    if (alias === null) res.status(404).json('No alias found for ' + teamName);
    if (alias.rosterUrl247 === null)
      res.status(404).json('No 247 roster found for ' + teamName);

    const rosterBreakdown = await cfb.recruiting.getSchoolRosterBreakdown(
      alias.rosterUrl247
    );

    // Get ratings of incoming freshmen
    let freshmanClass = await cfb.recruiting.getSchoolCommits(teamName, 2019);

    // Assign ratings to freshman on roster
    rosterBreakdown.forEach(player => {
      if (player.rating === 'NA') {
        let freshman = freshmanClass.find(f => {
          let freshmanLast = f.name.split(' ')[1];
          let playerLast = player.name.split(' ')[1];
          return freshmanLast === playerLast;
        });

        if (freshman) {
          player.rating = freshman.rating;
          player.link = freshman.link;
          player.stars = freshman.stars;
        }
      }
    });

    // Get Roster to validate players
    let rosterResponse = await cfb.teams.getTeamPlayers(alias.idESPN);
    let roster = rosterResponse.team.athletes;

    //Eliminate unrated/walk-on players and edge cases (graduated seniors, shared names, etc)
    let result = rosterBreakdown.filter(player => {
      return (
        typeof roster.find(rosterPlayer => {
          if (rosterPlayer.position === null) {
            rosterPlayer.position.abbreviation = player.position;
            console.log(rosterPlayer.position.abbreviation);
          }

          return (
            rosterPlayer.lastName.split(' ')[0] === player.name.split(' ')[1] &&
            rosterPlayer.jersey === player.jersey &&
            cfb.recruiting.getPosition(rosterPlayer.position.abbreviation) ===
              player.position
          );
        }) !== 'undefined' && player.rating !== 'NA'
      );
    });

    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server error: ' + error.message);
  }
});

module.exports = router;
