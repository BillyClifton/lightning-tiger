import React, { useEffect, useRef } from "react";
import LightningBolt from "./lib/LightningBolt.js";
import "./App.css";
function App() {
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
  function flash(context) {
    //ontext.fillStyle = 'rgba(32, 40, 64, '+alpha+')';
    context.fillRect(0, 0, 1920, 1200);
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
    //var offset = $('#container').offset();
    // mouseX = e.pageX - offset.left;
    // mouseY = e.pageY - offset.top;
    //bolt.setStart(Math.random() * window.innerWidth, 0);
    //bolt.setEnd(e.pageX, e.pageY);
    bolt.redraw(0.3);
    //animations_ran = 0;
    //window.setTimeout('bolt.render(1)', 100);
    playThunder();
    //flash();
  }
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
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
