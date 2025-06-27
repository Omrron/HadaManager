import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Rooms } from './pages/Rooms'
import { Tables } from './pages/Tables'
import { Layout } from './layouts/PageLayout'

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Rooms/>}/>
          <Route path="/tables/:id" element={<Tables/>}/>
        </Route>
      </Routes>
    </Router>
  )
}