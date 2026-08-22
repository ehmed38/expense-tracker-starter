import { useState } from 'react'
import './App.css'
import Summary from './Summary'
import CategoryChart from './CategoryChart'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "income", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <div className="ledger-page">
        <header className="ledger-header">
          <h1>Finance Ledger</h1>
          <p className="subtitle">Track what comes in and what goes out.</p>
        </header>

        <section className="ledger-section">
          <Summary transactions={transactions} />
        </section>

        <section className="ledger-section category-chart">
          <h2 className="section-title">Spending by category</h2>
          <CategoryChart transactions={transactions} />
        </section>

        <section className="ledger-section">
          <h2 className="section-title">New entry</h2>
          <TransactionForm categories={categories} onAdd={handleAddTransaction} />
        </section>

        <section className="ledger-section">
          <h2 className="section-title">Register</h2>
          <TransactionList transactions={transactions} categories={categories} onDelete={handleDeleteTransaction} />
        </section>
      </div>
    </div>
  );
}

export default App
