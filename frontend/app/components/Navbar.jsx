import React from 'react'
import Link from 'next/link'


export default function Navbar() {
  return (
    <nav className='flex'> 
    <h1>HelpDesk</h1>
    <Link href="/">Dashboard</Link>
    <Link href="/tickets">Tickets</Link>

    <div> <Link href="/tickets/create" className='flex justify-end'> Create a Ticket</Link></div>

  </nav>
  )
}
