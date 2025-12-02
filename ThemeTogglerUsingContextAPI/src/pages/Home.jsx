import React from "react"
import {useTheme} from '../Context/ThemeContext.jsx'

const Home = () =>{
    const { theme, toggleTheme} = useTheme();
    
    return (
        <div style={{
        backgroundColor: theme === 'dark' ? 'black' : 'white',
        width:"100vw",
        height:"100vh"
    }}>
        <p style ={{color: theme === 'dark' ? 'white' : 'black'}}>Home</p>
        <div>
            <button onClick={toggleTheme}>Switch Mode</button>
        </div>
    </div>
    );
};

export default Home;