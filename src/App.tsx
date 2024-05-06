import { getTickets } from "./service/serviceTicket";
import { getDiscount } from "./service/serviceTicket";
import { useEffect, useState } from "react";
import "./App.css";
import Cart, { CartTicket, CheckoutTicket } from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tickets, { Ticket } from "./components/Tickets";

function App() {
  const [ticketLists, setTicketLists] = useState<Ticket[]>([]);
  const [checkedoutTickets, setCheckedoutTickets] = useState<CheckoutTicket>(
    {}
  );

  useEffect(() => {
    getTickets()
      .then((response) => {
        setTicketLists(response);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    const cartTicketsString = localStorage.getItem("cartTickets");
    const cartTicketsObject: CheckoutTicket =
      cartTicketsString && JSON.parse(cartTicketsString);
    setCheckedoutTickets(cartTicketsObject);
  }, []);

  const updateCheckedoutTickets = (
    prev: CheckoutTicket,
    ticket: Ticket,
    quantity: number
  ): CheckoutTicket => {
    const updatedCheckedoutTickets = {
      ...prev,
      [ticket.id]: {
        ticket,
        quantity,
      },
    };
    const cartTickets = JSON.stringify(updatedCheckedoutTickets);
    localStorage.setItem("cartTickets", cartTickets);
    return updatedCheckedoutTickets;
  };

  const createdCheckedoutTickets = (ticket: Ticket) => {
    setCheckedoutTickets((prev) => {
      if (prev.hasOwnProperty(ticket.id)) {
        const selectedTicket = prev[ticket.id];
        const ticketQuantity: number = selectedTicket.quantity + 1;
        return updateCheckedoutTickets(prev, ticket, ticketQuantity);
      } else {
        return updateCheckedoutTickets(prev, ticket, 1);
      }
    });
  };

  const increaseOrDecrease = (id: number, operator: string) => {
    setCheckedoutTickets((prev) => {
      const editedTicket = prev[id];
      if (operator === "+") {
        const updatedQuantityTicket: CartTicket = {
          ticket: editedTicket.ticket,
          quantity: editedTicket.quantity + 1,
        };
        return updateCheckedoutTickets(
          prev,
          updatedQuantityTicket.ticket,
          updatedQuantityTicket.quantity
        );
      } else {
        if (editedTicket.quantity === 1) {
          const { [id]: omit, ...rest } = prev;
          const updatedCheckedoutTickets = { ...rest };
          const cartTickets = JSON.stringify(updatedCheckedoutTickets);
          localStorage.setItem("cartTickets", cartTickets);
          return updatedCheckedoutTickets;
        } else {
          const updatedQuantityTicket: CartTicket = {
            ticket: editedTicket.ticket,
            quantity: editedTicket.quantity - 1,
          };
          return updateCheckedoutTickets(
            prev,
            updatedQuantityTicket.ticket,
            updatedQuantityTicket.quantity
          );
        }
      }
    });
  };

  const hasDiscount = async (
    discountCode: string,
    totalPrice: number
  ): Promise<number> => {
    return await getDiscount(discountCode, totalPrice);
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
          hasDiscount={hasDiscount}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
