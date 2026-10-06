import type { NormalizedOrder } from '../../../../packages/shared/src/types/order';
import type { POSConnector, POSTicketRef } from './POSConnector.interface';
export class MockConnector implements POSConnector { async healthCheck(){ return true; } async createTicket(order: NormalizedOrder): Promise<POSTicketRef>{ return { connector: 'mock', ticketId: `DEMO-${order.id}` }; } async updateTicketStatus(){ return; } }
