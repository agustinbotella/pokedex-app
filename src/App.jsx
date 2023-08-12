import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
// import Ability from "./views/Ability";
import Pokemon from "./views/Pokemon";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":pokemon" element={<Pokemon />} />
        {/* <Route path="ability/:ability" element={<Ability />} /> */}
      </Routes>
    </div>
  );
}

export default App;
