"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketFiProvider = void 0;
class PocketFiProvider {
    async createVirtualAccount(_userId, _email) {
        return {
            accountNumber: "0239481029",
            bankName: "Wema Bank / PocketFi",
        };
    }
}
exports.PocketFiProvider = PocketFiProvider;
