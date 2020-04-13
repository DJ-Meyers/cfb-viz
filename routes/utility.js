const express = require('express');
const router = express.Router();
const cfb = require('cfb-data');
const rp = require('request-promise');
const cheerio = require('cheerio');
const Alias = require('../models/Alias');
const pbp = require('../models/Pbp');
const mongoose = require('mongoose');
const axios = require('axios');
const fastcsv = require('fast-csv');
const fs = require('fs');

// @route       POST api/utility/aliases
// @desc        Get aliases for all teams and add them to a database
// @access      Public
router.post('/aliases', async (req, res) => {
  try {
    // Get names from ESPN
    const espnData = (await cfb.teams.getTeamList(80)).sports[0].leagues[0]
      .teams;

    // Get URLs from 247
    const teamUrls = {};
    for (let page = 1; page <= 5; page++) {
      const teamListUrl = `https://247sports.com/Season/2018-Football/CollegeTeamTalentComposite/?ViewPath=~%2FViews%2FSkyNet%2FInstitutionRanking%2F_SimpleSetForSeason.ascx&Page=${page}`;

      await rp({
          url: teamListUrl,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
          }
        })
        .then(body => {
          let $ = cheerio.load(body);

          $('li.rankings-page__list-item').each(function (index) {
            let html = $(this);

            let link = html.find('.rankings-page__name-link');
            teamUrls[link.text().trim()] = link.attr('href');
            console.log(link.text().trim(), ':', link.attr('href'));
          });
        })
        .error(error => {
          console.log('error getting links');
          console.log(error);
        });
    }

    //Create array of aliases
    const aliases = [];
    espnData.forEach(async datum => {
      let team = datum.team;
      let url = teamUrls[team.nickname];
      let newAlias = new Alias({
        _id: new mongoose.Types.ObjectId(),
        name: team.nickname,
        mascot: team.name,
        displayName: team.displayName,
        idESPN: team.id,
        id247: team.nickname.replace(' ', '-'),
        rosterUrl247: url
      });

      if (!newAlias.rosterUrl247) console.log(newAlias.name);

      const alias = await newAlias.save();
      aliases.push(alias);
    });

    res.json(aliases);
  } catch (error) {
    res.status(500).json('Server error: ' + error.message);
  }
});

// @route       GET api/utility/pbp
// @desc        Get the Play by Play Data for a given game
// @access      Public
router.post('/pbp', async (req, res) => {
  try {
    for (let week = 1; week <= 15; week++) {
      let gameStates = await getGameIds(2018, 'reg', week);

      for (const game of gameStates) {
        let gamePbp = await getPbp(
          game.GameState.GameId,
          game.GameState.Version
        );
        let newPbp = new pbp({
          _id: new mongoose.Types.ObjectId(),
          GameState: gamePbp.GameState,
          Teaser: gamePbp.Teaser === undefined ? {} : gamePbp.Teaser,
          LineScore: gamePbp.LineScore === undefined ? [] : gamePbp.LineScore,
          ScoringSummary: gamePbp.ScoringSummary === undefined ? [] : gamePbp.ScoringSummary,
          DriveSummary: gamePbp.DriveSummary === undefined ? [] : gamePbp.DriveSummary,
          PlayByPlay: gamePbp.PlayByPlay === undefined ? [] : gamePbp.PlayByPlay,
          GameInfo: gamePbp.ScoringSummary === undefined ? {} : getGameInfo(gamePbp),
          TeamStats: gamePbp.TeamStats === undefined ? {} : gamePbp.TeamStats,
          TopPerformers: gamePbp.TopPerformers === undefined ? {} : gamePbp.TopPerformers,
          PlayerStats: gamePbp.PlayerStats === undefined ? {} : gamePbp.PlayerStats
        });

        // newPbp.save(function(err) {
        //   if (err) {
        //     throw err;
        //   }
        // });
      }

      console.log(`Week ${week} added`);
    }

    console.log('done');
    res.json('Games added successfully');
  } catch (error) {
    res.status(500).json('Server error: ' + error.message);
  }
});


