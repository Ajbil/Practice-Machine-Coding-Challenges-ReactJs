import VirtualizedList from "./Components/VirtualizedListComp"

const LIST = Array.from({length:100000}, (_,index) => index+1);
console.log(LIST);

export default function App(){
  return <VirtualizedList list={LIST} height={400} width={300} itemHeight={35}/>
}