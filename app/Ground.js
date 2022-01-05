import Block from './Block.js';
import StatusEnum from './StatusEnum.js';

class Ground {
    constructor(rows, cols, minesCount) {
        let mines = this.generatorMines(rows * cols, minesCount);
        let index = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let block = new Block(c, r, mines.indexOf(index++) >= 0 ? true : false);
                this._blocks.push(block);
            }
        }
    }
    _blocks = [];

    generatorMines(blockCount, minesCount) {
        let mines = [];
        for (let i = 0; i < minesCount; i++) {
            let num = parseInt(Math.random() * blockCount);
            while (mines.indexOf(num) > 0) {
                num = parseInt(Math.random() * blockCount);
            }
            mines.push(num);
        }
        return mines;
    }

    getBlock(x, y) {
        for (let block of this._blocks) {
            let position = block.getPosition();
            if (position.x === x && position.y === y) {
                return block;
            }
        }
        return this._blocks[0];
    }

    open(x, y) {
        let block = this.getBlock(x, y);
        let position = block.getPosition();
        if (block.getStatus() !== StatusEnum.closed) {
            return;
        }
        let minesCount = 0;
        for (let x = position.x - 1; x <= position.x + 1; x++) {
            for (let y = position.y - 1; y <= position.y + 1; y++) {
                if (x >= 0 && y >= 0) {
                    let nearbyBlock = this.getBlock(x, y);
                    if (nearbyBlock.hasMine()) {
                        minesCount++;
                    }
                }
            }
        }

        if (minesCount === 0) {
            for (let x1 = position.x - 1; x1 <= position.x + 1; x1++) {
                for (let y1 = position.y - 1; y1 <= position.y + 1; y1++) {
                    if (x1 >= 0 && y1 >= 0) {
                        if (x1 !== x && y1 !== y) { // except self
                            this.open(x1, y1);
                        }
                    }
                }
            }
        }
        return block.open(minesCount);
    }

    mark(x, y) {
        let block = this._getBlock(x, y);
        block.mark();
    }

    doubt(x, y) {
        let block = this._getBlock(x, y);
        block.doubt();
    }
}

export default Ground;