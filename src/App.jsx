import { useState } from "react";
import Quiz from "./Quiz";
import "./App.css";

function App() {
  const [lang, setLang] = useState("en");

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">?? Ramayanam Quiz</h1>
        <select
          className="lang-select"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">?????</option>
          <option value="te">??????</option>
        </select>
      </header>
      <Quiz lang={lang} />
    </div>
  );
}

export default App;
