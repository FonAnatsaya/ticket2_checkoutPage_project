import "./App.css";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tickets from "./components/Tickets";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App__Content">
        <Tickets />
        <Cart />
      </div>
      <Footer />
    </div>
  );
}

export default App;
