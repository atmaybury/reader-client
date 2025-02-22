import { useEffect } from "react"
import { useAuthorization } from "./contexts/useAuthorization"

const LoginScreen = () => {
  const { login } = useAuthorization()
  const userInput = {
    "username": "test",
    "email": "test@test.test",
    "password": "testpassword"
  }

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify(userInput)
    })
    if (!res.ok) console.error("SHIT")

    const string = await res.text()
    login(string)
  }

  return (
    <form onSubmit={onLogin}>
      <button type='submit'>LOGIN</button>
    </form>
  )
}

export default LoginScreen
