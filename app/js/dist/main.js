//total amount = borrowed + maybe 500 + maybe 500 - 5%
var borrowed = Number(document.querySelector('#borrowed').value);
var expectedSalary = Number(document.querySelector('#expectedSalary').value);
var repaymentPercentage = Number(document.querySelector('#repaymentPercentage').value);
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.querySelector('#borrowed').addEventListener('input', function () {
        //can you have multiple selectors like this?
        totalBorrowed(borrowed);
    });
});
function totalBorrowed(borrowed) {
    if (borrowed <= 6400) {
        var total = borrowed + (borrowed / 100) * 5;
        document.querySelector('#totalBorrowed').innerHTML = '<p>' + total;
        '</p>';
        document.querySelector('#totalFees').innerHTML = '<p>' + (borrowed / 100) * 5 + '</p>';
        document.querySelector('#payback').innerHTML = '<p>' + payback(total, expectedSalary, repaymentPercentage) + '</p>';
        return total;
    }
    else if (borrowed <= 7200) {
        var fees = ((borrowed / 100) * 5) + 500;
        var total = borrowed + fees;
        document.querySelector('#totalBorrowed').innerHTML = '<p>' + total;
        '</p>';
        document.querySelector('#totalFees').innerHTML = '<p>' + fees + '</p>';
        document.querySelector('#payback').innerHTML = '<p>' + payback(total, expectedSalary, repaymentPercentage) + '</p>';
    }
    else if (borrowed <= 8000) {
        var fees = ((borrowed / 100) * 5) + 1000;
        var total = borrowed + ((borrowed / 100) * 5) + 1000;
        document.querySelector('#totalBorrowed').innerHTML = '<p>' + total;
        '</p>';
        document.querySelector('#totalFees').innerHTML = '<p>' + fees + '</p>';
        document.querySelector('#payback').innerHTML = '<p>' + payback(total, expectedSalary, repaymentPercentage) + '</p>';
    }
    else {
        document.querySelector('#borrowed').innerHTML = 'The amount inputted does not match the criteria. Please refresh and start again.';
    }
}
totalBorrowed(borrowed);
function payback(total, expectedSalary, repaymentPercentage) {
    var monthlyPayment = ((expectedSalary / 12) / 100) * repaymentPercentage;
    var months = Math.ceil((total / monthlyPayment));
    return months;
}
payback(100, 25000, 10);
