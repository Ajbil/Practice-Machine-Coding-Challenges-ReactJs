import './App.css'
import Home from './pages/Home.jsx'
import {ThemeProvider} from './Context/ThemeContext.jsx'

function App(){
  return(
    <>
    <ThemeProvider>
      <Home/>
    </ThemeProvider>
    </>
  )
}

export default App;
