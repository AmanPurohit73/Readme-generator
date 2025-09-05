import "./App.css";
import ReadmeGenerator from "./components/ReadmeGenerator";
import Title from "./components/Title";

function App() {
  return (
    <div className="bg-[#010409] min-h-screen ">
      <Title />
      <ReadmeGenerator/>
    </div>
  );
}

export default App;
