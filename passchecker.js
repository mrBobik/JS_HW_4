function getPasswordChecker(password) {
    return function (correctPassword) {
        if (password === correctPassword) {
            return true;
        } else {
            return false;
        }        
    }
}

const passcheck = getPasswordChecker('12345678');

console.log(passcheck('1234567'));
console.log(passcheck('12345678'))
