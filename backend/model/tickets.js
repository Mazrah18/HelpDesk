
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: {
    type : String,
    required : true 
  },
  body:  {
    type : String,
    required : true 
  },
  priority: {
    type : String,
    required : true 
  },
  user_email:  {
    type : String,
    required : true 
  }
}, {timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
