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
                let lines = [];
                for (let x = 0; x < ground.getCols(); x++) {
                    let block = ground.getBlock(x, y);
                    switch (block.getStatus()) {
                        case StatusEnum.closed:
                            let line = chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgRgb(153, 153, 153)('   ') + chalk.red(']') + chalk.gray('}');
                            if (block.hasMine()) {
                                line = chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.red.bold(' * ') + chalk.red(']') + chalk.gray('}');
                            }
                            lines.push(line);
                            break;
                        case StatusEnum.opened:
                            if (block.isExplode()) {
                                lines.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgRed(chalk.white('*!!')) + chalk.red(']') + chalk.gray('}'));
                            }
                            else {
                                lines.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + this._getColorByMineCount(block.getMineCount()) + chalk.red(']') + chalk.gray('}'));
                            }
                            break;
                        case StatusEnum.marked:
                            if (block.hasMine()) {
                                lines.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgGreen.white.bold(' M ') + chalk.red(']') + chalk.gray('}'));
                            }
                            else {
                                lines.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgRed.white.bold(' M ') + chalk.red(']') + chalk.gray('}'));
                            }
                            break;
                        case StatusEnum.doubt:
                            break;
                    }
                }
                console.log(lines.join(' ') + '\n');
            }
            console.log(chalk(chalk.red('You lost,game over!')));
        }
        else if (ground.isWin()) {
            for (let y = 0; y < ground.getRows(); y++) {
                let lines = [];
                for (let x = 0; x < ground.getCols(); x++) {
                    let block = ground.getBlock(x, y);
                    switch (block.getStatus()) {
                        case StatusEnum.opened:
                            lines.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + this._getColorByMineCount(block.getMineCount()) + chalk.red(']') + chalk.gray('}'));
                            break;
                        case StatusEnum.closed:
                        case StatusEnum.marked:
                            lines.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgGreen.white.bold(' M ') + chalk.red(']') + chalk.gray('}'));
                            break;
                    }
                }
                console.log(lines.join(' ') + '\n');
            }
            console.log(chalk(chalk.green('congratulations,you win!')));
        }
        else {
            for (let y = 0; y < ground.getRows(); y++) {
                let lines = [];
                for (let x = 0; x < ground.getCols(); x++) {
                    let block = ground.getBlock(x, y);
                    switch (block.getStatus()) {
                        case StatusEnum.closed:
                            let line = chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgRgb(153, 153, 153)('   ') + chalk.red(']') + chalk.gray('}');
                            if (block.isCheck()) {
                                line = chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgYellow('   ') + chalk.red(']') + chalk.gray('}');
                                block.resetCheck();
                            }
                            lines.push(line);
                            break;
                        case StatusEnum.opened:
                            lines.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + this._getColorByMineCount(block.getMineCount()) + chalk.red(']') + chalk.gray('}'));
                            break;
                        case StatusEnum.marked:
                            lines.push(chalk.gray('{') + chalk.gray(x + ',' + y + ':') + chalk.red('[') + chalk.bgGreen.white.bold(' M ') + chalk.red(']') + chalk.gray('}'));
                            break;
                        case StatusEnum.doubt:
                            break;
                    }
                }
                console.log(lines.join(' ') + '\n');
            }
        }
        console.log(ground.getHelpMsg());
    }

}

export default View;
