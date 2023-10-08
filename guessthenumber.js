const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });
const fs = require('fs');
let minNum = 1;
let maxNum = 100;
let randomNumber = Math.floor(Math.random() * 100 + 1);
let counter = 0;

function log(pathToFile) {
    if (pathToFile) {
        fs.writeFileSync(pathToFile, "");
    }

    return function add(logLine) {
        if (pathToFile) {
            fs.appendFile(pathToFile, logLine, 'utf8', (err) => {
                if (err) {
                    console.log("Error");
                }
            });
        }
        console.log(logLine);
    };
}

function guessTheNumber(response) {
    rl.question("Введите число от 1 до 100: ", (input) => {
        let userNumber = +input;

        if (isNaN(userNumber) || userNumber < minNum || userNumber > maxNum) {
            response("Неверно, введите загаданное число от 1 до 100!");
            return guessTheNumber(response);
        }

        counter++;

        if (userNumber === randomNumber && counter == 1) {
            response(`Вы угадали с первого раза! Это номер: ${randomNumber}. Попытка: ${+counter}\n`);
            rl.close();
            return;
        }

        if (userNumber === randomNumber) {
            response(`Вы угадали! с ${+counter}-й попытки! Это номер: ${randomNumber}!\n`);
            rl.close();
            return;
        }


        if (userNumber > randomNumber) {
            response(`Загаданное число меньше! Вы ввели число: ${userNumber}. Попытка: ${counter}\n`);
        } else {
            response(`Загаданное число больше! Вы ввели число: ${userNumber}. Попытка: ${counter}\n`);
        }

        rl.pause();
        guessTheNumber(response);
    });
}

let response = log('./log');
guessTheNumber(response);
