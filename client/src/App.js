import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from 'axios';

function App() {
  /**
   * The JWT token you get after authenticating with our API.
   * Check the Authentication section of the documentation for more details.
   */
  const [ws, setWs] = useState();
  const [stream, setStream] = useState();
  const [conversationId, setConversationId] = useState();


  function getPDF() {
    return axios.post(`http://localhost:5000/create-pdf`, {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pdf",
      },
      conversationId
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
        link.setAttribute("download", `MeetNotes.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log(err));
  };

  const accessToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjU4MTQzNzAyODMwMjg0ODAiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiczFMQ1BaNVNQQ2NSaUZ3ZkNUOGxQMEdRRWxDVmJXYkJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjM5MjI1MTU5LCJleHAiOjE2MzkzMTE1NTksImF6cCI6InMxTENQWjVTUENjUmlGd2ZDVDhsUDBHUUVsQ1ZiV2JCIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.aJ4f_Z2btfhv1jrRyzPJrpA6dSdFBuXUygA55wPYnFPP_pl9g-09AnG8Wll0skEa4_5vCFnyRQRLNeCOw8U5QpmO8LvCEhtKif08k7E-voDMJGJC8VrlGt360FzBRNfzkFuLFEpHcVO5hs0p6158VITjLomCHhxiLC2AkRy1pLSQI7H1fA3oEaI3Cc0y_4Fl58w7CJcTAoKZLVrOVK6xjJDXzvw6i9xUgCIx83Vd9YrhqjlrIki7hQs7--gridAgUjFlIkTZB3f8rECZMZrUX63G2FOiTPQL3Tue7iJDfBWBNXKeB7uX7qKenHYVZ5zhcjH_jpp-7SsGO60rzffk_g";
  const uniqueMeetingId = btoa("drunkuser@example.com");
  const symblEndpoint = `wss://api.symbl.ai/v1/realtime/insights/${uniqueMeetingId}?access_token=${accessToken}`;

  const startHandler = async (e) => {
    e.preventDefault();

    const ws = new WebSocket(symblEndpoint);

    // Fired when a message is received from the WebSocket server
    ws.onmessage = (event) => {
      // You can find the conversationId in event.message.data.conversationId;
      const data = JSON.parse(event.data);

      
      if (data.type === "message" && data.message.hasOwnProperty("data")) {
        if(!conversationId) setConversationId(data.message.data.conversationId);
        console.log("conversationId", data.message.data.conversationId);
      }
      if (data.type === "message_response") {
        for (let message of data.messages) {
          console.log("Transcript (more accurate): ", message.payload.content);
        }
      }
      if (data.type === "topic_response") {
        for (let topic of data.topics) {
          console.log("Topic detected: ", topic.phrases);
        }
      }
      if (data.type === "insight_response") {
        for (let insight of data.insights) {
          console.log("Insight detected: ", insight.payload.content);
        }
      }
      if (
        data.type === "message" &&
        data.message.hasOwnProperty("punctuated")
      ) {
        console.log(
          "Live transcript (less accurate): ",
          data.message.punctuated.transcript
        );
      }
      console.log(`Response type: ${data.type}. Object: `, data);
    };

    // Fired when the WebSocket closes unexpectedly due to an error or lost connetion
    ws.onerror = (err) => {
      console.error(err);
    };

    // Fired when the WebSocket connection has been closed
    ws.onclose = (event) => {
      console.info("Connection to websocket closed");
    };

    // Fired when the connection succeeds.
    ws.onopen = (event) => {
      ws.send(
        JSON.stringify({
          type: "start_request",
          meetingTitle: "Websockets How-to", // Conversation name
          insightTypes: ["question", "action_item"], // Will enable insight generation
          config: {
            confidenceThreshold: 0.5,
            languageCode: "en-US",
            speechRecognition: {
              encoding: "LINEAR16",
              sampleRateHertz: 44100,
            },
          },
          speaker: {
            userId: "example@symbl.ai",
            name: "Example Sample",
          },
        })
      );
    };

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    /**
     * The callback function which fires after a user gives the browser permission to use
     * the computer's microphone. Starts a recording session which sends the audio stream to
     * the WebSocket endpoint for processing.
     */
    const handleSuccess = (stream) => {
      const AudioContext = window.AudioContext;
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const processor = context.createScriptProcessor(1024, 1, 1);
      const gainNode = context.createGain();
      source.connect(gainNode);
      gainNode.connect(processor);
      processor.connect(context.destination);
      processor.onaudioprocess = (e) => {
        // convert to 16-bit payload
        const inputData =
          e.inputBuffer.getChannelData(0) || new Float32Array(this.bufferSize);
        const targetBuffer = new Int16Array(inputData.length);
        for (let index = inputData.length; index > 0; index--) {
          targetBuffer[index] = 32767 * Math.min(1, inputData[index]);
        }
        // Send audio stream to websocket.
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(targetBuffer.buffer);
        }
      };
    };

    handleSuccess(stream);
    return {ws,stream};
  };

  const stopHandler = (e) => {
    e.preventDefault();
    ws.close();
    stream.getTracks().forEach(function(track) {
      track.stop();
    });
    savePDF();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          className="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={async (e) => {
            const newObj = await startHandler(e);
            setWs(newObj.ws);
            setStream(newObj.stream);

          }}
        >
          Start Recording
        </button>
        <button
          className="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={(e) => {
            stopHandler(e);
          }}
        >
          Stop Recording
        </button>
      </header>
    </div>
  );
}

export default App;
