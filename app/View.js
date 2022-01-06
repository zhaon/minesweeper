import chalk from "chalk";
import StatusEnum from './StatusEnum.js';

class View {

    _getColorByMineCount(mineCount) {
        switch (mineCount) {
            case 0: return '   ';
            case 1: return chalk.blue.bold(' ' + mineCount + ' ');
            case 2: return chalk.green.bold(' ' + mineCount + ' ');
            case 3: return chalk.red.bold(' ' + mineCount + ' ');
            case 4: return chalk.yellow.bold(' ' + mineCount + ' ');
            case 5: return chalk.cyan.bold(' ' + mineCount + ' ');
            case 6: return chalk.magenta.bold(' ' + mineCount + ' ');
            case 7: return chalk.bold.cyanBright(' ' + mineCount + ' ');
            case 8: return chalk.bold.black(' ' + mineCount + ' ');
        }
    }

    draw(ground) {
        console.clear();
        if (ground.isLost()) {
            for (let y = 0; y < ground.getRows(); y++) {
                let line = [];
                for (let x = 0; x < ground.getCols(); x++) {
                    let block = ground.getBlock(x, y);
                    line.push(block.hasMine() ? chalk.gray('{') + chalk.gray(x + ',' + y) + ':' + chalk.red('[') + chalk.red.bold(' * ') + chalk.red(']') + chalk.gray('}') : chalk.gray('{') + chalk.gray(x + ',' + y) + ':' + chalk.red('[   ]') + chalk.gray('}'));
                }
                console.log(line.join(' ') + '\n');
            }
            console.log(chalk.bgRed(chalk.white('You lost,game over!')));
        }
        else if (ground.isWin()) {
            for (let y = 0; y < ground.getRows(); y++) {
                let line = [];
                for (let x = 0; x < ground.getCols(); x++) {
                    let block = ground.getBlock(x, y);
                    switch (block.getStatus()) {
                        case StatusEnum.closed:
                            line.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgRgb(153, 153, 153)('   ') + chalk.red(']') + chalk.gray('}'));
                            break;
                        case StatusEnum.opened:
                            line.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + this._getColorByMineCount(block.getMineCount()) + chalk.red(']') + chalk.gray('}'));
                            break;
                        case StatusEnum.marked:
                            line.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgRgb(153, 153, 153).red.bold(' M ') + chalk.red(']') + chalk.gray('}'));
                            break;
                    }
                }
                console.log(line.join(' ') + '\n');
            }
            console.log(chalk.bgGreen(chalk.white('congratulations,you win!')));
        }
        else {
            for (let y = 0; y < ground.getRows(); y++) {
                let line = [];
                for (let x = 0; x < ground.getCols(); x++) {
                    let block = ground.getBlock(x, y);
                    switch (block.getStatus()) {
                        case StatusEnum.closed:
                            line.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgRgb(153, 153, 153)('   ') + chalk.red(']') + chalk.gray('}'));
                            break;
                        case StatusEnum.opened:
                            line.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + this._getColorByMineCount(block.getMineCount()) + chalk.red(']') + chalk.gray('}'));
                            break;
                        case StatusEnum.marked:
                            line.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgRgb(153, 153, 153).red.bold(' M ') + chalk.red(']') + chalk.gray('}'));
                            break;
                        case StatusEnum.doubt:
                            break;
                    }
                }
                console.log(line.join(' ') + '\n');
            }
        }
        console.log(ground.getHelpMsg());
    }

}

export default View;
