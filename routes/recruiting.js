const express = require('express');
const router = express.Router();
const cfb = require('cfb-data');

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

module.exports = router;
