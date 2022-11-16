//All the global variable declared here
let numbers = []
let operator;
let total;

let calScreen = document.querySelector(".cal-screen")
let operatorBtns = document.querySelectorAll(".operator")
let equalbtn = document.querySelector(".equalToBtn")
let resetBtn = document.querySelector("#reset")
let delBtn = document.querySelector("#delete")

let userWillEnterAnotherNum = false;
let userWillEnterDecimalNum = false;

let totalZeroAfterDecimal = 0;



// Addition of two numbers
const add = function (num1, num2) {
    return num1 + num2
}

//Substraction of two number
const substract = function (num1, num2) {
    return num1 - num2
}

//Multiplication of two numbers
const multiply = function (num1, num2) {
    return num1 * num2
}

//Division of two numbers
const divide = function (num1, num2) {
    return num1 / num2
}

//Calculating as per the operator
const operate = function (operator, num1, num2) {

    switch (operator) {
        case "+":
            total = add(num1, num2);
            break;

        case "-":
            total = substract(num1, num2);
            break;

        case "*":
            total = multiply(num1, num2);
            break;

        case "/":
            total = divide(num1, num2);
            break;
    }


    if (!(Number.isInteger(numbers[0])) && !(Number.isInteger(numbers[1]))) {

        let countNumbersAfterDecimal1 = countNumberAfterDecimal(numbers[0])
        let countNumbersAfterDecimal2 = countNumberAfterDecimal(numbers[1])

        if (countNumbersAfterDecimal1 > countNumbersAfterDecimal2) {
            total = Number.parseFloat(total.toFixed(countNumbersAfterDecimal1))
        }
        else {
            total = Number.parseFloat(total.toFixed(countNumbersAfterDecimal2))
        }

    }
    else if (!(Number.isInteger(numbers[0])) || !(Number.isInteger(numbers[1]))) {

        let countNumbersAfterDecimal;

        if (!(Number.isInteger(numbers[0]))) {
            countNumbersAfterDecimal = countNumberAfterDecimal(numbers[0])
        }
        else if (!(Number.isInteger(numbers[1]))) {
            countNumbersAfterDecimal = countNumberAfterDecimal(numbers[1])
        }

        total = Number.parseFloat(total.toFixed(countNumbersAfterDecimal))
    }

    calScreen.innerHTML = total;
    numbers[0] = total;

}

//Getting the number from user
const getNumber = function (num) {

    if (num === "decimal") {
        userWillEnterDecimalNum = true;
    }

    if (userWillEnterDecimalNum) {
        getDecimalNumber(num)

    } else {
        getIntegerNum(num);
    }
}

//getting the operator from user
const getOperator = function (e) {
    userWillEnterAnotherNum = false;
    userWillEnterDecimalNum = false;
    totalZeroAfterDecimal = 0;
    operator = e;

}


//Getting the integer number
const getIntegerNum = function (num) {

    if (operator === undefined) {

        if (userWillEnterAnotherNum) {
            // numbers[0] = screenValue * 10 + num;
            numbers[0] = numbers[0] * 10 + num;
        }
        else {
            // numbers[0] = num;
            numbers[0] = num;
            userWillEnterAnotherNum = true;
        }

        calScreen.innerHTML = numbers[0];

    }
    else {

        if (numbers[0] === undefined) {
            numbers[0] = 0;
        }

        if (userWillEnterAnotherNum) {
            // numbers[0] = screenValue * 10 + num;
            numbers[1] = numbers[1] * 10 + num;
        }
        else {
            // numbers[0] = num;
            numbers[1] = num;
            userWillEnterAnotherNum = true;
        }

        calScreen.innerHTML = numbers[1];

    }
}


