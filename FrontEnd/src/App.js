import './App.css';
import Admin from './Components/Admin/Admin';
import Home from './Components/Home/Home';
import UserResult from './Components/Home/UserResult';
import Login from './Components/Main/Login'
import Signup from './Components/Main/Signup';
import Quiz from './Components/QuizSection/Quiz';
import { Switch, Route } from 'react-router-dom';
function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login} ></Route>
        <Route exact path='/Admin' component={Admin}></Route>
        <Route exact path='/Home' component={Home} ></Route>
        <Route exact path='/UserResult' component={UserResult} ></Route>
        <Route exact path='/Signup' component={Signup} ></Route>
        <Route exact path='/quiz/:tech' component={Quiz} ></Route>
      </Switch>
    </div>
  );
}

export default App;
