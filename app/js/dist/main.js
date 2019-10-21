document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var borrowed = Number(document.querySelector('#borrowed').value);
    var expectedSalary = Number(document.querySelector('#expectedSalary').value);
    var repaymentPercentage = Number(document.querySelector('#repaymentPercentage').value);
    var upFront;
    var total;
    var months;
    if (borrowed > 0 && borrowed <= 8000 && repaymentPercentage >= 10 && repaymentPercentage <= 100) {
        upFront = upFrontCalc(borrowed);
        total = totalBorrowed(borrowed);
        months = paybackTime(total, expectedSalary, repaymentPercentage);
        resultPrint(upFront, total, months);
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
            total = borrowed - upFront;
            return total;
        }
        else if (borrowed <= 7200) {
            total = borrowed + 500 - upFront;
            return total;
        }
        else if (borrowed <= 8000) {
            total = borrowed + 1000 - upFront;
            return total;
        }
        else {
            document.querySelector('#borrowed').innerHTML = 'The amount inputted does not match the criteria. Please refresh and start again.';
        }
    }
    function paybackTime(total, expectedSalary, repaymentPercentage) {
        var monthlyPayment = ((expectedSalary / 12) / 100) * repaymentPercentage;
        var months = Math.ceil((total / monthlyPayment));
        return months;
    }
    function resultPrint(upFront, total, months) {
        var source = document.querySelector('#resultsTemplate').innerHTML;
        var template = Handlebars.compile(source);
        var data = {
            fees: upFront,
            totals: total,
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
