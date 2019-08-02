const express = require('express');
const router = express.Router();
const axios = require('axios');
const cfb = require('cfb-data');

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

module.exports = router;
