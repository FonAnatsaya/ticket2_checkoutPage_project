import { useState } from "react";
import "./App.css";
import Cart, { CartTicket, CheckoutTicket } from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tickets, { Ticket } from "./components/Tickets";
import { ticketListsData } from "./ConstantData";

function App() {
  const [ticketLists, setTicketLists] = useState<Ticket[]>(ticketListsData);
  const [checkedoutTickets, setCheckedoutTickets] = useState<CheckoutTicket>(
    {}
  );

  const createdCheckedoutTickets = (ticket: Ticket) => {
    setCheckedoutTickets((prev) => {
      if (prev.hasOwnProperty(ticket.id)) {
        const updateTicket = prev[ticket.id];
        const updated: CartTicket = {
          ticket: updateTicket.ticket,
          quantity: updateTicket.quantity + 1,
        };
        return {
          ...prev,
          [ticket.id]: updated,
        };
      } else {
        const newTicket: CartTicket = {
          ticket: ticket,
          quantity: 1,
        };
        return {
          ...prev,
          [ticket.id]: newTicket,
        };
      }
    });
  };

  const increaseOrDecrease = (id: number, operation: boolean) => {
    // setCheckedoutTickets((prev) => {
    //   const newCheckedoutTickets = new Map(prev);
    //   const tmp = newCheckedoutTickets.get(ticket.id);
    //   if (tmp) {
    //     newCheckedoutTickets.set(ticket.id, { ...ticket, quantity: 1 });
    //   } else {
    //     newCheckedoutTickets.set(ticket.id, { ...ticket, quantity: 1 });
    //   }
    //   return newCheckedoutTickets;
    // });
  };

  return (
    <div className="App">
      <Header />
      <div className="App__Content">
        <Tickets
          tickets={ticketLists}
          createdCheckedoutTickets={createdCheckedoutTickets}
        />
        <Cart
          checkedoutTickets={checkedoutTickets}
          // increaseOrDecrease={increaseOrDecrease}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
