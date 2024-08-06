const express = require('express')
const {
  getTickets, 
  getTicket, 
 createTickets,
 deleteTickets 
//   updateWorkout
} = require('../controller/useTickets')

const router = express.Router()

// GET all workouts
router.get('/', getTickets)
router.get('/:id', getTicket)
router.post('/', createTickets)

router.delete('/:id', deleteTickets)

module.exports = router