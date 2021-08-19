import React from 'react'
import { useAuth } from '../../AuthContext'

export const Profile = () => {
    const [{user}] = useAuth()
    return (
        <div>
            <h1>{user.username}</h1>    
        </div>
    )
}
