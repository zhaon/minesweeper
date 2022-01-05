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

    getPosition() {
        return this._position;
    }

    getStatus() {
        return this._status;
    }

    hasMine() {
        return this._hasMine;
    }

    getMineCount() {
        return this._mineCount;
    }

    open(mineCount) {
        if (this._status === StatusEnum.marked ||
            this._status === StatusEnum.opened) {
            return true;
        }
        if (this._hasMine) {
            return false; // game over!
        }
        else {
            this._status = StatusEnum.opened;
            this._mineCount = mineCount;
            return true;
        }
    }

    mark() {
        if (this._status !== StatusEnum.opened) {
            this._status = StatusEnum.marked;
            return true;
        }
        return false;

    }

    doubt() {
        if (this._status !== StatusEnum.opened) {
            this._status = StatusEnum.doubt;
            return true;
        }
        return false;

    }

}

export default Block;