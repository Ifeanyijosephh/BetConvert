export class PocketFiProvider {
    async createVirtualAccount(_userId, _email) {
        return {
            accountNumber: "0239481029",
            bankName: "Wema Bank / PocketFi",
        };
    }
}
