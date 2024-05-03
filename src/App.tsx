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
        const selectedTicket = prev[ticket.id];
        const updatedCart: CartTicket = {
          ticket: selectedTicket.ticket,
          quantity: selectedTicket.quantity + 1,
        };
        return { ...prev, [ticket.id]: updatedCart };
      } else {
        const newCart: CartTicket = {
          ticket,
          quantity: 1,
        };
        return { ...prev, [ticket.id]: newCart };
      }
    });
  };

  const increaseOrDecrease = (id: number, operator: string) => {
    setCheckedoutTickets((prev) => {
      console.log(prev);
      const editedTicket = prev[id];
      if (operator === "+") {
        const updatedQuantityTicket: CartTicket = {
          ticket: editedTicket.ticket,
          quantity: editedTicket.quantity + 1,
        };
        return { ...prev, [id]: updatedQuantityTicket };
      } else {
        if (editedTicket.quantity === 1) {
          const { [id]: omit, ...rest } = prev;
          return { ...rest };
        } else {
          const updatedQuantityTicket: CartTicket = {
            ticket: editedTicket.ticket,
            quantity: editedTicket.quantity - 1,
          };
          return { ...prev, [id]: updatedQuantityTicket };
        }
      }
    });
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
          increaseOrDecrease={increaseOrDecrease}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
