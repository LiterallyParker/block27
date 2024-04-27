import { useState } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm'
import Authenticate from './components/Authenticate'

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  return (
    <>
    {
      user && <h3 className='username'>Username: {user.username}</h3>
    }
    <SignUpForm token={token} setToken={setToken}/>
    <Authenticate token={token} setToken={setToken} user={user} setUser={setUser}/>
    </>
  )
}

export default App
