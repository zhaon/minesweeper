import Ground from "./Ground.js";
import StatusEnum from './StatusEnum.js';
import read from './read.js';

const cols = 10;
const rows = 10;
const mines = 5;

let ground = new Ground(rows, cols, mines);

function show(gameover) {
    for (let y = 0; y < rows; y++) {
        let line = [];
        for (let x = 0; x < cols; x++) {
            let block = ground.getBlock(x, y);
            if (!gameover) {
                line.push(block.hasMine() ? '[*]' : '[ ]');
                // switch (block.getStatus()) {
                //     case StatusEnum.closed:
                //         line.push('[ ]');
                //         break;
                //     case StatusEnum.opened:
                //         line.push('[' + block.getMineCount() + ']');
                //         break;
                //     case StatusEnum.marked:
                //         line.push('[M]');
                //         break;
                //     case StatusEnum.doubt:
                //         line.push('[?]');
                //         break;
                // }
            }
            else {
                line.push(block.hasMine() ? '[*]' : '[ ]');
            }
        }
        process.stdout.write(line.join(' ') + '\n');
    }
}
show(false);
while (true) {
    process.stdout.write('\n\n\n****************************\n\n');
    process.stdout.write('x:');
    const x = parseInt(await read.readLine());
    process.stdout.write('y:');
    const y = parseInt(await read.readLine());
    process.stdout.write('\n\n\n****************************\n\n');
    show(!ground.open(x, y));

}

