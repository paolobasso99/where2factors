const mongoose = require('mongoose');

const { Schema } = mongoose;

const websiteSchema = new Schema({
  name: String,
  host: {
    type: String,
    unique: true,
  },
  domain: String,
  twitter: String,
  facebook: String,
  email_address: String,
  img: String,
  doc: String,
  tfa: [String],
  exception: String,
  status: String,
});

module.exports = mongoose.model('Website', websiteSchema);
