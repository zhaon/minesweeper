import Ground from "./Ground.js";
import read from './read.js';
import View from "./View.js";

let ground = new Ground();
const view = new View();

while (true) {
    view.draw(ground);
    const command = await read.readLine();
    if (command.trim()) {
        let arr = command.split(' ');
        let x = 0;
        let y = 0;
        let z = 0;
        if (arr.length >= 3) {
            x = parseInt(arr[1]);
            y = parseInt(arr[2]);
            z = parseInt(arr[3]);
        }
        switch (arr[0]) {
            case 'open':
            case 'o':
                ground.open(x, y);
                break;
            case 'mark':
            case 'm':
                ground.mark(x, y);
                break;
            case 'unmark':
            case 'u':
                ground.unmark(x, y);
                break;
            case 'check':
            case 'c':
                ground.check(x, y);
                break;
            case 'clear':
                break;
            case 'restart':
                ground = new Ground(x ? x : 9, y ? y : 9, z ? z : 10);
                break;
            case 'quit':
            case 'q':
                console.log('Bye!');
                process.exit(0);
            case 'help':
                ground.isShowHelpMsg(true);
                break;
        }
    }
}