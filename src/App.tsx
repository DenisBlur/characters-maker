import './App.css'
import {Main} from "./pages/main/Main.tsx";

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {


    return (

        <Router>
            <Routes>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </Router>

    )
}

export default App
