import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home'
import './App.scss';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </HashRouter>
  )
}

export default App