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
  return (
    <div className="container">
      <div class="card">
        <div class="card-body">
          {myObservedData.name} {myObservedData.email}
        </div>
      </div>
    </div>
  );
}

export default App;
