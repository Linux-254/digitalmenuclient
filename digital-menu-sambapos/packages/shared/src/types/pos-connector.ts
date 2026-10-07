<<<<<<< HEAD
// Scaffold path preserved for the Supabase/Next.js production implementation.
=======
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

>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
