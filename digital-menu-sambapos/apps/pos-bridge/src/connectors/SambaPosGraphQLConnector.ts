import type { NormalizedOrder } from '../../../../packages/shared/src/types/order';
import type { POSConnector, POSTicketRef } from './POSConnector.interface';
/** TODO: confirm SambaPOS V5, Message Server API access, token, and live schema introspection before implementation. */
export class SambaPosGraphQLConnector implements POSConnector { async healthCheck(){ throw new Error('SambaPOS connector not configured'); } async createTicket(_order: NormalizedOrder): Promise<POSTicketRef>{ throw new Error('TODO: implement after venue schema introspection'); } }
