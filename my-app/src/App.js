import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  function getPDF() {
    return axios.post(`http://localhost:5000/create-pdf`, {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pdf",
      },
      title,
      topic,
      description,
    });
  }
  const savePDF = () => {
    // this.openModal('Loading…') // open modal
    return getPDF() // API call
      .then((response) => {
        console.log(response.data);
        console.log(typeof response.data);

        const url = window.URL.createObjectURL(
          new Blob([new Uint8Array(response.data.data).buffer],{
            type: 'application/pdf'
        })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        ></input>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter Topic"
        ></input>
        <textarea value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description" rows="4" cols="50"></textarea>
        <button onClick={savePDF}>Save as PDF</button>
      </header>
    </div>
  );
}

export default App;
