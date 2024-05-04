import "./Cart.css";
import React, { useEffect, useState } from "react";
import { Ticket } from "./Tickets";

export type CartTicket = {
  ticket: Ticket;
  quantity: number;
};

export type CheckoutTicket = {
  [key: number]: CartTicket;
};

type CartProp = {
  checkedoutTickets: CheckoutTicket;
  increaseOrDecrease: (id: number, operator: string) => void;
};

const Cart: React.FC<CartProp> = ({
  checkedoutTickets,
  increaseOrDecrease,
}) => {
  const calculateTotalPrice = () => {
    const totalTicketCarts = Object.values(checkedoutTickets);
    const summaryPrice = totalTicketCarts.reduce(
      (total: number, ticketCart: CartTicket) => {
        const ticketPrice: number =
          ticketCart.quantity * ticketCart.ticket.price;
        return ticketPrice + total;
      },
      0
    );
    return summaryPrice;
  };

  return (
    <div className="Cart">
      <div className="Cart__TicketSummary">
        <div className="Cart__TicketSummary__CartLabel">Cart</div>
        {Object.keys(checkedoutTickets).map((key) => {
          const ticketId = parseInt(key);
          const cartTicket = checkedoutTickets[ticketId];
          return (
            <div
              key={cartTicket.ticket.id}
              className="Cart__TicketSummary__TicketDetails"
            >
              <div className="Cart__TicketSummary__TicketDetails__Left">
                <div className="Cart__TicketSummary__TicketDetails__Left__IMG">
                  <img
                    src={require(`../assets/tickets/${cartTicket.ticket.img}`)}
                    alt={cartTicket.ticket.title}
                  ></img>
                </div>
                <div className="Cart__TicketSummary__TicketDetails__Left__TicketLabel">
                  <h3>{cartTicket.ticket.title}</h3>
                  <h4>{cartTicket.ticket.price} THB</h4>
                </div>
              </div>
              <div className="Cart__TicketSummary__TicketDetails__Right">
                <button
                  onClick={() => increaseOrDecrease(cartTicket.ticket.id, "-")}
                >
                  -
                </button>
                <div>{cartTicket.quantity}</div>
                <button
                  onClick={() => increaseOrDecrease(cartTicket.ticket.id, "+")}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="Cart__PriceSummary">
        <div className=" Cart__PriceSummary__Display">
          <span>Total</span>
          <span>{checkedoutTickets ? calculateTotalPrice() : 0} THB</span>
        </div>
        <div className="Cart__PriceSummary__Display">
          <div className="Cart__PriceSummary__Discount">
            <span>Discount</span>
            <div className="Cart__PriceSummary__Discount__box"></div>
          </div>
          <span>0 THB</span>
        </div>
        <div className=" Cart__PriceSummary__Display">
          <span>Grand Total</span>
          <span>900 THB</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
