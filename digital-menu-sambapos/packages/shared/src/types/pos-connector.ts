// packages/shared/src/types/pos-connector.ts
export interface NormalizedOrder {
  posSessionRef: string;
  tableNo: string;
  items: { name: string; qty: number; unitPrice: number; notes?: string }[];
}

export interface POSTicketRef {
  ticketId: string;
  raw?: unknown;
}

export interface POSConnector {
  healthCheck(): Promise<boolean>;
  createTicket(order: NormalizedOrder): Promise<POSTicketRef>;
  updateTicketStatus?(ref: POSTicketRef, status: string): Promise<void>;
  getMenuAvailability?(): Promise<Record<string, boolean>>; // only if SambaPOS instance tracks live stock
}

