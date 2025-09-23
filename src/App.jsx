import React, { useState } from "react";

export default function App() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [error, setError] = useState("");

  function search() {
    if (!word) 
      return setError("Please enter a word");
    setError("");
    setMeaning("");
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(res => {
        if (!res.ok) throw new Error("Word not found");
        return res.json();
      })
      .then(data => {
        const firstDefinition = data[0].meanings[0].definitions[0].definition;
        setMeaning(firstDefinition);
      })
      
  }

  return (
    <div style={{ padding: 20 }}>
      <input
        value={word}
        onChange={e => setWord(e.target.value)}
        placeholder="Enter a single word"
      />
      <button onClick={search}>Search</button>
      <br/>
      {error}
      {meaning}
    </div>
  );
}
