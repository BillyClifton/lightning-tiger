import React, { useState, useEffect } from "react";

//var ws = new WebSocket('ws://localhost:8080');
var ws = new WebSocket(
  "wss://n8j1l0xirh.execute-api.us-east-1.amazonaws.com/Prod"
);
// ws.onopen = () => {
//   console.log('connected')
// }
//
// ws.onmessage = evt => {
//   console.log('on Message');
//   console.log(evt.data)
//   setResponse(evt.data);
// }
//
// ws.onclose = () => {
//   console.log('disconnected')
//   // automatically try to reconnect on connection loss
//}
const crypto = require("crypto");

// Generate Alice's keys...
const curve = crypto.createECDH("secp521r1");
const address = curve.generateKeys();
const password = curve.getPrivateKey();
const add = curve.getPublicKey();
// Generate Bob's keys...
// const bob = crypto.createECDH('secp521r1');
// const bobKey = bob.generateKeys();
//
// // Exchange and generate the secret...
// const aliceSecret = alice.computeSecret(bobKey);
// //const bobSecret = bob.computeSecret(aliceKey);
console.log(curve);
console.log(address.toString("hex"));
console.log(add.toString("hex"));
console.log(password.toString("hex"));

function Chat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState([]);
  ws.onopen = () => {
    console.log("connected");
  };

  ws.onmessage = (evt) => {
    console.log("on Message");
    setResponse([...response, evt.data]);
  };

  ws.onclose = () => {
    console.log("disconnected");
    // automatically try to reconnect on connection loss
  };
  useEffect(() => {
    console.log("running effect");
    // setWS(new WebSocket('ws://localhost:8080'));
  }, []);

  async function send() {
    console.log("sending");
    ws.send(`{"action":"sendmessage", "data":"${message}"}`);
  }
  const log = response.map((entry, index) => <li key={index}>{entry}</li>);
  return (
    <div>
      <ul>{log}</ul>
      <br />
      <label>
        Message:
        <br />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <br />
      <button onClick={send}>Submit</button>
    </div>
  );
}

export default Chat;
