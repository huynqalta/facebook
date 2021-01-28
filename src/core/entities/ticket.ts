export default class Ticket {
  ticketTypeId: string = "";
  ticketName: string = "";
  description: any = "";
  devices: any = "";
  createdAt: string = "";
  updatedAt: any = "";
  listDevices: Array<string> = [];
  constructor(ticket?) {
    if (ticket) {
      Object.keys(this).forEach((ticketItem) => {
        if (ticket[ticketItem]) {
          this[ticketItem] = ticket[ticketItem];
        }
      });
    }
  }

  createListTicket(listTicket) {
    if (!Array.isArray(listTicket)) return null;
    return listTicket.map((item) => {
      return new Ticket(item);
    });
  }
}
