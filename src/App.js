import react from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//pages
import Register from './Pages/Register'
import Login from './Pages/Login'
import Confirmation from './Pages/Confirmation'
import ForgottenPass from './Pages/ForgottenPass'
import Todolist from './Pages/Todolist'

// Redux
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import allReducer from './Redux/Reducer/Index'

const store = createStore(allReducer, applyMiddleware(thunk))

class App extends react.Component{
  render(){
    return(
      <div>
        <Provider store={store}>
          <BrowserRouter>
              <Switch>
                <Route exact path='/' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/confirmation/:id/:pass/:cat' component={Confirmation} />
                <Route path='/forgottenPass' component={ForgottenPass} />
                <Route path='/todolist' component={Todolist} />
              </Switch>   
          </BrowserRouter> 
          </Provider>       
      </div>
    )
  }
}

export default App;
