# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Expense/finance tracker starter app used in a Claude Code course
(codewithmosh.com). It is a single-page React app built with Vite. The
starter code originally shipped as one messy, single-component file with
an intentional bug — it has since been incrementally fixed and refactored
into separate components (see Architecture below).

## Commands

```bash
npm install     # install dependencies
npm run dev     # start Vite dev server at http://localhost:5173
npm run build   # production build
npm run preview # preview the production build
npm run lint    # run ESLint over the project
```

There is no test suite/framework configured in this repo.

## Architecture

Vite + React 19 app, split into a top-level `App` plus three
presentational/stateful children. There is no routing or external state
management — state is local `useState`, and data flows down via props.

- `src/main.jsx` — entry point, mounts `<App />` into `#root` inside
  `StrictMode`.
- `src/App.jsx` — owns the `transactions` array (the only piece of state
  shared across children) and the fixed `categories` list. Renders
  `Summary`, `TransactionForm`, and `TransactionList`, and passes
  `handleAddTransaction` down to `TransactionForm` as `onAdd`.
- `src/Summary.jsx` — receives the full `transactions` array as a prop
  and derives `totalIncome`, `totalExpenses`, and `balance` itself
  (filter + reduce by `type`). Renders the three summary cards.
- `src/TransactionForm.jsx` — owns its own local form state
  (`description`, `amount`, `type`, `category`). On submit it validates
  (`description` and a positive numeric `amount` are required — see
  `min="0"` on the input and the `Number(amount) <= 0` guard), builds the
  new transaction object (with a `Date.now()` id and today's date), and
  calls the `onAdd` prop with it rather than touching `App`'s state
  directly.
- `src/TransactionList.jsx` — owns its own `filterType`/`filterCategory`
  state, derives `filteredTransactions` from the `transactions` prop, and
  renders the filter dropdowns and the transaction table.
- `src/App.css` / `src/index.css` — styling.

Data model: `transactions` is an in-memory array of
`{ id, description, amount, type, category, date }`. `amount` is a
**number** end-to-end — `TransactionForm` converts the raw input string
with `Number(amount)` before it ever enters the `transactions` array, so
downstream code (e.g. `Summary`'s reducers) can sum `t.amount` directly
without re-converting. There is no persistence layer (no
localStorage/backend); state resets on reload.

`type` is either `"income"` or `"expense"`; `category` is one of the
fixed list defined in `App.jsx` (`food`, `housing`, `utilities`,
`transport`, `entertainment`, `salary`, `other`) and passed down to both
`TransactionForm` and `TransactionList`.
