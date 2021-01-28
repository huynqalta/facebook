import Tag from "@entities/tag/tag";
import apiService from "./../apiService";

export default class TicketService {
  getListTicket: () => any;
  constructor() {
    this.getListTicket = async () => {
      const path = `/api/TicketType`;
      return await apiService.executeApi({
        path,
        showSuccess: false,
        showError: false
      });
    };
  }
}
