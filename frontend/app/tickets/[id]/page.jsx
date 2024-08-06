import { notFound } from "next/navigation"

export const dynamicParams = false

export async function getStaticParams() {

  const res = await fetch('http://localhost:4000/api/tickets')

  const tickets = await res.json()

  return tickets.map((ticket) =>({
    id:ticket.id
  }))

}

async function getTicket(id) {
  const res = await fetch('http://localhost:4000/api/tickets/' + id, {
    next: {
      revalidate: 60 // use 0 to opt out of using cache
    }
  })
  if(!res.ok){
    notFound()
  }
  return res.json()
}


export default async function TicketDetails({ params }) {
  console.log(params.id)
    const ticket = await getTicket(params.id)
  return (
   <main>
    <nav>
    </nav>
      <h2>TicketDetails</h2>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>

        <button className="card low"> Delete</button>
      </div>

   </main>
  )
}
