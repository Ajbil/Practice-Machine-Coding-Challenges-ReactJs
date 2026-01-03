//Features neede din this task
// Nested File Folder structure just as it appears in vs code 
// Expland and colapse functinilaity for folders
// Add and remove File / Folder 

import "./App.css";
import {useState} from "react"
import json from "./data.json"

//Role of this component is just to render a list of objects which is my base of recursion -- so what i do is call this component recursively to render complete nested list --- so if this node has children then call this List component again but this time with node.children as prop
const List = ({list, addNodeToList}) => {
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
                  setIsExpanded((prev) => ({  // this was tough to do here -- i.e how to manage setIsExpanded state 
                    ...prev,
                    [node.name] : !prev[node.name]
                  }))
                }
              >
              {isExpanded?.[node.name]  ? "- ": "+ "}
            </span>
          )}
            <span>{node.name}</span>
            {node?.isFolder && 
            <span onClick={() => addNodeToList(node.id)}> 
              <img src="data:image/png;base64,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"
              alt="icon"
              className="icon"></img>
            </span>
            }
            {isExpanded?.[node.name] && node?.children && <List list={node.children} addNodeToList={addNodeToList}/>}
          </div>
        ))
      } 
  </div>
  );
};


export default function App(){

  const [data, setData] = useState(json);

//when i will add node to list i will need to modify my data 
  const addNodeToList = (parentId) => {
    // now i will go through whole data to find which node's id === parentId as there only i will add this node to its childrens
  
    const name = prompt("Enter Name");

    const updateTree = (list) => {
      // now i got old list in paramemter and this fucntion task is to return new list with updates
      return list.map((node) => {
        if(node.id === parentId) {
          return {
            ...node,
            children : [
              ...node.children,
              { id: "123", name: name, isFolder: true, children: []}
            ]
          };
        }
        //here comes imp recurion part 
        if(node.children) {
          return {...node, children: updateTree(node.children)}
        }
        return node;
      });
    };
    //Now see my setData will take my current nested tree stucture of my file/folder and will return new updated tree so it will do it by calling a update tree funditon 
    setData((prev) => updateTree(prev));
  };

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
      <List list={data} addNodeToList={addNodeToList}/>
      </div>
    </div>
  );
}