import './App.css'
import { AuthorizationProvider } from './contexts/AuthorizationContext'
import LoginScreen from './LoginScreen'

const App = () => (
  <AuthorizationProvider>
    <LoginScreen />
    <h1>Vite + React!</h1>
  </AuthorizationProvider>
)

export default App
