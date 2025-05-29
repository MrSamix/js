// Task 1
let compareTwoNumbers = (a, b) => {
    if (a > b) {
        return 1;
    } 
    else if (a < b) {
        return -1;
    } 
    else {
        return 0;
    }
}
console.log(compareTwoNumbers(5, 10));
console.log(compareTwoNumbers(10, 5));
console.log(compareTwoNumbers(10, 10));


// Task 2
let factorial = (n) => {
    if (n == 0 || n == 1) {
        return 1;
    }
    else {
        return n * factorial(n - 1);
    }
}
console.log(factorial(5));


// Task 3
let concatenateNumber = (number1,number2,number3) => {
    return `${number1}${number2}${number3}`;
}
console.log(concatenateNumber(1, 4, 9));

// Task 4
let calcSquare = (...numbers) => {
    if (numbers.length == 1) {
        return numbers[0] * numbers[0];
    }
    else if(numbers.length == 2) {
        return numbers[0] * numbers[1];
    }
}

console.log(calcSquare(5));
console.log(calcSquare(5, 6));

// Task 5
let perfectNumber = (n) => {
    let sum = 0;
    for (let i = 1; i < n; i++) {
        if (n % i === 0) {
            sum += i;
        }
    }
    return sum === n;
}
console.log('========== Perfect Number =============');
console.log(perfectNumber(6)); 
console.log(perfectNumber(28));
console.log(perfectNumber(12));

// Task 6
let printPerfectNumbers = (min, max) => {
    for (let i = min; i <= max; i++) {
        if (perfectNumber(i)) {
            console.log(i);
        }
    }
}

console.log('========== Perfect Numbers in Range =============');
printPerfectNumbers(1, 1000);

// Task 7
let time = (hour, minute = 0, second = 0) => {
    let formattedHour = hour < 10 ? `0${hour}` : hour;
    minute == 60? (formattedHour++, minute = 0) : formattedHour;
    second == 60? (minute++, second = 0) : minute;
    let formattedMinute = minute < 10 ? `0${minute}` : minute;
    let formattedSecond = second < 10 ? `0${second}` : second;
    return `${formattedHour}:${formattedMinute}:${formattedSecond}`;
}
console.log('========== Time Format =============');
console.log(time(5, 30, 15));
console.log(time(12, 5));
console.log(time(9, 60, 60));

// Task 8
let timeToSeconds = (hour, minute = 0, second = 0) => {
    return hour * 3600 + minute * 60 + second;
}
console.log(timeToSeconds(5, 30, 15) + ' seconds');
console.log(timeToSeconds(12, 5) + ' seconds');

// Task 9
let secondsToTime = (seconds) => {
    let hour = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minute = Math.floor(seconds / 60);
    seconds %= 60;
    return time(hour, minute, seconds);
}
console.log(secondsToTime(3600));

// Task 10
let diferenceBetweenTimes = (hour1, minute1, second1, hour2, minute2, second2) => {
    let totalSeconds1 = timeToSeconds(hour1, minute1, second1);
    let totalSeconds2 = timeToSeconds(hour2, minute2, second2);
    let difference = Math.abs(totalSeconds1 - totalSeconds2);
    
    return secondsToTime(difference);
}
console.log(diferenceBetweenTimes(5, 30, 15, 6, 45, 30));
