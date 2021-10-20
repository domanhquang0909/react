import './App.css';
import Page from './components/page/Page';
import Login from './components/Login/Login';
import {Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';



function App() {
  const token = useSelector(state=>state.token.token);
  
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to='/login'></Redirect>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/page">
          {token !== null ? <Page /> : <Redirect to='/login'></Redirect>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
