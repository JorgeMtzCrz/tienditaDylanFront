import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function UnauthApp (){
    return(
        
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/signup" component={SignUp} />
                <Redirect to="/"/>
            </Switch>
    )
}

export default UnauthApp