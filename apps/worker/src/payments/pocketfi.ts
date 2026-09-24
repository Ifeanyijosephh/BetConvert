import { PaymentProvider } from "./types.js";

export class PocketFiProvider implements PaymentProvider {
  async createVirtualAccount(_userId: string, _email: string) {
    return {
      accountNumber: "0239481029",
      bankName: "Wema Bank / PocketFi",
    };
  }
}
