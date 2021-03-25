import React,{useState,useEffect} from 'react'
import {
  Route,
  Switch,
  useHistory
} from 'react-router-dom'
import ChatPage from './components/ChatPage/ChatPage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import TastePage from './components/TastePage/TastePage'
import SidePanel from './components/ChatPage/SidePanel/SidePanel'
import firebase from './firebase'
import {useDispatch, useSelector} from 'react-redux'
import {setUser,clearUser} from './redux/actions/user_action'
import {
  useLocation
} from "react-router-dom";

function App() {
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.user.isLoading)
  let location = useLocation();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        if(location.pathname !== '/' && location.pathname !== '/taste'){
          history.push('/')
        }
        dispatch(setUser(user))
      }else{
        history.push('/login')
        dispatch(clearUser())
      }
    })
  }, [])

  if(isLoading){
    return (
      <div>
        불러오는 중입니다.
      </div>
    )
  }else{
    return (
      <div>
      {(location.pathname === '/' || location.pathname === '/taste') && <SidePanel/>}
      <Switch>
        <Route exact path="/" component={ChatPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/taste" component={TastePage}/>
      </Switch>
      </div>
  );
  }
}
export default App;