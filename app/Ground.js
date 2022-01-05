import Block from './Block.js';
import StatusEnum from './StatusEnum.js';

class Ground {

    constructor(rows, cols, minesCount) {
        let mines = this._generatorMines(rows * cols, minesCount);
        let index = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let block = new Block(c, r, mines.indexOf(index++) >= 0 ? true : false);
                this._blocks.push(block);
            }
        }
    }

    _blocks = [];

    _generatorMines(blockCount, minesCount) {
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

    _findNearbyMineCount(x, y) {
        let minesCount = 0;
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i >= 0 && j >= 0) {
                    let nearbyBlock = this.getBlock(i, j);
                    if (nearbyBlock.hasMine()) {
                        minesCount++;
                    }
                }
            }
        }
        return minesCount;
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
        if (block.hasMine()) {
            console.log('Game over!')
            return false;
        }
        let position = block.getPosition();
        let minesCount = this._findNearbyMineCount(position.x, position.y);
        block.open(minesCount);

        if (minesCount === 0) {
            for (let x1 = (position.x - 1); x1 <= (position.x + 1); x1++) {
                for (let y1 = (position.y - 1); y1 <= (position.y + 1); y1++) {
                    if (x1 >= 0 && y1 >= 0) {
                        let block = this.getBlock(x1, y1);
                        if (block.hasMine()) {
                            continue;
                        }
                        if (block.getStatus() !== StatusEnum.closed) {
                            continue
                        }

                        let minesCount = this._findNearbyMineCount(x1, y1);
                        if (minesCount === 0) {
                            this.open(x1, y1);
                        }
                        else {
                            block.open(minesCount);
                        }

                    }

                }
            }
        }

        return true;
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