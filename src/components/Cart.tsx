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
  hasDiscount: (inputCode: string, totalPrice: number) => number;
};

const Cart: React.FC<CartProp> = ({
  checkedoutTickets,
  increaseOrDecrease,
  hasDiscount,
}) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const calculateDiscount = (inputDiscount: string, price: number) => {
    const discountValue: number = hasDiscount(inputDiscount, price);
    setDiscount(discountValue);
  };

  useEffect(() => {
    const totalTicketCarts = Object.values(checkedoutTickets);
    const totalPrice = totalTicketCarts.reduce(
      (total: number, ticketCart: CartTicket) => {
        const ticketPrice: number =
          ticketCart.quantity * ticketCart.ticket.price;
        return ticketPrice + total;
      },
      0
    );
    setTotalPrice(totalPrice);
    calculateDiscount(discountCode, totalPrice);
  }, [checkedoutTickets]);

  const onDiscountCodeChange = (value: string) => {
    setDiscountCode(value);
  };

  const handleApplybutton = () => {
    calculateDiscount(discountCode, totalPrice);
  };
  const netTotal = totalPrice - discount;

  return (
    <div className="Cart">
      <div className="Cart__TicketSummary">
        <div className="Cart__TicketSummary__CartLabel">Cart</div>
        {Object.values(checkedoutTickets).map((cartTicket) => {
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
          <span>{totalPrice} THB</span>
        </div>
        <div className="Cart__PriceSummary__Display">
          <div className="Cart__PriceSummary__Discount">
            <span>Discount</span>
            <input
              className="Cart__PriceSummary__Discount__input"
              placeholder="discount code"
              name="discountValue"
              value={discountCode}
              onChange={(evt) => onDiscountCodeChange(evt.target.value)}
            ></input>
            <button
              className="Cart__PriceSummary__Discount__button"
              onClick={handleApplybutton}
            >
              APPLY
            </button>
          </div>
          <span>{discount} THB</span>
        </div>
        <div className=" Cart__PriceSummary__Display">
          <span>Grand Total</span>
          <span>{netTotal < 0 ? 0 : netTotal}THB</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
