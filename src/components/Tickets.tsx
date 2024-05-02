import "./Tickets.css";
import React, { Component } from "react";

export type Ticket = {
  title: string;
  descriptionEng: string;
  descriptionThai: string;
  price: number;
  img: string;
};

type TicketListProp = {
  tickets: Ticket[];
  createdCheckedoutTickets: (param: Ticket) => void;
};

const Tickets: React.FC<TicketListProp> = ({
  tickets,
  createdCheckedoutTickets,
}) => {
  return (
    <div className="Tickets">
      <div className="Tickets__TopLabel">Tickets</div>
      {tickets.map((ticket) => {
        return (
          <div className="Tickets__Item1">
            <div className="Tickets__Item1__LeftDetail">
              <div className="Tickets__Item1__LeftDetail__IMG">
                <img src={require(`../assets/tickets/${ticket.img}`)}></img>
              </div>
              <div>
                <h2>{ticket.title}</h2>
                <p>{ticket.descriptionEng}</p>
                <p>{ticket.descriptionThai}</p>
              </div>
            </div>
            <div className="Tickets__Item1__RightDetail">
              <h2>{ticket.price} THB</h2>
              <div className="Tickets__Item1__RightDetail__Button">
                <button onClick={() => createdCheckedoutTickets(ticket)}>
                  Add
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tickets;
