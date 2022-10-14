import './App.css';
import React from "react";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message)) ;
  }, []);
  return (
    <div className="App">
{data}
    </div>
  );
}

export default App;
