import TicketService from "@api/ticket";
import Ticket from "./../entities/ticket";

export default class TicketInteractor extends TicketService {
  constructor() {
    super();
    const service = new TicketService();

    this.getListTicket = async () => {
      return await service.getListTicket().then((res) => {
        const { pagedData } = res?.data?.data;
        return {
          data: new Ticket().createListTicket(pagedData)
        };
      });
    };
  }
}
