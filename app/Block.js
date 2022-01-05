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
        if (this._status === StatusEnum.closed) {
            this._status = StatusEnum.opened;
            this._mineCount = mineCount;
        }
    }

    mark() {

    }

    doubt() {

    }

}

export default Block;