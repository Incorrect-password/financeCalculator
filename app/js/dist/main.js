//total amount = borrowed + maybe 500 + maybe 500 - 5%
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
});
var borrowed = Number(document.querySelector('#borrowed').value);
var expectedSalary = Number(document.querySelector('#expectedSalary').value);
var repaymentPercentage = Number(document.querySelector('#repaymentPercentage').value);
function totalBorrowed(borrowed) {
    if (borrowed < 6400) {
        var total = void 0;
        total = borrowed + (borrowed / 100) * 5;
        return total;
    }
}
totalBorrowed(borrowed);
