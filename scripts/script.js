'use strict';

const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const transaction = document.getElementById('transaction');
const amount = document.getElementById('amount');

// support functions
const updateLocalStorage = function(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}


const updateValues = function(){
  const amounts = transactions.map((transaction) => transaction.amount);

  // method chaining

  const income  = amounts.filter((amount) => amount > 0).reduce((acc,amount) => acc + amount, 0).toFixed(2);
  const expense  = amounts.filter((amount) => amount < 0).reduce((acc,amount) => acc + amount, 0).toFixed(2);
  const total = amounts.reduce((acc,amount) => acc + amount ,0).toFixed(2);

  moneyPlus.innerHTML = `${income}`;
  moneyMinus.innerHTML = `${expense}`;
  balance.innerHTML = `${total}`;
};



// Getting the data already available in database
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

//we create local copy of data base( we follow clean method)
let transactions = localStorageTransactions !== null ? localStorageTransactions : [];

const addTransactionDom = function(transaction) {
  //get sign

  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  //Add class based on sign/value

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML =`
    ${transaction.transaction} <span>${sign}${Math.abs(transaction.amount)}</span> 
    <button  class="delete-btn" onclick = "removeTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);
    updateLocalStorage();
};

const removeTransaction = function(id){
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  updateValues();
  init();
};

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(transaction.value.trim() === '' || amount.value.trim() === ''){
      alert('please add Transaction Details');
    }
  
    const transactionDetails ={
      id: Math.floor(Math.random()*10000),
      transaction: transaction.value,
      amount: Number(amount.value)
    };
  
    transactions.push(transactionDetails);
  
    addTransactionDom(transactionDetails);
    updateValues();
    updateLocalStorage();
  
    transaction.value = '';
    amount.value = '';
  });

const init = function(){
  list.innerHTML = '';
  transactions.forEach(addTransactionDom);
  updateValues();
}

init();



// let transactionsArray = [
//   {id:1, transaction:'books',amount:-100},
//   {id:2, transaction:'coffee',amount:-100},
//   {id:3, transaction:'salary',amount:600},
//   {id:4, transaction:'breakFast',amount:-200}
// ];

// const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : transactionsArray;



// // updated values

// const updatedValues = function(){
//   const amounts = transactions.map((transaction) => transaction.amount);

//   const plusTransactions = amounts.filter((amount) => amount > 0);
//   const minusTransactions = amounts.filter((amount) => amount < 0);

//   const incomeValue = plusTransactions.reduce((acc,amount) => acc + amount, 0);
//   const expenseValue = minusTransactions.reduce((acc,amount) => acc + amount, 0);

//   moneyPlus.innerHTML = incomeValue;
//   moneyMinus.innerHTML = expenseValue;
//   balance.innerHTML = incomeValue + expenseValue;
// };
// // updatedValues();

// //initial functions

// const init = function(){
//   list.innerHTML = '';
//   transactions.forEach(addTransactionDom);
//   updatedValues();
// }




// const addTransactionDom = function(transaction) {
//   //get sign

//   const sign = transaction.amount < 0 ? '-' : '+';
//   const item = document.createElement('li');

//   //Add class based on sign/value

//   item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

//   item.innerHTML =`
//     ${transaction.transaction} <span>${sign}${Math.abs(transaction.amount)}</span> 
//     <button  class="delete-btn" onclick = "removeTransaction(${transaction.id})">X</button>
//     `;

//     list.appendChild(item);
// };


// // transactions.forEach(transaction => addTransactionDom(transaction));

// const updateLocalStorage = function(){
//   localStorage.setItem('transactions',JSON.stringify(transactions));
// }

// const removeTransaction = function(id){
//   transactions = transactions.filter((transaction) => transaction.id !== id);
//   updateLocalStorage();
//   init();
// };

// form.addEventListener('submit',(e)=>{
//   e.preventDefault();
//   if(transaction.value.trim() === '' || amount.value.trim() === ''){
//     alert('please add Transaction Details');
//   }

//   const transactionDetails ={
//     id: Math.floor(Math.random()*10000),
//     transaction: transaction.value,
//     amount: Number(amount.value)
//   };

//   transactions.push(transactionDetails);

//   addTransactionDom(transactionDetails);
//   updatedValues();
//   updateLocalStorage();

//   transaction.value = '';
//   amount.value = '';
// });

// // starting initial values
// init();