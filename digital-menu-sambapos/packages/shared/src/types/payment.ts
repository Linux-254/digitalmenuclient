export type PaymentStatus = 'pending' | 'success' | 'failed' | 'cancelled' | 'refunded';
export type PaymentMethod = 'mpesa' | 'cash' | 'card';
export type Payment = { id: string; order_id: string; session_id: string; amount: number; currency: 'KES'; method: PaymentMethod; status: PaymentStatus; phone_number_masked?: string; verified_at?: string };
