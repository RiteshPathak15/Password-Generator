import './App.css';
import React, { useState, useEffect, useCallback } from "react";

function App() {
  const [Password, setPassword] = useState("");
  const [length, setLength] = useState(6); // Set default length to 6
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLMNBVCXZ';
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@#$%!^&*()?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, charAllowed, numAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numAllowed, passwordGenerator]);

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const passtoclipboard=()=>{
    window.navigator.clipboard.writeText(Password)
  }


  return (
    <>
      <div className="h-screen bg-slate-800 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-center items-center mb-4">
            <input
              type="text"
              value={Password}
              onChange={handleInputChange}
              placeholder="Password"
              className="p-2 rounded-lg border border-black"
            />
            <button className="bg-blue-600 rounded-lg p-2" onClick={passtoclipboard}>copy</button>

          </div>

          <div className="p-2 flex justify-center align-middle items-center gap-4">
            <label className="bg-black text-white p-2 rounded-md cursor-pointer">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
              />
              length: {length}
            </label>

            <label className="bg-black text-white p-2 flex gap-2 rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prevState) => !prevState)} // Toggle charAllowed
              />
              charAllowed
            </label>

            <label className="bg-black text-white p-2 flex gap-2 rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={numAllowed}
                onChange={() => setNumAllowed((prevState) => !prevState)} // Toggle numAllowed
              />
              numAllowed
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
