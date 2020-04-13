const express = require('express');
const router = express.Router();
const cfb = require('cfb-data');

// @route       GET api/teams/
// @desc        Get all the info about FBS teams
// @access      Public
router.get('/', async (req, res) => {
  try {
    const result = await cfb.teams.getTeamList(80);
    res.json(result);
  } catch (error) {
    res.status(500).json('Server error: ' + error.message);
  }
});

// @route       GET api/teams/roster/:teamId
// @desc        Get all players on a given team
// @access      Public
router.get('/roster/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;
    const result = await cfb.teams.getTeamPlayers(teamId);
    const players = result.team.athletes;
    res.json(players);
  } catch (error) {
    res.status(500).json('Server error: ' + error.message);
  }
});

module.exports = router;