//Getting the decimal number
const getDecimalNumber = function (num) {

    if (operator === undefined) {

        if (numbers[0] === undefined) {

            numbers[0] = 0;

            if (!((calScreen.innerHTML).includes("."))) {
                calScreen.innerHTML = `${0}.`;
            }

        } else {

            if (num === "decimal") {

                if (!((calScreen.innerHTML).includes("."))) {
                    calScreen.innerHTML = `${numbers[0]}.`;
                }

                userWillEnterAnotherNum = false;

            } else {

                if (num === 0) {
                    calScreen.innerHTML += num;
                    totalZeroAfterDecimal++;

                }
                else {

                    if (userWillEnterAnotherNum) {
                        let totalNumbersAfterDecimal = countNumberAfterDecimal(numbers[0])
                        let decimalNumber = numbers[0] + num / Math.pow(10, totalNumbersAfterDecimal + 1)
                        numbers[0] = Number.parseFloat(decimalNumber.toFixed(totalNumbersAfterDecimal + 1))
                    }
                    else {

                        if (totalZeroAfterDecimal === 0) {
                            numbers[0] = numbers[0] + num / 10;

                        } else {
                            let decimalNumber = numbers[0] + num / Math.pow(10, totalZeroAfterDecimal + 1)
                            numbers[0] = Number.parseFloat(decimalNumber.toFixed(totalZeroAfterDecimal + 1))
                        }

                        userWillEnterAnotherNum = true;
                    }

                    calScreen.innerHTML = numbers[0];
                }
            }
        }

    }
    else {

        if (num === "decimal") {

            if (!((calScreen.innerHTML).includes("."))) {
                calScreen.innerHTML = `${numbers[1]}.`;
            }

            userWillEnterAnotherNum = false;

        } else {

            if (num === 0) {
                calScreen.innerHTML += num;
                totalZeroAfterDecimal++;

            }
            else {

                if (userWillEnterAnotherNum) {
                    let totalNumbersAfterDecimal = countNumberAfterDecimal(numbers[1])
                    let decimalNumber = numbers[1] + num / Math.pow(10, totalNumbersAfterDecimal + 1)
                    numbers[1] = Number.parseFloat(decimalNumber.toFixed(totalNumbersAfterDecimal + 1))
                }
                else {

                    if (totalZeroAfterDecimal === 0) {
                        numbers[1] = numbers[1] + num / 10;

                    } else {
                        let decimalNumber = numbers[1] + num / Math.pow(10, totalZeroAfterDecimal + 1)
                        numbers[1] = Number.parseFloat(decimalNumber.toFixed(totalZeroAfterDecimal + 1))
                    }
                    userWillEnterAnotherNum = true;

                }

                calScreen.innerHTML = numbers[1];
            }

        }

    }
}

//Reseting the field
const reset = function () {
    numbers = [];
    operator = undefined;
    total = undefined;
    calScreen.innerHTML = 0;
}

//Removing the last digit 
const lastDigitRemover = function () {

    if (Number(calScreen.innerHTML) === total) {
        reset();
    }
    else {

        let totalDigits;

        if (operator === undefined) {

            totalDigits = numbers[0].toString();
            numbers[0] = Number(totalDigits.slice(0, totalDigits.length - 1))

            if (!(numbers[0].toString()).includes(".")) {
                userWillEnterDecimalNum = false;
            }


            calScreen.innerHTML = numbers[0];

        } else {

            totalDigits = numbers[1].toString();
            numbers[1] = Number(totalDigits.slice(0, totalDigits.length - 1))

            if (!(numbers[0].toString()).includes(".")) {
                userWillEnterDecimalNum = false;
            }

            calScreen.innerHTML = numbers[1];

        }
    }
}

//Counting the total number after decimal
const countNumberAfterDecimal = function (decimalNum) {
    if (!(Number.isInteger(decimalNum))) {
        return decimalNum.toString().split('.')[1].length;
    }


}




//Calculating the total on clicking the operator btns
operatorBtns.forEach((e) => {

    e.addEventListener("click", () => {
        // console.log(operator);
        if (numbers[1] != undefined) {
            // console.log("hi");
            operate(operator, numbers[0], numbers[1])
        }

    })

})

//sending operators
operatorBtns[0].addEventListener("click", () => getOperator("+"))
operatorBtns[1].addEventListener("click", () => getOperator("-"))
operatorBtns[2].addEventListener("click", () => getOperator("*"))
operatorBtns[3].addEventListener("click", () => getOperator("/"))


//doing operation by clicking equals to(=) btn
equalbtn.addEventListener("click", () => {

    if (numbers[1] != undefined) {
        operate(operator, numbers[0], numbers[1])
        numbers = numbers.slice(0, 1)
        userWillEnterAnotherNum = false;
    }

})

//reseting all the values
resetBtn.addEventListener('click', reset);

//removing last digit
delBtn.addEventListener('click', () => {
    if (numbers.length != 0) {
        lastDigitRemover();
    }
})


