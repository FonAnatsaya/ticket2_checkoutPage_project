import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tickets, { Ticket } from "./components/Tickets";
import { ticketListsData } from "./ConstantData";

function App() {
  const [ticketLists, setTicketLists] = useState<Ticket[]>(ticketListsData);
  const [checkedoutTickets, setCheckedoutTickets] = useState<Ticket[]>([]);

  const createdCheckedoutTickets = (ticket: Ticket) => {
    setCheckedoutTickets((prev: Ticket[]) => [...prev, ticket]);
  };

  return (
    <div className="App">
      <Header />
      <div className="App__Content">
        <Tickets
          tickets={ticketLists}
          createdCheckedoutTickets={createdCheckedoutTickets}
        />
        <Cart tickets={ticketLists} checkedoutTickets={checkedoutTickets} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
