//total amount = borrowed + maybe 500 + maybe 500 - 5%
let borrowed = Number(document.querySelector('#borrowed').value)
let expectedSalary: number = Number(document.querySelector('#expectedSalary').value)
let repaymentPercentage: number = Number(document.querySelector('#repaymentPercentage').value)

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault()
    document.querySelector('#borrowed').addEventListener('input', function() {
       //can you have multiple selectors like this?
        totalBorrowed(borrowed)
    })
})

function totalBorrowed(borrowed:number):number {

    if (borrowed <= 6400) {
        let total: number = borrowed + (borrowed/100)*5
        document.querySelector('#totalBorrowed').innerHTML = '<p>' + total) '</p>'
        document.querySelector('#totalFees').innerHTML = '<p>' + (borrowed/100)*5 + '</p>'
        document.querySelector('#payback').innerHTML = '<p>' + payback(total, expectedSalary, repaymentPercentage) + '</p>'
        return total

    }else if (borrowed <= 7200) {
        let fees: number = ((borrowed/100)*5) + 500
        let total: number = borrowed + fees
        document.querySelector('#totalBorrowed').innerHTML = '<p>' + total) '</p>'
        document.querySelector('#totalFees').innerHTML = '<p>' + fees + '</p>'
        document.querySelector('#payback').innerHTML = '<p>' + payback(total, expectedSalary, repaymentPercentage) + '</p>'

    }else if (borrowed <= 8000) {
        let fees: number = ((borrowed/100)*5) + 1000
        let total: number = borrowed + ((borrowed/100)*5) + 1000
        document.querySelector('#totalBorrowed').innerHTML = '<p>' + total) '</p>'
        document.querySelector('#totalFees').innerHTML = '<p>' + fees + '</p>'
        document.querySelector('#payback').innerHTML = '<p>' + payback(total, expectedSalary, repaymentPercentage) + '</p>'

    }else{
        document.querySelector('#borrowed').innerHTML = 'The amount inputted does not match the criteria. Please refresh and start again.'
    }

}
totalBorrowed(borrowed)

function payback(total: number, expectedSalary: number, repaymentPercentage: number): number {
    let monthlyPayment:number = ((expectedSalary / 12) / 100) * repaymentPercentage
    let months = Math.ceil((total / monthlyPayment))
    return months
}
payback(100, 25000, 10)


