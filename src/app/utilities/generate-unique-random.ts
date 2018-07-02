var generatedNumbers = [];

function generateRandomNumber(precision: number) { // input --> number precision in integer 
    if (precision <= 20) {
        var ran = parseInt(Math.random().toFixed(precision));
        var randomNum = Math.round(ran * Math.pow(10, precision));
        if (generatedNumbers.indexOf(randomNum) > -1) {
            if (generatedNumbers.length == Math.pow(10, precision))
            {
                return "Generated all values with this precision";
            }
            return generateRandomNumber(precision);
        } else {
            generatedNumbers.push(randomNum);
            return randomNum;
        }
    } else
       return "Number Precision shoould not exceed 20";
}


export { generateRandomNumber };