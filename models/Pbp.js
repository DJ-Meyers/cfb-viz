const mongoose = require('mongoose');

const PbpSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  GameState: {
    type: Object,
    required: true
  },
  Teaser: {
    type: Object
  },
  LineScore: {
    type: Array
  },
  ScoringSummary: {
    type: Array
  },
  DriveSummary: {
    type: Array
  },
  PlayByPlay: {
    type: Array
  },
  GameInfo: {
    type: Object
  },
  TeamStats: {
    type: Object,
    required: true
  },
  TopPerformers: {
    type: Object
  },
  PlayerStats: {
    type: Object
  }
});

module.exports = mongoose.model('pbp', PbpSchema);
