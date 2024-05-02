import "./Cart.css";
import React from "react";
import { Ticket } from "./Tickets";

export type CheckedoutTicket = {
  title: string;
  price: number;
  img: string;
};

type CartProp = {
  tickets: Ticket[];
  checkedoutTickets: CheckedoutTicket[];
};

const Cart: React.FC<CartProp> = ({ tickets, checkedoutTickets }) => {
  return (
    <div className="Cart">
      <div className="Cart__TicketSummary">
        <div className="Cart__TicketSummary__CartLabel">Cart</div>
        <div className="Cart__TicketSummary__TicketDetails">
          <div className="Cart__TicketSummary__TicketDetails__Left">
            <div className="Cart__TicketSummary__TicketDetails__Left__IMG">
              IMG
            </div>
            <div className="Cart__TicketSummary__TicketDetails__Left__TicketLabel">
              <h3>Siam Amazing Park</h3>
              <h4>1,000 THB</h4>
            </div>
          </div>
          <div className="Cart__TicketSummary__TicketDetails__Right">
            {" "}
            <button>-</button>
            <div>1</div>
            <button>+</button>
          </div>
        </div>
      </div>
      <div className="Cart__PriceSummary">
        <div className=" Cart__PriceSummary__Display">
          <span>Total</span>
          <span>1,000 THB</span>
        </div>
        <div className="Cart__PriceSummary__Display">
          <div className="Cart__PriceSummary__Discount">
            <span>Discount</span>
            <div className="Cart__PriceSummary__Discount__box"></div>
          </div>
          <span>100 THB</span>
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
