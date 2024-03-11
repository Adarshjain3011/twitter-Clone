import React, { useEffect } from 'react';
import io from 'socket.io-client';

const Temp = () => {



  useEffect(() => {
    // Establish Socket.IO connection when component mounts
    // const socket = io('http://localhost:4000'); // Replace with your server URL

    // Listen for 'connect' event
    // socket.on('connect', () => {

    //   console.log('Connected to server');

    // });

    // // Clean up the connection when component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  }, []); // Empty dependency array ensures the effect runs only once on mount


  function clickHanlder(){

    const socket = io('http://localhost:4000');
    
    socket.emit("join-room",{ roomId:"1",email:"adarsh3001@gamil.com"});

  }

  return (
    <div>
      <h1>Socket.IO Example in React</h1>
      <p>Open the browser console to see messages when a user connects.</p>

      <button onClick={clickHanlder}>click me </button>

    </div>
  );
};

export default Temp;


