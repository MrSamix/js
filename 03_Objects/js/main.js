// Task 1
const car = {
    manufacturer: "Toyota",
    model: "Corolla",
    year: 2020,
    avgSpeed: 80, // km/h
    info() {
        console.log(`Manufacturer: ${this.manufacturer}, Model: ${this.model}, Year: ${this.year}, Average speed: ${this.avgSpeed} km/h`);
    },
    travelTime(distance) {
        let time = distance / this.avgSpeed;
        let breaks = Math.floor(time / 4);
        let totalTime = time + breaks;
        console.log(`Time to cover ${distance} km: ${totalTime} h (including ${breaks} breaks)`);
        return totalTime;
    }
};
car.info();
car.travelTime(650);

// Task 2
function Fraction(numerator, denominator) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.print = function() {
        return `${this.numerator}/${this.denominator}`;
    };
    this.add = function(other) {
        const commonDenominator = this.denominator * other.denominator;
        const newNumerator = this.numerator * other.denominator + other.numerator * this.denominator;
        return new Fraction(newNumerator, commonDenominator);
    };
    this.sub = function(other) {
        const commonDenominator = this.denominator * other.denominator;
        const newNumerator = this.numerator * other.denominator - other.numerator * this.denominator;
        return new Fraction(newNumerator, commonDenominator);
    };
    this.mult = function(other) {
        return new Fraction(this.numerator * other.numerator, this.denominator * other.denominator);
    };
    this.div = function(other) {
        if (other.numerator === 0) 
        {
            console.error("Division by zero!");
            return null;
        };
        return new Fraction(this.numerator * other.denominator, this.denominator * other.numerator);
    };
    this.short = function() {
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(this.numerator, this.denominator);
        return new Fraction(this.numerator / divisor, this.denominator / divisor);
    }
}
console.log('============ ADD ==============');
let fraction = new Fraction(1, 2);
let fraction2 = new Fraction(2, 3);
fraction_added = fraction.add(fraction2);
console.log(fraction_added.print());

console.log('============ MULT ==============');
fraction_mult = fraction.mult(fraction2);
console.log(fraction_mult.print());

console.log('============ DIV ==============');
let fraction3 = new Fraction(3, 4);
let fraction4 = new Fraction(6, 5);
fraction_div = fraction3.div(fraction4);
console.log(fraction_div.print());

console.log('============ SUB ==============');
fraction_sub = fraction3.sub(fraction4);
console.log(fraction_sub.print());

console.log('============ SHORT ==============');
let fraction5 = new Fraction(4, 6);
fraction_short = fraction5.short();
console.log(fraction_short.print());

// Task 3
time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    show() {
        let formattedHour = this.hours < 10 ? `0${this.hours}` : this.hours;
        this.minutes == 60? (formattedHour++, this.minutes = 0) : formattedHour;
        this.seconds == 60? (this.minutes++, this.seconds = 0) : this.minutes;
        let formattedMinute = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
        let formattedSecond = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
        console.log(`${formattedHour}:${formattedMinute}:${formattedSecond}`);
    },
    addSeconds(sec) {
        let total = this.hours * 3600 + this.minutes * 60 + this.seconds + sec;
        this.hours = Math.floor((total / 3600) % 24);
        this.minutes = Math.floor((total % 3600) / 60);
        this.seconds = total % 60;
    },
    addMinutes(min) {
        this.addSeconds(min * 60);
    },
    addHours(h) {
        this.addSeconds(h * 3600);
    }
};
time.hours = 20; 
time.minutes = 30; 
time.seconds = 45;
time.show(); // 20:30:45
time.addSeconds(30); 
time.show(); // 20:31:15
time.addMinutes(30);
time.show(); // 21:01:15
time.addHours(3);
time.show(); // 00:01:15
time.addSeconds(-30);
time.show(); // 00:00:45