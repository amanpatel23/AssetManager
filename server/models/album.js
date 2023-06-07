const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const albumSchema = Schema({
  albumName: {
    type: String,
    required: true
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'Image'
  }]
}, {
  timestamps: true
})

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;