const express = require('express');
const router = express.Router();
const axios = require('axios');
const cfb = require('cfb-data');
const pbp = require('../models/Pbp');

// @route       GET api/playbyplay/:year
// @desc        Get all the info about FBS teams
// @access      Public
router.get('/:year', async (req, res) => {
  try {
    const year = req.params.year;
    // const result = await axios.get(
    //   'https://api.collegefootballdata.com/plays?seasonType=regular&year=2018&week=1'
    // );
    const result = await cfb.games.getSummary(400763535);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json('Server error: ' + error.message);
  }
});

router.get('/:year/:team', async (req, res) => {
  try {
    const { year, team } = req.params;
    const plays = await axios.get(
      `https://api.collegefootballdata.com/plays?seasonType=regular&year=${year}&team=${team}`
    );

    let van = plays.data.filter(play => {
      return (
        play.offense === 'Florida' && play.play_text.includes('Van Jefferson')
      );
    });

    van.sort((a, b) => {
      return a.drive_id - b.drive_id;
    });

    vanplays = [];
    van.forEach(play => {
      vanplays.push({
        defense: play.defense,
        period: play.period,
        clock: play.clock.minutes + ':' + play.clock.seconds,
        play_type: play.play_type,
        yards_gained: play.yards_gained,
        play_text: play.play_text
      });
    });
    // console.log(van);
    res.json(vanplays);
  } catch (error) {
    res.status(500).json('Server error: ' + error.message);
  }
});

router.get('/team/:teamFoxId', async (req, res) => {
  try {
    const PlayByPlay = pbp
      .findOne(
        {
          'data.GameState.GameId': req.params.teamFoxId
        },
        { 'data.GameState.$': 1 }
      )
      .exec(function(err, data) {
        console.log(data);
        res.json(data);
      });

    // if (PlayByPlay !== null) console.log('pbp', PlayByPlay);
    // res.json(PlayByPlay);
  } catch (error) {
    res.status(500).json('Server error: ' + error.message);
  }
});

module.exports = router;
