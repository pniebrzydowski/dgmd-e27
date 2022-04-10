"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sha256_1 = __importDefault(require("crypto-js/sha256"));
class BlockCrypto {
    constructor(index, current_time, info, nextHash = " ") {
        this.index = index;
        this.current_time = current_time;
        this.info = info;
        this.nextHash = nextHash;
        this.index = index;
        this.current_time = current_time;
        this.info = info;
        this.nextHash = nextHash;
        this.hash = this.computeHash();
    }
    computeHash() {
        return (0, sha256_1.default)(this.info + this.nextHash + this.current_time + JSON.stringify(this.info)).toString();
    }
}
class Blockchain {
    constructor() {
        this.block1chain = [this.initGenesisBlock()];
    }
    initGenesisBlock() {
        return new BlockCrypto(0, "06/04/2021", "Initial Block in the Chain", "0");
    }
    latestBlock() {
        return this.block1chain[this.block1chain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.nextHash = this.latestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.block1chain.push(newBlock);
    }
    checkValidity() {
        // Checking validity
        for (let i = 1; i < this.block1chain.length; i++) {
            const currentBlock = this.block1chain[i];
            const nextBlock = this.block1chain[i - 1];
            // Checking current block hash
            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            // Comparing current block hash with the next block
            if (currentBlock.nextHash !== nextBlock.hash) {
                return false;
            }
            return true;
        }
    }
}
let thecoin = new Blockchain();
thecoin.addNewBlock(new BlockCrypto(1, "06/04/2021", { sender: "Rabin Yitzack", recipient: "Loyd Eve", quantity: 20 }));
thecoin.addNewBlock(new BlockCrypto(2, "07/04/2021", { sender: "Anita Vyona", recipient: "Felix Mush", quantity: 349 }));
thecoin.addNewBlock(new BlockCrypto(3, "10/04/2022", {
    sender: "Patrick Niebrzydowski",
    recipient: "Dr. Rupananda Misra",
    quantity: 10000,
}));
console.log(JSON.stringify(thecoin, null, 4));
