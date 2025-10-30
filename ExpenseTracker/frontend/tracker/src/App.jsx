import Sidebar from './components/Sidebar'
import Addpayment from './pages/Addpayment'
import Dashboard from './pages/Dashboard'
import {Routes , Route} from "react-router-dom"
import Register from './pages/Register'
import Income from './pages/Income'
import Expense from './pages/Expense'
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <Routes>
        <Route path="/add-payment" element={<Addpayment/>}/>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/income" element={<Income/>}/>
        <Route path="/expense" element={<Expense/>}/>


      </Routes>
    </div>
  )
}

export default App
