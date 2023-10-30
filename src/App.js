import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home';
import Edit from './pages/edit';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/edit" component={Edit} />
        <Redirect from="*" to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;