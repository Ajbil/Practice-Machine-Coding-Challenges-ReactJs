//Features neede din this task
// Nested File Folder structure just as it appears in vs code 
// Expland and colapse functinilaity for folders
// Add and remove File / Folder 

import "./App.css";
import {useState} from "react"
import json from "./data.json"

//Role of this component is just to render a list of objects which is my base of recursion -- so what i do is call this component recursively to render complete nested list --- so if this node has children then call this List component again but this time with node.children as prop
const List = ({list}) => {
  //state variable needs for keeping track of when + click then expands and when - then contracts 

  // const [isExpanded, setIsExpanded] = useState(false); // here if i use it just like this useState(false) then this is the state for complete component so even when i want to expand public , src will also get explaned -- for this i will have to make it an empty object initially where i will manage the isExpanded state for each folder like "public" :true; "src": false like this 
  const [isExpanded, setIsExpanded] = useState({});

  return(<div className="container"> 
      {
        list.map((node) => (
          <div 
          key={node.id}>
            {node.isFolder && (
              <span 
                onClick={() => 
                  setIsExpanded((prev) => ({
                    ...prev,
                    [node.name] : !prev[node.name]
                  }))
                }
              >
              {isExpanded?.[node.name]  ? "- ": "+ "}
            </span>
          )}
            <span>{node.name}</span>
            {isExpanded?.[node.name] && node?.children && <List list={node.children}/>}
          </div>
        ))
      } 
  </div>
  );
};


export default function App(){
  const [data, setData] = useState(json);
  return  (
    <div className="App">
      <h1>
        Hello My File Explorer 
      </h1>
      <div className="container">
        
        {/* This approach will not work as we need to recurse over children nodes also so here see pattern how to write recursion -- here see what we are trying to render -- it is list of objects , and they can have children which are again list of object -- So funda is Write code to render list of object and then apply recursion on it  */}
      {/* {
        data.map((node) => (
          <div key={node.id}>{node.name}</div>
        ))
      } */} 
      <List list={data}/>
      </div>
    </div>
  );
}