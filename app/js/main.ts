//total amount = borrowed + maybe 500 + maybe 500 - 5%
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault()
})
let borrowed: number = Number(document.querySelector('#borrowed').value)
let expectedSalary: number = Number(document.querySelector('#expectedSalary').value)
let repaymentPercentage: number = Number(document.querySelector('#repaymentPercentage').value)

function totalBorrowed(borrowed:number):number {

    if (borrowed < 6400) {
        let total: number
        total = borrowed + (borrowed/100)*5
        return total
    }
}
totalBorrowed(borrowed)