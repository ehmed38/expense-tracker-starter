import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#a67c2e', '#2f6b4a', '#8c2f39', '#3e5c76', '#b08968', '#5b6b6f', '#6b4b6e']

function CategoryChart({ transactions }) {
  const totalsByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((totals, t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount
      return totals
    }, {})

  const data = Object.entries(totalsByCategory).map(([category, amount]) => ({
    category,
    amount,
  }))

  if (data.length === 0) {
    return <p className="empty-note">No expenses logged yet.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#ddd5bd" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="category"
          tick={{ fill: '#746e5d', fontFamily: 'IBM Plex Sans', fontSize: 12 }}
          axisLine={{ stroke: '#ddd5bd' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#746e5d', fontFamily: 'IBM Plex Mono', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => `$${value}`}
          contentStyle={{
            background: '#f8f5eb',
            border: '1px solid #a67c2e',
            borderRadius: 2,
            fontFamily: 'IBM Plex Mono',
            fontSize: 13,
          }}
          cursor={{ fill: 'rgba(166, 124, 46, 0.08)' }}
        />
        <Bar dataKey="amount" radius={[2, 2, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CategoryChart
