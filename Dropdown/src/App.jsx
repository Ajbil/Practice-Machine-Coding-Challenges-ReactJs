import Dropdown from "./Components/Dropdown";

function App(){
  
  const data = [
    {
      title: 'Title 01',
      options: [
        'Option 01',
        'Option 02'
      ]
    },
    {
      title: 'Title 02',
      options: [
        'Option 01',
        'Option 02'
      ]
    }
  ]

  return (
    <div>
      {
        data.map((item,index) => {
          return(<Dropdown key={index} componentObject={item}/>)
        })
      }
    </div>
  );
}

export default App;