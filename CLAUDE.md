# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Expense/finance tracker starter app used in a Claude Code course
(codewithmosh.com). It is a single-page React app built with Vite. The
codebase intentionally contains a bug, poor UI, and messy code — that is
the starting point for exercises, not necessarily something to "clean up"
unprompted.

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

This is a minimal, single-component Vite + React 19 app:

- `src/main.jsx` — entry point, mounts `<App />` into `#root` inside
  `StrictMode`.
- `src/App.jsx` — contains the entire application: all state
  (`transactions`, form fields, filters), derived totals, and JSX for the
  summary cards, add-transaction form, and filterable transaction table.
  There is no component decomposition, routing, or external state
  management — everything lives in this one file.
- `src/App.css` / `src/index.css` — styling.

Data model: `transactions` is an in-memory array of
`{ id, description, amount, type, category, date }`. `amount` is stored
as a **string** (it comes straight from a text/number input's
`e.target.value`), so any arithmetic on it must explicitly convert with
`Number(...)` first — otherwise `+` will concatenate strings instead of
summing. There is no persistence layer (no localStorage/backend); state
resets on reload.

`type` is either `"income"` or `"expense"`; `category` is one of the
fixed list defined in `App.jsx` (`food`, `housing`, `utilities`,
`transport`, `entertainment`, `salary`, `other`). Totals (`totalIncome`,
`totalExpenses`, `balance`) and the filtered transaction list are derived
inline on every render from the `transactions` array plus the
`filterType`/`filterCategory` state — there are no memoized selectors.
