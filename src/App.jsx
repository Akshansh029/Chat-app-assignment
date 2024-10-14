import React from "react";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-4 ">
      <h1 className="text-3xl font-bold text-gray-800">
        React Chat Application
      </h1>
      <Chat />
    </div>
  );
}

export default App;
