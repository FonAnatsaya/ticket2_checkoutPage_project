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