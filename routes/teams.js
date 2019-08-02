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

module.exports = router;
