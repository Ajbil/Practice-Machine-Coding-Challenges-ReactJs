import InfiniteScrollDomApi from "./components/InfiniteScrollDomApi";
import InfiniteScrollUsingIntersectionObserverAPI from "./components/InfiniteScrollUsingIntersectionObserverAPI";

function App() {
  return (
    <div className="app">
      {/* <InfiniteScrollDomApi /> */}
      <InfiniteScrollUsingIntersectionObserverAPI/>
    </div>
  )
}

export default App;