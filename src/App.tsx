import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from './lib/supabaseClient'

function App() {
  const [count, setCount] = useState(0)
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true)
      setError(null)

      // 优先尝试从 client 表查询；若无结果且无错误，再尝试 book 表，方便排查表名问题
      let usedTable = 'book'
      let resp = await supabase.from(usedTable).select('*').limit(50)

      if (resp.error) {
        setError(`${resp.error.message} [table=${usedTable}]`)
      } else {
        setClients(resp.data ?? [])
      }
      setLoading(false)
    }
    fetchClients()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="card" style={{ marginTop: 24 }}>
        <h2>Clients</h2>
        {loading && <p>加载中...</p>}
        {error && <p style={{ color: 'red' }}>错误：{error}</p>}
        {!loading && !error && (
          clients.length > 0 ? (
            <ul>
              {clients.map((c, idx) => (
                <li key={c.id ?? idx}>
                  {typeof c.name !== 'undefined' ? String(c.name) : JSON.stringify(c)}
                </li>
              ))}
            </ul>
          ) : (
            <p>暂无数据</p>
          )
        )}
      </div>
    </>
  )
}

export default App
