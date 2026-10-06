export type OrderStatus = 'ordered' | 'preparing' | 'ready' | 'served' | 'cancelled';
export type NormalizedOrder = { id: string; tableId: string; items: Array<{ menuItemId: string; name: string; qty: number; unitPrice: number; notes?: string }>; totalKes: number };
