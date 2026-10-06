export type Station = 'kitchen' | 'bar';
export type MenuItem = { id: string; venue_id: string; category_id: string; name: string; description: string; price: number; is_available: boolean; unavailable_reason?: string; station: Station; is_batchable: boolean; batch_qty_remaining?: number };
