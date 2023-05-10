
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="font-bold text-4xl text-center text-blue-800">
        Welcome to Kiira Health Management Portal{" "}
        <Link to="www.google.com" >Click here</Link>
      </h1>
    </div>
  );
}

export default App;
