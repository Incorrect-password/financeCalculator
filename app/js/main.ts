document.querySelector('#input').addEventListener('submit', function (e) {
    e.preventDefault()

let borrowed: number = parseInt(document.querySelector('#borrowed').value)
let borrowedLength: number = document.querySelector('#borrowed').value.length
let expectedSalary: number = parseInt(document.querySelector('#expectedSalary').value)
let expectedSalaryLength: number = document.querySelector('#expectedSalary').value.length
let repaymentPercentage: number = parseInt(document.querySelector('#repaymentPercentage').value)
let repaymentPercentageLength: number = document.querySelector('#repaymentPercentage').value.length
let upFront: number
let total: number
let fullAmount: number
let months: number

if (borrowed > 0 && borrowed <= 8000 && repaymentPercentage >= 10 && repaymentPercentage <= 100) {
    upFront = upFrontCalc(borrowed)
    total = totalBorrowed(borrowed)
    fullAmount = fullAmountCalc(total, upFront)
    months = paybackTime(total, expectedSalary, repaymentPercentage)
    resultPrint(upFront, total, fullAmount, months)
}else if (borrowedLength == 0 || expectedSalaryLength == 0 || repaymentPercentageLength == 0) {
    document.querySelector('#resultDisplay').innerHTML = 'Please fill out each of the above fields first'

} else {
    document.querySelector('#resultDisplay').innerHTML = 'read the fucking instructions, alternatively stop fucking about and refresh.'
}

function upFrontCalc(borrowed:number) {
        upFront = borrowed * 0.05
        return upFront
}

function totalBorrowed(borrowed:number):number {

    if (borrowed <= 6400) {
        total = borrowed
        return total

    }else if (borrowed <= 7200) {
        total = borrowed + 500
        return total
    }else if (borrowed <= 8000) {

        total = borrowed + 1000
        return total
    }else{
        document.querySelector('#borrowed').innerHTML = 'The amount inputted does not match the criteria. Please refresh and start again.'
    }
}
function fullAmountCalc(total:number, upFront: number) {
    fullAmount = total + upFront
    return fullAmount
}

function paybackTime(total: number, expectedSalary: number, repaymentPercentage: number): number {
    let monthlyPayment:number = ((expectedSalary / 1200) * repaymentPercentage
    months = Math.ceil((total / monthlyPayment))
    return months
}

function resultPrint(upFront: number, total: number, fullAmount: number, months: number) {
    let source = document.querySelector('#resultsTemplate').innerHTML
    let template = Handlebars.compile(source)
    let data = {
        fees: upFront,
        totals: total,
        fullAmount: fullAmount,
        month: months
    }
    let html = template(data)
    document.querySelector('#resultDisplay').innerHTML = html
}
})

//pwa stuff


window.addEventListener('online', updatedStatus)
window.addEventListener('offline', updatedStatus)
document.addEventListener('DomContentLoaded', updatedStatus)

function updatedStatus() {
    if (navigator.onLine === false) {
        document.querySelector('.offline').innerHTML = 'You are currently offline, data may not be the latest'
    } else {
        document.querySelector('.offline').innerHTML = ''
    }
}




