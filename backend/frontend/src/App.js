import { useState, useEffect, useRef } from "react";

function App() {
  const myData = useRef({});
  const [myObservedData, setData] = useState({});

  useEffect(() => {
    let data;
    const fetchData = async function () {
      data = await fetch("./data");
      myData.current = await data.json();
      setData(myData.current);
    };
    fetchData();
    return () => {};
  }, []);
  return <div>{myObservedData.name}</div>;
}

export default App;
