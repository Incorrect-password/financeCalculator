//total amount = borrowed + maybe 500 + maybe 500 - 5%
let borrowed: number = Number(document.querySelector('#borrowed').value)
let expectedSalary: number = Number(document.querySelector('#expectedSalary').value)
let repaymentPercentage: number = Number(document.querySelector('#repaymentPercentage').value)

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault()
    document.querySelector('#borrowed #expectedSalary #repaymentPercentage').addEventListener('input', function() {
       //can you have multiple selectors like this?
        //totalBorrowed(borrowed)
    })
})

// function totalBorrowed(borrowed:number):number {
//
//     if (borrowed < 6400) {
//         let total: number = borrowed + (borrowed/100)*5
//         //document.querySelector('#totalBorrowed').innerHTML = String(total)
//         //document.querySelector('#totalFees').innerHTML = (borrowed/100)*5
//         // document.querySelector('#payback').innerHTML = payback(total, expectedSalary, repaymentPercentage)
//         console.log(total)
//         console.log(String(total))
//         return total
//
//     }else if (borrowed < 7200) {
//         let fees: number = ((borrowed/100)*5) + 500
//         let total: number = borrowed + fees
//         // document.querySelector('#totalFees').innerHTML = fees
//         //document.querySelector('#totalBorrowed').innerHTML = String(total)
//         // document.querySelector('#payback').innerHTML = payback(total, expectedSalary, repaymentPercentage)
//
//
//
//     }else if (borrowed < 8000) {
//         let fees: number = ((borrowed/100)*5) + 1000
//         let total: number = borrowed + ((borrowed/100)*5) + 1000
//         // document.querySelector('#totalFees').innerHTML = fees
//         //document.querySelector('#totalBorrowed').innerHTML = String(total)
//         // document.querySelector('#payback').innerHTML = payback(total, expectedSalary, repaymentPercentage)
//
//
//
//     }else{
//         document.querySelector('#borrowed').innerHTML = 'The amount inputted does not match the criteria. Please refresh and start again.'
//     }
//
// }
// totalBorrowed(borrowed)

function payback(total: number, expectedSalary: number, repaymentPercentage: number): number {
    let monthlyPayment:number = ((expectedSalary / 12) / 100) * repaymentPercentage
    let months = (total / monthlyPayment) //round up
    return months
}
payback(100, 25000, 10)


