document.querySelector('#input').addEventListener('submit', function (e) {
    e.preventDefault();
    var borrowed = parseInt(document.querySelector('#borrowed').value);
    var borrowedLength = document.querySelector('#borrowed').value.length;
    var expectedSalary = parseInt(document.querySelector('#expectedSalary').value);
    var expectedSalaryLength = document.querySelector('#expectedSalary').value.length;
    var repaymentPercentage = parseInt(document.querySelector('#repaymentPercentage').value);
    var repaymentPercentageLength = document.querySelector('#repaymentPercentage').value.length;
    var upFront;
    var total;
    var fullAmount;
    var months;
    if (borrowed > 0 && borrowed <= 8000 && repaymentPercentage >= 10 && repaymentPercentage <= 100) {
        upFront = upFrontCalc(borrowed);
        total = totalBorrowed(borrowed);
        fullAmount = fullAmountCalc(total, upFront);
        months = paybackTime(total, expectedSalary, repaymentPercentage);
        resultPrint(upFront, total, fullAmount, months);
    }
    else if (borrowedLength == 0 || expectedSalaryLength == 0 || repaymentPercentageLength == 0) {
        document.querySelector('#resultDisplay').innerHTML = 'Please fill out each of the above fields first';
    }
    else {
        document.querySelector('#resultDisplay').innerHTML = 'read the fucking instructions, alternatively stop fucking about and refresh.';
    }
    function upFrontCalc(borrowed) {
        upFront = borrowed * 0.05;
        return upFront;
    }
    function totalBorrowed(borrowed) {
        if (borrowed <= 6400) {
            total = borrowed;
            return total;
        }
        else if (borrowed <= 7200) {
            total = borrowed + 500;
            return total;
        }
        else if (borrowed <= 8000) {
            total = borrowed + 1000;
            return total;
        }
        else {
            document.querySelector('#borrowed').innerHTML = 'The amount inputted does not match the criteria. Please refresh and start again.';
        }
    }
    function fullAmountCalc(total, upFront) {
        fullAmount = total + upFront;
        return fullAmount;
    }
    function paybackTime(borrowed, expectedSalary, repaymentPercentage) {
        var monthlyPayment = ((expectedSalary / 1200) * repaymentPercentage);
        months = Math.ceil((borrowed / monthlyPayment));
        return months;
    }
    function resultPrint(upFront, total, fullAmount, months) {
        upFront = upFront.toFixed(2);
        total = total.toFixed(2);
        fullAmount = fullAmount.toFixed(2);
        var source = document.querySelector('#resultsTemplate').innerHTML;
        var template = Handlebars.compile(source);
        var data = {
            fees: upFront,
            totals: total,
            fullAmount: fullAmount,
            month: months
        };
        var html = template(data);
        document.querySelector('#resultDisplay').innerHTML = html;
    }
});
//pwa stuff
window.addEventListener('online', updatedStatus);
window.addEventListener('offline', updatedStatus);
document.addEventListener('DomContentLoaded', updatedStatus);
function updatedStatus() {
    if (navigator.onLine === false) {
        document.querySelector('.offline').innerHTML = 'You are currently offline';
    }
    else {
        document.querySelector('.offline').innerHTML = '';
    }
}
