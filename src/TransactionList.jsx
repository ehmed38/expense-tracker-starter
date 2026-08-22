import { useState } from 'react'

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [confirmingId, setConfirmingId] = useState(null);

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <div>
      <div className="filters">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          aria-label="Filter by type"
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(t => (
            <tr key={t.id}>
              <td className="date-cell" data-label="Date">{t.date}</td>
              <td data-label="Description">{t.description}</td>
              <td data-label="Category">{t.category}</td>
              <td
                className={`amount-cell ${t.type === "income" ? "income-amount" : "expense-amount"}`}
                data-label="Amount"
              >
                {t.type === "income" ? "+" : "-"}${t.amount}
              </td>
              <td data-label="Actions">
                {confirmingId === t.id ? (
                  <span className="confirm-actions">
                    Remove entry?
                    <button
                      className="remove-btn confirm"
                      onClick={() => { onDelete(t.id); setConfirmingId(null); }}
                    >
                      Remove
                    </button>
                    <button className="remove-btn cancel" onClick={() => setConfirmingId(null)}>
                      Keep
                    </button>
                  </span>
                ) : (
                  <button className="remove-btn" onClick={() => setConfirmingId(t.id)}>Remove</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList
