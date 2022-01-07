import StatusEnum from './StatusEnum.js';

class Block {

    constructor(x, y, hasMine) {
        this._position.x = x;
        this._position.y = y;
        this._hasMine = hasMine;
    }

    _position = { x: 0, y: 0 };
    _mineCount = 0;
    _hasMine = false;
    _status = StatusEnum.closed;
    _isCheck = false;

    getPosition() {
        return this._position;
    }

    getStatus() {
        return this._status;
    }

    isCheck() {
        return this._isCheck;
    }

    resetCheck() {
        this._isCheck = false;
    }

    hasMine() {
        return this._hasMine;
    }

    getMineCount() {
        return this._mineCount;
    }

    open(mineCount) {
        if (this._status === StatusEnum.closed) {
            this._status = StatusEnum.opened;
            this._mineCount = mineCount;
        }
    }

    mark() {
        if (this._status === StatusEnum.closed) {
            this._status = StatusEnum.marked;
        }
    }

    unmark() {
        if (this._status === StatusEnum.marked) {
            this._status = StatusEnum.closed;
        }
    }

    doubt() {

    }

    check() {
        if (this._status === StatusEnum.closed) {
            this._isCheck = true;
        }
    }

    isExplode() {
        return this._hasMine && this._status === StatusEnum.opened;
    }

}

export default Block;