const getGameInfo = async gamePbp => {
  // Team IDs scraped from scores don't seem to match with pbp IDs...
  let team1 = gamePbp.PlayByPlay[0].StartPossessionTeamId;
  let team2 = gamePbp.PlayByPlay[0].EndPossessionTeamId;

  let homeId = -1,
    awayId = -1;

  if (ScoringSummary[0].HomeScore !== 0) {
    homeId = ScoringSummary[0].TeamId;
    awayId = homeId === team1 ? team2 : team1;
  } else {
    awayId = ScoringSummary[0].TeamId;
    homeId = awayId === team1 ? team2 : team1;
  }
};

const getGameIds = async (season, seasonType, week) => {
  const res = await axios.get(
    `https://api.foxsports.com/sportsdata/v1/live/cfb/scores.json?season=${season}&seasonType=${seasonType}&week=${week}&apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
  );

  return res.data;
};

const getPbp = async (gameId, version) => {
  try {
    const res = await axios.get(
      `https://api.foxsports.com/sportsdata/v1/live/cfb/games/${gameId}.json?version=${version}&apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
    );

    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

router.get('/stats', async (req, res) => {
  try {
    const teams = await axios.get('https://api.collegefootballdata.com/teams/fbs');
    let output = [];
    const pArray = teams.data.map(async team => {
      let teamString = team.school.replace(' ', '%20');
      teamString = teamString.replace('&', '%26');

      let stats = await axios.get(`https://api.collegefootballdata.com/stats/season?year=2018&team=${teamString}`);
      let statRow = {
        team: team.school
      }

      stats.data.forEach(stat => {
        statRow[stat.statName] = stat.statValue;
      });

      output.push(statRow);
    })

    const statsJson = await Promise.all(pArray);
    const ws = fs.createWriteStream("C:/Users/djmey/OneDrive/Desktop/2018stats.csv");
    fastcsv.write(output, {
      headers: true
    }).pipe(ws);




    res.send('ay');
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/addFoxIds', async (req, res) => {
  try {
    const teamIds = [];
    await rp({
        url: 'https://www.foxsports.com/college-football/teams',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
        }
      })
      .then(body => {
        let $ = cheerio.load(body);

        $('div.wisbb_teamSection').each(function (index) {
          let html = $(this);

          let img = html.find('img').attr('src');
          let slashes = img.split('/');
          let file = slashes[slashes.length - 1];
          let periods = file.split('.');
          let id = periods[0];
          let name = html.find('img + span').text();

          teamIds.push({
            name,
            id
          });
        });
      })
      .error(error => {
        console.log('error getting links');
        console.log(error);
      });

    for (let i = 0; i < teamIds.length; i++) {
      const alias = await Alias.findOne({
        name: teamIds[i].name
      });

      if (alias) {
        alias.idFox = teamIds[i].id;
        await alias.save();
      } else {
        console.log('Could not find team', teamIds[i].name, teamIds[i].id);
      }
    }

    res.json('Games added successfully');
  } catch (error) {
    res.status(500).json('Server error: ' + error.message);
  }
});

router.get('/UF/:week', async (req, res) => {
  try {
    const week = req.params.week;
    const pbp = await axios.get(
      `https://api.collegefootballdata.com/plays?seasonType=regular&year=2019&week=${week}&offense=Florida`
    );

    const plays = [];
    const dontCare = ['Kickoff', 'Timeout', 'End Period', 'End of Half'];
    pbp.data.forEach(play => {
      if (!dontCare.includes(play.play_type))
        plays.push({
          Opponent: play.defense,
          Quarter: play.period,
          Time: (play.clock.minutes ? play.clock.minutes : '0') +
            ':' +
            (play.clock.seconds ?
              play.clock.seconds >= 10 ?
              play.clock.seconds :
              '0' + play.clock.seconds :
              '00'),
          Down: play.down,
          Distance: play.distance,
          FieldPosition: play.yard_line,
          PointDifferential: play.offense_score - play.defense_score,
          PlayType: play.play_type,
          NetYards: play.yards_gained,
          Success: getSuccess(play)
        });

      console.log(play.play_text);
    });

    res.json(plays);
  } catch (error) {
    res.status(500).json('Server error: ' + error.message);
  }
});

const getSuccess = play => {
  switch (play.down) {
    case 1:
      return play.yards_gained >= (play.distance * 1) / 2;
    case 2:
      return play.yards_gained >= (play.distance * 2) / 3;
    case 3:
    case 4:
    default:
      return play.yards_gained >= play.distance;
  }
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = router;