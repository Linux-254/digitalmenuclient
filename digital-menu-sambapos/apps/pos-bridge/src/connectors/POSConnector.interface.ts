import type { NormalizedOrder } from '../../../../packages/shared/src/types/order';
export type POSTicketRef = { connector: string; ticketId: string };
export interface POSConnector { healthCheck(): Promise<boolean>; createTicket(order: NormalizedOrder): Promise<POSTicketRef>; updateTicketStatus?(ref: POSTicketRef, status: string): Promise<void>; getMenuAvailability?(): Promise<Record<string, boolean>>; }
