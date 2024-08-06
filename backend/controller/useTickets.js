const Tickets = require('../model/tickets')
const mongoose = require('mongoose')
// get all workouts
const getTickets = async (req, res) => {

   const tickets = await Tickets.find()

  res.status(200).json(tickets)
}

const getTicket = async (req, res) => {
  const id = req.params.id

  try{
    const ticket = await Tickets.findById(id);
    res.status(200).json(ticket)
  }
  catch{
    res.status(404).json({message: 'Ticket not found'})
  }



}

const createTickets = async (req,res) =>{
    const {title,body, priority, user_email} = req.body
    const newTicket = new Tickets({title,body, priority,user_email})
    await newTicket.save()
    res.status(201).json(newTicket)
    }

const deleteTickets = async (req,res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such ticket'})
  }

  const ticket = await Tickets.findByIdAndDelete(id)
  if(!ticket) {
    return res.status(400).json({error: 'No such ticket'})
  }

  res.status(200).json({ticket})
  }


module.exports = {
    getTickets,
    getTicket,
    createTickets,
    deleteTickets
  }