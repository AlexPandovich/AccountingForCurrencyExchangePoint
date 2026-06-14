import "./styles/global.scss";
import Navbar from "./components/NavBar/NavBar"
import { BrowserRouter, HashRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import BigNumber from "bignumber.js";

BigNumber.config({ ERRORS: false });

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Navbar/>
        <AppRouter/>
      </HashRouter>
    </div>
  );
}

export default App;
