import React from 'react';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { Navbar, Nav} from "react-bootstrap"
import GetQuotes from "./components/GetQuotes"
import SavedQuotes from "./components/savedQuotes"

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" className="navbar" sticky="top">
        <Navbar.Brand>...Quotify</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/" className="link">Get Quotes</Link>
          <Link to="/saved-quotes" className="link">Saved Quotes</Link>
        </Nav>
      </Navbar>

      <Switch>
        <Route path="/" component={GetQuotes} exact/>
        <Route path="/saved-quotes" component={SavedQuotes} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
