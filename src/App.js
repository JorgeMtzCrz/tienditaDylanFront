import React, {Suspense, lazy} from 'react'
import {useAuth} from './AuthContext'
import Loader from './components/Loader'
function App(){
    const [{user}] = useAuth()
    const UnauthApp = lazy(()=> import('./UnauthApp'))
    const AuthApp = lazy(()=> import('./AuthApp'))
    return user ? (
        <Suspense fallback={<Loader/>}>
            <AuthApp/>
        </Suspense>
    ):(
        <Suspense fallback={<Loader/>}>
            <UnauthApp/>
        </Suspense>
    )
}

export default App