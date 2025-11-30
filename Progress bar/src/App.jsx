import { useState, useEffect }  from "react";
import ProgressBar from './Component/ProgressBar.jsx'
function App(){
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if(prev >= 100){
          clearInterval(interval);
          return 100;
        }
        return prev+1;
      })
    },100)

    return () => {
      clearInterval(interval)
    }
  },[])


  return (
    <div>
      <h1>The App component handles the logic for updating the progress and passing it to the
 ProgressBar component for rendering. It uses React’s useState and useEffect hooks to
 manage the progress and control intervals.</h1>
      <div>
        Progress Bar
        <ProgressBar  text = {progress} width ={progress}/>
      </div>
    </div>
  )
}

export default App;