import { useState } from "react"

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState('')

  function containsNumber(str) {
    return /\d/.test(str)
  }
  function hasUpper(str) {
    const S = str.toLowerCase()
    if (str === S) {
      return false
    }
    return true
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (username.length < 9) {
        throw new Error('Username must be more than 9 characters.')
      }
      if (!containsNumber(username)) {
        throw new Error('Username must contain number.')
      }
      if (password.length < 12) {
        throw new Error('Password must be more than 12 characters.')
      }
      if (!hasUpper(password)) {
        throw new Error('Password must contain 1 capital letter.')
      }
      if (!containsNumber(password)) {
        throw new Error('Password must contain number.')
      }
      const n = Number(username)
      console.log(n)
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "post",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({'username':username,'password':password})
      })
      const json = await response.json()
      setToken(json.token)
      setError(null)
      setSuccess('Success! Please Authenticate.')
    } catch(err) {
      setError(err.message)
      setSuccess(null)
    }
  }
  
  return (
    <div className="sign-up-div">

      <h2>Sign Up</h2>
      {
        error && <p className="user-error">{error}</p>
      }
      {
        success && <p className="user-success">{success}</p>
      }
      <form onSubmit={handleSubmit} className="sign-up-form">
        <label className="sign-up-label">Username:
          <input className="sign-up-input" type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <label className="sign-up-label">Password:
          <input className="sign-up-input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button>Submit</button>
      </form>
    
    </div>
  )
}