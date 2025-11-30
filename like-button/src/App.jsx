import {useState} from 'react';
import Button from './Button/Button';

function App(){
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null); // to track API errors
  const [liked, setLiked] = useState(false);

  //handlses the click event , including API call and state update 
  const handleClick = async() => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method:"POST",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({
            action : liked ? "unlike" : "like", //send like/unlike actions 
          }),
        }
      );
      console.log("Status:", response.status);
      console.log("Response Data:", data);
      if(response.status === 200){
        setLiked(!liked);//toggle liked state when API call successfull
        setError(null) // clear any exisiting errors
      }
      else{
        const res = await response.json();
        setError(res.message);
        setLiked(false)
      }
    } catch (error) {
      setError("An unexpected eror occured");
      setLiked(false);
    }
    finally{
      setLoading(false);
    }
  };

  return(
    <div>
      <Button onClick={handleClick} liked={liked} loading={loading} error={error}></Button>
    </div>
  )
}
export default App;
