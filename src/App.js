import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Button from "@mui/material/Button";

function App() {
  const [data, setData] = useState("");
  const [wordData, setWordData] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios
      .get("https://www.terriblytinytales.com/test.txt")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleClick() {
    let cleanData = data.replace(/[^\w\s]|_/g, "").toLowerCase();

    let wordsArray = cleanData.split(" ");

    let wordCount = {};

    for (let i = 0; i < wordsArray.length; i++) {
      let word = wordsArray[i];

      if (wordCount[word]) {
        wordCount[word]++;
      } else {
        wordCount[word] = 1;
      }
    }

    const objects = Object.entries(wordCount);

    objects.sort((a, b) => b[1] - a[1]);

    const sortedObjects = objects.map(([Words, Number]) => ({
      Words,
      Number,
    }));

    console.log(sortedObjects);
    setFlag(true);
    setWordData(sortedObjects.slice(0, 20));
  }

  return (
    <div className="App">
      <center>
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ margin: 10 }}
        >
          Submit
        </Button>

        <CSVLink data={wordData}>
          <Button variant="contained" style={{ margin: 10 }}>
            Export
          </Button>
        </CSVLink>

        {flag && (
          <BarChart
            width={1000}
            height={500}
            data={wordData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Words" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="Number" fill="#8884d8" />
          </BarChart>
        )}
      </center>
    </div>
  );
}

export default App;
