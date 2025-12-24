import { useEffect, useState } from "react";
import api from "./api/axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const payload = {
      location: "San Jose, CA",
      radius: 50,
    };
    api
      .get("/segment/search", { params: payload })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  }, []);

  return (
    <>
      <h1> hello world</h1>
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>{item.avg_grade}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
