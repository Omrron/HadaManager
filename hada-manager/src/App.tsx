import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Rooms } from './pages/Rooms'
import { Tables } from './pages/Tables'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/rooms" element={<Rooms/>}/>
        <Route path="/tables" element={<Tables/>}/>
      </Routes>
    </Router>
  )
}