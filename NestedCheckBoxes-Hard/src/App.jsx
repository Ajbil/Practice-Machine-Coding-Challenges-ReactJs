import './App.css';
import { useState } from 'react';
const checkBoxesData = [
  {
    id: 1,
    name: "Fruits",
    children : [
      {
        id : 2,
        name : "Citrus",
        children : [
          {
            id : 3,
            name: "Orange"
          },
          {
            id: "4",
            name : "Lemon" 
          }
        ]
      },
      {
        id: 5,
        name: "Berries",
        children : [
          {
            id: 6,
            name:" Strawberry"
          },
          {
            id: 7,
            name: "blueberry"
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name : "Tropical",
    children : [
      {
        id: 9,
        name : "mango"
      },
      {
        id: 10,
        name : "banana"
      }
    ]
  },
  {
    id:11,
    name : "Apple"
  }
]

//here as its neseted so recusrion will be used and hence i need to focus on creating  a component which will be responsible for rendeing one unit 

const CheckBoxes = ({ data, checked, setChecked }) => {

  const handleChange = (isChecked, node) =>{ // this e.target.checked will return true or false is my checkboox is checked or not soo here i can give it name isChecked 
    //first create copy of previious state and then make changes and return copy as new state
    setChecked((prev) => {
      // console.log(e.target.checked);
      const newState = { ...prev, [node.id]: isChecked};
      //here now recurison come i want that if i check a checkbox then its children should also get checked  , and also within that children if more children are there then call for them also same updateChildren function
      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        })
      };
      updateChildren(node);

      return newState;
    })
  }
  return (
    <div>
      {
        data.map((node,index) => (
          <div className="parent" key={index}>
            <input type="checkbox" checked={checked[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}></input> 
            <span>{node.name}</span>
            {node.children && <CheckBoxes data={node.children} checked={checked} setChecked={setChecked}/>}
          </div>
        ))
      }
    </div>
  )
}

export default function App(){
  //i need a central state where i keep track of which checkboox is checked and not so i will make state here in App component instead of making seperate state for each check box in checkBox compnent 
  // and i will pass this state to checkBoxes component via prop-drilling
  const [checked, setChecked] = useState({1 : true});  // here initliy empty bject and we will use it like id : true/alse so ex - {1: true, 2:false}

  return <div className="App">
    <CheckBoxes data={checkBoxesData} checked={checked} setChecked={setChecked} />
  </div>
};