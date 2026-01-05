import DragAndDrop from "./components/DragAndDrop";

const initialData = {
  Todo : [
    "learn nextJS",
    "learn typescript",
    "learn GENAI"
  ],
  "In Progress" : [
    "react machine coding ",
    "DSA revision",
    "Namaste Dev"
  ],
  COMPLETED : [
    "Javascript",
    "DSA",
    "Databases"
  ] 
};

export default function App(){
  return <DragAndDrop InitialData = {initialData}/>
}