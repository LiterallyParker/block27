import { useState } from "react"

export default function Authenticate({ token, setUser }) {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  async function handleClick(e) {
    e.preventDefault()
    try {
      const respone = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: 'get',
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      const json = await respone.json()
      setError("Fill out the form")
      if (json.success) {
        setError(null)
        setSuccess(json.message)
        setUser(json.data)
      }
    } catch(err) {
      setError(err.message)
    }
  }

  return (
    <div className="authenticate">
      <h2>Authenticate</h2>
      {
        error && <p className="user-error">{error}</p>
      }
      {
        success && <p className="user-success">{success}</p>
      }
      <button onClick={handleClick}>Authenticate</button>
    </div>
  )
}