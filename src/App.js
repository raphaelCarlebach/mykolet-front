import './App.css';
import React, { Component } from 'react';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import Profile from './components/profile';
import Register from './components/register';
import Login from './components/login';
import SinglList from './components/singlList';
import Tests from './components/area51';
import { Switch, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';



class App extends Component {
  state = { user_info: '' }

  componentWillMount() {
    var logged = localStorage.getItem('logged');
    this.setState({user_info: logged});
}

  render() { 
    var info = this.state.user_info;
    var user = JSON.parse(info);

    return (
      <div className="App">        
        <header>
          <Header user={user} />
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={Main} />          
            <Route path="/profile" component={Profile} />           
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/singlList" component={SinglList} />
            <Route path="/area51" component={Tests} />
          </Switch>
        </main>
      <footer>
         <Footer/>
      </footer>
       
      </div>
    );
  }
}

export default App;
