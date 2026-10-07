export type PaymentStatus = 'pending' | 'success' | 'failed' | 'cancelled' | 'refunded';
export type PaymentMethod = 'mpesa' | 'cash' | 'card';
<<<<<<< HEAD
export type Payment = { id: string; order_id: string; session_id: string; amount: number; currency: 'KES'; method: PaymentMethod; status: PaymentStatus; phone_number_masked?: string; verified_at?: string };
=======

export interface Payment {
  id: string;
  order_id: string;
  session_id: string;
  amount: number;
  currency: 'KES';
  method: PaymentMethod;
  status: PaymentStatus;
  idempotency_key: string;
  mpesa_checkout_request_id?: string;
  mpesa_merchant_request_id?: string;
  mpesa_receipt_number?: string;
  phone_number_masked?: string;
  raw_callback_payload?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
  verified_at?: string;
}

export interface PaymentAuditEvent {
  id: string;
  payment_id: string;
  event_type: string;
  previous_status?: PaymentStatus;
  new_status?: PaymentStatus;
  source: 'webhook' | 'staff_override' | 'system';
  actor_staff_id?: string;
  created_at: string;
}

>>>>>>> 8f7b31d (feat: digital tableside menu system with dynamic category rail, drinks catalog, and responsive layouts)
