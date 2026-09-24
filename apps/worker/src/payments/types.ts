export interface PaymentProvider {
  createVirtualAccount(userId: string, email: string): Promise<{ accountNumber: string; bankName: string }>;
}
