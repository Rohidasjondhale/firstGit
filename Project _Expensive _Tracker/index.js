const amountInput = document.getElementById("amount");
const descInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");

// Load saved expenses from local storage
window.addEventListener("DOMContentLoaded", loadExpenses);

addBtn.addEventListener("click", () => {
  const amount = amountInput.value;
  const description = descInput.value;
  const category = categoryInput.value;

  if (!amount || !description) {
    alert("Please enter all fields");
    return;
  }

  const expense = {
    id: Date.now(),
    amount,
    description,
    category
  };

  saveExpense(expense);
  displayExpense(expense);

  amountInput.value = "";
  descInput.value = "";
});

function saveExpense(expense) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach(exp => displayExpense(exp));
}

function displayExpense(expense) {
  const li = document.createElement("li");
  li.className = "expense-item";
  li.innerHTML = `
    ${expense.amount} - ${expense.category} - ${expense.description}
    <button onclick="deleteExpense(${expense.id})">Delete Expense</button>
    <button onclick="editExpense(${expense.id})">Edit Expense</button>
  `;
  expenseList.appendChild(li);
}

function deleteExpense(id) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses = expenses.filter(exp => exp.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  expenseList.innerHTML = "";
  loadExpenses();
}

function editExpense(id) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const exp = expenses.find(exp => exp.id === id);

  amountInput.value = exp.amount;
  descInput.value = exp.description;
  categoryInput.value = exp.category;

  deleteExpense(id); // remove old one before re-adding
}
