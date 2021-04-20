import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Component } from "react";

//components
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </Router>
      </>
    );
  }
}

export default App;
