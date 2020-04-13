const mongoose = require('mongoose');

const AliasSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  mascot: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  idESPN: {
    type: String,
    required: true
  },
  id247: {
    type: String
  },
  rosterUrl247: {
    type: String
  },
  idFox: {
    type: String
  }
});

module.exports = mongoose.model('alias', AliasSchema);
