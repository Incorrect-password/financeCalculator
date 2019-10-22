document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var borrowed = parseInt(document.querySelector('#borrowed').value);
    var expectedSalary = parseInt(document.querySelector('#expectedSalary').value);
    var repaymentPercentage = parseInt(document.querySelector('#repaymentPercentage').value);
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
    function paybackTime(total, expectedSalary, repaymentPercentage) {
        var monthlyPayment = ((expectedSalary / 1200) * repaymentPercentage);
        months = Math.ceil((total / monthlyPayment));
        return months;
    }
    function resultPrint(upFront, total, fullAmount, months) {
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
// window.addEventListener('online', updatedStatus)
// window.addEventListener('offline', updatedStatus)
// document.addEventListener('DomContentLoaded', updatedStatus)
//
// function updatedStatus() {
//     if (navigator.onLine === false) {
//         document.querySelector('.offline').innerHTML = 'You are currently offline, data may not be the latest'
//     } else {
//         document.querySelector('.offline').innerHTML = ''
//     }
// }
