import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [foodInput,setFoodInput] = useState("");
  const [characterInput, setCharacterInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [temperature, setTemperature] = useState(0.7);  // Change default slider value at app start up

  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ food: foodInput, character: characterInput, color: colorInput, temperature: temperature }),  // Add temperature here
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      // setCharacterInput("");
      // setFoodInput("");
      // setColorInput("");      

    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.site}>
      <Head>
        <title>Generate Username</title>
        <link rel="icon" href="/mememan.png" />
      </Head>

      <main className={styles.main}>
        <img src="/mememan.png" className={styles.icon} />
        <h3>generate username</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter a food"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
          />
           <input
            type="text"
            name="character"
            placeholder="Enter a character"
            value={characterInput}
            onChange={(e) => setCharacterInput(e.target.value)}
          />
          <input
            type="text"
            name="color"
            placeholder="Enter a color"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
          />
          <input
            type="range"
            min="0.6"
            max="1"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
      <footer className={styles.footer}>
        powered by <a href="https://openai.com/">OpenAI</a>
      </footer>
    </div>
  );
}
