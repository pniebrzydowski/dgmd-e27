import SHA256 from "crypto-js/sha256";

interface BlockInfo {
  readonly sender: string;
  readonly recipient: string;
  readonly quantity: number;
}

interface GenesisBlockInfo {
  readonly isGenesisBlock: true;
}

interface Block {
  index: number;
  current_time: string;
  info: BlockInfo | GenesisBlockInfo;
  nextHash?: string;
  hash?: string;
  computeHash: () => string;
}

class BlockCrypto implements Block {
  hash?: string | undefined;
  
  constructor(readonly index: number, readonly current_time: string, readonly info: BlockInfo | GenesisBlockInfo, readonly nextHash = " ") {
    this.hash = this.computeHash();
  }
  computeHash() {
    return SHA256(this.info + this.nextHash + this.current_time + JSON.stringify(this.info)).toString();
  }
}

class Blockchain {
  block1chain: Block[];

  constructor() {
    this.block1chain = [this.initGenesisBlock()];
  }
  initGenesisBlock() {
    return new BlockCrypto(0, "06/04/2021", {isGenesisBlock: true}, "0");
  }
  latestBlock() {
    return this.block1chain[this.block1chain.length - 1];
  }
  addNewBlock(newBlock: Block) {
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

thecoin.addNewBlock(
  new BlockCrypto(2, "07/04/2021", { sender: "Anita Vyona", recipient: "Felix Mush", quantity: 349 })
);

thecoin.addNewBlock(
  new BlockCrypto(3, "10/04/2022", {
    sender: "Patrick Niebrzydowski",
    recipient: "Dr. Rupananda Misra",
    quantity: 10000,
  })
);

console.log(JSON.stringify(thecoin, null, 4));
