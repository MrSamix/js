// Task 1
let age = +prompt("Enter your age:");
if (age >= 0 && age <= 12) {
    alert("You are a child.");
}
else if (age >= 13 && age <= 17) {
    alert("You are a teenager.");
}
else if (age >= 18 && age <= 59) {
    alert("You are an adult.");
}
else if (age >= 60) {
    alert("You are a senior citizen.");
}
else {
    alert("Invalid age entered.");
}

// Task 2
let number = +prompt("Enter a number(0-9):");
switch (number) {
    case 1:
        alert("!")
        break;
    case 2:
        alert("@")
        break;
    case 3:
        alert("#")
        break;
    case 4:
        alert("$")
        break;
    case 5:
        alert("%")
        break;
    case 6:
        alert("^")
        break;
    case 7:
        alert("&")
        break;
    case 8:
        alert("*")
        break;
    case 9:
        alert("(")
        break;
    case 0:
        alert(")")
        break;
    default:
        alert("Invalid number entered.");
        break;
}

// Task 3
threeDigitNumber = +prompt("Enter a three-digit number:");
if (threeDigitNumber >= 100 && threeDigitNumber <= 999) {
    let thirdDigit = threeDigitNumber % 10;
    let secondDigit = parseInt(threeDigitNumber/10) % 10;
    let firstDigit = parseInt(threeDigitNumber/100);

    if (firstDigit === secondDigit && secondDigit === thirdDigit) {
        alert("All digits are the same.");
    } else if (firstDigit === secondDigit || secondDigit === thirdDigit || firstDigit === thirdDigit) {
        alert("Two digits are the same.");
    } else {
        alert("All digits are different.");
    }
}

// Task 4
let year = +prompt("Enter a year:");
let res = year %4 == 0 && year % 100 != 0 || year % 400 == 0 ? true : false;
if (res) {
    alert(year + " is a leap year.");
}
else {
    alert(year + " is not a leap year.");
}

// Task 5
let fiveDigitNumber = prompt("Enter a five-digit number"); // 32323 -> 32323
if (fiveDigitNumber.length === 5 ) {
    let firstDigit = fiveDigitNumber[0];
    let secondDigit = fiveDigitNumber[1];
    let thirdDigit = fiveDigitNumber[2];
    let fourthDigit = fiveDigitNumber[3];
    let fifthDigit = fiveDigitNumber[4];

    let reversedNumber = fifthDigit + fourthDigit + thirdDigit + secondDigit + firstDigit;

    if (fiveDigitNumber === reversedNumber) {
        alert("The number is a palindrome.");
    }
    else {
        alert("The number is not a palindrome.");
    }
}

// Task 6
let usd = +prompt("Enter amount in USD:");
let currency = prompt("Enter currency(EUR, UAH, AZN):")
const currencyValueEur = 0.9;
const currencyValueUah = 41.8;
const currencyValueAzn = 1.7;
switch (currency) {
    case "EUR":
        alert(usd * currencyValueEur + " EUR");
        break;
    case "UAH":
        alert(usd * currencyValueUah + " UAH");
        break;
    case "AZN":
        alert(usd * currencyValueAzn + " AZN");
        break;
    default:
        alert("Invalid currency entered.");
        break;
}

// Task 7
let purchaseAmount = +prompt("Enter purchase amount:");

if (purchaseAmount >= 200 && purchaseAmount <= 300) {
    purchaseAmount *= 0.97;
    alert("Total amount after discount(3%): " + purchaseAmount);
}
else if (purchaseAmount > 300 && purchaseAmount <= 500) {
    purchaseAmount *= 0.95;
    alert("Total amount after discount(5%): " + purchaseAmount);
}
else if (purchaseAmount > 500) {
    purchaseAmount *= 0.93;
    alert("Total amount after discount(7%): " + purchaseAmount);
}
else {
    alert("No discount applicable.");
}

// Task 8
let circleLength = +prompt("Enter the length of the circle:");
let squarePerimeter = +prompt("Enter the perimeter of the square:");

let circleRadius = circleLength / (2 * Math.PI);
let squareSide = squarePerimeter / 4;

if (circleRadius * 2 <= squareSide) {
    alert("The circle can fit inside the square.");
} else {
    alert("The circle cannot fit inside the square.");
}

// Task 9
let question1 = +prompt("Question 1: 2 + 2 = ?\n3\n4\n5");
let question2 = +prompt("Question 2: 3 * 3 = ?\n6\n9\n12");
let question3 = +prompt("Question 3: 5 - 2 = ?\n2\n3\n4");
let score = 0;
if (question1 == 4) {
    score += 2;
}
if (question2 == 9) {
    score += 2;
}
if (question3 == 3) {
    score += 2;
}
alert("Your score: " + score + "/6");

// Task 10
let day = +prompt("Enter a day:");
let month = +prompt("Enter a month:");
let year2 = +prompt("Enter a year:");
if (day > 0 && day <= 31 && month > 0 && month <= 12 && year2 > 0) {
    let res = year2 %4 == 0 && year2 % 100 != 0 || year2 % 400 == 0 ? true : false;
    if (res) {
        if (month == 2 && day == 29) {
            month = 3;
            day = 1;
        }
        if (month == 2 && day == 28)
        {
            day++;
        }
    }
    else {
        if (day == 31 && (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10)) {
            day = 1;
            month++;
        }
        else if (day == 31 && month == 12)
        {
            day = 1
            month = 1
            year2++;
        }
        else if (day == 28 && month == 2)
        {
            month++;
            day = 1;
        }
        else if (day == 30 && (month == 4 || month==6 || month == 9 || month == 11)) // day
        {
            day = 1;
            month++;
        }
        else{
            day++;
        }
    }
    
}
let dayStr = day < 10 ? `0${day}` : day;
let monthStr = month < 10 ? `0${month}`: month;
alert("Next day: " + dayStr + "." + monthStr + "." + year2)