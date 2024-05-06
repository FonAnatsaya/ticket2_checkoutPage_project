import axios from "axios";

export const getTickets = ()=> {
    return axios
      .get("http://localhost:8000/ticketLists")
      .then((response)=> {
        return response.data.ticketListsData;
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
}

export const getDiscount = (discountCode: string, totalPrice:number)=>{
  const discountData = {discountCode, totalPrice};
  return axios.post("http://localhost:8000/discount", discountData).then((response)=>{
    return response.data.discount;
  }).catch((error)=>{
    console.error("Error: ", error);
  })
}