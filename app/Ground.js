import Block from './Block.js';
import StatusEnum from './StatusEnum.js';

class Ground {

    constructor(rows = 9, cols = 9, minesCount = 10) {
        this._rows = rows;
        this._cols = cols;
        this._minesCount = minesCount;

        let mines = this._generatorMines(rows * cols, minesCount);
        let index = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let block = new Block(c, r, mines.indexOf(index++) >= 0 ? true : false);
                this._blocks.push(block);
            }
        }
    }

    _rows = 0;
    _cols = 0;
    _minesCount = 0;

    _blocks = [];
    _helpMsg = ['open', 'mark', 'unmark', 'clear', 'restart', 'help'];
    _isShowHelpMsg = false;

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
                if (i >= 0 && j >= 0 && i < this._cols && j < this._rows) {
                    let nearbyBlock = this.getBlock(i, j);
                    if (nearbyBlock.hasMine()) {
                        minesCount++;
                    }
                }
            }
        }
        return minesCount;
    }

    getRows() {
        return this._rows;
    }

    getCols() {
        return this._cols;
    }

    getMinesCount() {
        return this._minesCount;
    }

    getBlock(x, y) {
        for (let block of this._blocks) {
            let position = block.getPosition();
            if (position.x === x && position.y === y) {
                return block;
            }
        }
        return null;
    }

    isLost() {
        let isLost = false;
        for (let block of this._blocks) {
            if (block.hasMine() && block.getStatus() === StatusEnum.opened) {
                isLost = true;
                break;
            }
        }
        return isLost;
    }

    isWin() {
        let isWin = true;
        for (let block of this._blocks) {
            if (!block.hasMine()) {
                if (block.getStatus() === StatusEnum.closed) {
                    isWin = false;
                }
            }
        }
        return isWin;
    }

    open(x, y) {
        let block = this.getBlock(x, y);
        if (!block || block.getStatus() !== StatusEnum.closed) {
            return;
        }

        let nearbyMines = this._findNearbyMineCount(x, y);
        block.open(nearbyMines);

        if (nearbyMines === 0) {
            for (let x1 = (x - 1); x1 <= (x + 1); x1++) {
                for (let y1 = (y - 1); y1 <= (y + 1); y1++) {
                    if (x1 >= 0 && y1 >= 0 && x1 < this._cols && y1 < this._rows) {
                        let nearbyBlock = this.getBlock(x1, y1);
                        if (nearbyBlock.getStatus() !== StatusEnum.closed) {
                            continue
                        }

                        let nearbyMines = this._findNearbyMineCount(x1, y1);
                        if (nearbyMines === 0) {
                            this.open(x1, y1);
                        }
                        else {
                            nearbyBlock.open(nearbyMines);
                        }
                    }
                }
            }
        }
    }

    mark(x, y) {
        let block = this.getBlock(x, y);
        block.mark();
    }

    unmark(x, y) {
        let block = this.getBlock(x, y);
        block.unmark();
    }

    doubt(x, y) {
        let block = this.getBlock(x, y);
        block.doubt();
    }

    isShowHelpMsg(state) {
        this._isShowHelpMsg = state ? true : false;
    }

    getHelpMsg() {
        if (this._isShowHelpMsg) {
            this._isShowHelpMsg = false;
            return this._helpMsg;
        }
        return '';

    }

}

export default Ground;