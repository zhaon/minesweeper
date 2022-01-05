import Ground from "./Ground.js";
import StatusEnum from './StatusEnum.js';
import read from './read.js';

const cols = 5;
const rows = 5;
const mines = 3;

let ground = new Ground(rows, cols, mines);

function show(gameover) {
    let win = true;
    for (let y = 0; y < rows; y++) {
        let line = [];
        for (let x = 0; x < cols; x++) {
            let block = ground.getBlock(x, y);
            if (!block.hasMine() && (block.getStatus() === StatusEnum.opened || block.getStatus() === StatusEnum.marked)) {
                win = true;
            }
            else {
                win = false;
            }
            if (!gameover) {
                switch (block.getStatus()) {
                    case StatusEnum.closed:
                        line.push(`[${x},${y}:{ ${block.getMineCount() === 0 ? '#' : block.getMineCount()} }]`);
                        // line.push(block.hasMine() ? `[${x},${y}:{${block.getMineCount() === 0 ? ' * ' : block.getMineCount}}]` : `[${x},${y}:{${block.getMineCount() === 0 ? ' ! ' : block.getMineCount}}]`);
                        break;
                    case StatusEnum.opened:
                        line.push(`[${x},${y}:{ ${block.getMineCount() === 0 ? ' ' : block.getMineCount()} }]`);
                        break;
                    case StatusEnum.marked:
                        line.push('[M]');
                        break;
                    case StatusEnum.doubt:
                        line.push('[?]');
                        break;
                }
            }
            else {
                line.push(block.hasMine() ? `[${x},${y}:{${block.getMineCount() === 0 ? ' * ' : block.getMineCount}}]` : `[${x},${y}:{${block.getMineCount() === 0 ? ' ! ' : block.getMineCount}}]`);
            }
        }
        process.stdout.write(line.join(' ') + '\n');

        if (win) {
            console.log("you win!");
        }
    }
}
process.stdout.write('\n\n\n**************************************************************************************************************************************************************************************************************\n\n');
show(false);
process.stdout.write('\n******************************************************************************************************************************************************************************************************************\n\n');
while (true) {
    process.stdout.write('x:');
    const x = parseInt(await read.readLine());
    process.stdout.write('y:');
    const y = parseInt(await read.readLine());
    process.stdout.write('\n\n\n**************************************************************************************************************************************************************************************************************\n\n');
    show(!ground.open(x, y));
    process.stdout.write('\n******************************************************************************************************************************************************************************************************************\n\n');

}

