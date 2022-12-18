import "./App.css";
import Footer from "./components/Footer/Footer";
import GrammerCorrection from "./components/GrammerCorrection/GrammerCorrection";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <GrammerCorrection></GrammerCorrection>
      <Footer></Footer>
    </div>
  );
}

export default App;
