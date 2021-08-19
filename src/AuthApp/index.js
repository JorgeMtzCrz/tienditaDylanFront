import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import MenuRight from '../components/Layout/MenuRight'
import routes from './routes'
function AuthApp(){
    const setRoutes = () => (
        routes.map(({path, Component})=> <Route key={path} exact path={path} component={Component}/>)
    )

    return(
        <>
        <MenuRight/>
        <Switch>

            {setRoutes()}
            <Redirect to="/app/home" />
        </Switch>
        </>
    )
}

export default AuthApp