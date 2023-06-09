const round = (num) => Math.round((num + Number.EPSILON) * 100000) / 100000;

function ConvertHandler() {
    this.getNum = (input) => {
        const numberRe = /^(\d*((?<=\d)\.(?=\d))?\d+)?\/?(\d*((?<=\d)\.(?=\d))?\d+)?(?= ?\w* *$)/;
        const unitOnlyRe = /^(gal)$|^(L)$|^(mi)$|^(km)$|^(lbs)$|^(kg)$/i;

        if (unitOnlyRe.test(input)) return 1;
        if (numberRe.test(input)) {
            return round(eval(input.match(numberRe)[0])); //eslint-disable-line
        }
        return null;
    };

    this.getUnit = (input) => {
        const unitRe = /(^(gal)$|^(L)$|^(mi)$|^(km)$|^(lbs)$|^(kg)$)|((?<=\d ?)(gal|L|mi|km|lbs|kg)$)/i;
        if (unitRe.test(input)) {
            if (input.match(unitRe)[0] === 'l' || input.match(unitRe)[0] === 'L') return 'L';
            return input.match(unitRe)[0].toLowerCase();
        }
        return null;
    };

    this.getReturnUnit = (initUnit) => {
        const lowerInitUnit = initUnit?.toLowerCase();
        let result;
        switch (lowerInitUnit) {
        case 'gal':
            result = 'L';
            break;
        case 'l':
            result = 'gal';
            break;
        case 'mi':
            result = 'km';
            break;
        case 'km':
            result = 'mi';
            break;
        case 'lbs':
            result = 'kg';
            break;
        case 'kg':
            result = 'lbs';
            break;
        default:
            result = null;
            break;
        }
        return result;
    };

    this.spellOutUnit = (unit) => {
        const lowerUnit = unit?.toLowerCase();
        let result;
        switch (lowerUnit) {
        case 'gal':
            result = 'gallons';
            break;
        case 'l':
            result = 'liters';
            break;
        case 'mi':
            result = 'miles';
            break;
        case 'km':
            result = 'kilometers';
            break;
        case 'lbs':
            result = 'pounds';
            break;
        case 'kg':
            result = 'kilograms';
            break;
        default:
            result = null;
            break;
        }
        return result;
    };

    this.convert = (initNum, initUnit) => {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let result;
        const lowerInitUnit = initUnit?.toLowerCase();
        switch (lowerInitUnit) {
        case 'gal':
            result = round(initNum * galToL);
            break;
        case 'l':
            result = round(initNum * (1 / galToL));
            break;
        case 'mi':
            result = round(initNum * miToKm);
            break;
        case 'km':
            result = round(initNum * (1 / miToKm));
            break;
        case 'lbs':
            result = round(initNum * lbsToKg);
            break;
        case 'kg':
            result = round(initNum * (1 / lbsToKg));
            break;
        default:
            result = null;
            break;
        }

        return result;
    };

    this.getString = (initNum, initUnit, returnNum, returnUnit) => {
        if (initNum === null && initUnit === null) return 'invalid number and unit';
        if (initNum === null) return 'invalid number';
        if (initUnit === null) return 'invalid unit';
        if (initUnit && initNum && returnNum && returnUnit) {
            return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
        }
        return 'something went wrong';
    };
}

module.exports = ConvertHandler;
