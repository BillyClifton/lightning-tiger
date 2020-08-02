import React, { useEffect, useRef } from "react";
import LightningBolt from "./lib/LightningBolt.js";
import "./App.css";
function App() {
  const requestRef = React.useRef();
  const animations_ran = React.useRef(0);
  const alpha = React.useRef(0);
  const canvasRef = useRef(null);

  function playThunder() {
    var audioElement = document.createElement("audio");
    var thunder_array = [
      "./assets/audio/thunder1.mp3",
      "assets/audio/thunder2.mp3",
      "./assets/audio/thunder3.mp3",
      "./assets/audio/thunder4.mp3",
    ];
    var random_thunder =
      thunder_array[Math.floor(Math.random() * thunder_array.length)];
    audioElement.setAttribute("src", random_thunder);
    audioElement.play();
  }
  function flash() {
    const context = canvasRef.current.getContext("2d");
    context.fillStyle = "rgba(32, 40, 64, .5)";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
  function handleClick(e) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    var bolt = new LightningBolt(
      context,
      { x: Math.random() * window.innerWidth, y: 0 },
      { x: e.pageX, y: e.pageY },
      255,
      1
    );
    animations_ran.current = 0;
    flash();
    bolt.redraw(1);
    playThunder();
    cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(render);
  }
  function render() {
    animations_ran.current++;
    //->1
    alpha.current = animations_ran.current * animations_ran.current * 0.0001;
    const context = canvasRef.current.getContext("2d");
    const { innerWidth: width, innerHeight: height } = window;
    context.fillStyle = "rgba(0, 0, 0, " + alpha.current + ")";
    context.fillRect(0, 0, width, height);
    if (animations_ran.current < 50) {
      requestRef.current = requestAnimationFrame(render);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
  return (
    <div>
      <canvas ref={canvasRef} id="canvas" width="1920" height="1200"></canvas>
      <img
        className="lightning-tiger-logo"
        src="./assets/lightning_tiger.png"
      />
    </div>
  );
}

export default App;
