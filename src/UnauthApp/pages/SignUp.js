import React, { useState } from "react";
import AuthForm from "../../components/AuthForm";
import { useAuth } from "../../AuthContext";
import useInput from "../../hooks/useInput";
import {Box, useToast} from '@chakra-ui/react'
import handleAsync from "../../utils/handleAsync";
import AUTH_SERVICE from "../../services/auth_service";
import {useHistory} from 'react-router-dom'

export default function SignUp(props){
    const toast = useToast()
    const [, dispatch] = useAuth()
    const email = useInput('')
    const password = useInput('')
    const birthdate = useInput('')
    const role = useInput('ADMIN')
    const username = useInput('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSignUp = async e =>{
        e.preventDefault()
        setLoading(true)

        const data ={
            username: username.value,
            email: email.value,
            password: password.value,
            birthdate: birthdate.value,
            role: role.value
        }

        const {user} = await handleAsync(()=> AUTH_SERVICE.SIGNUP(data))
        setLoading(false)
        if(user){
            history.push('/')
        }
        else{
            toast({
                position:'top-right',
                title: 'Error',
                description: 'Algo salió mal, perro',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }

    }

    const inputs =[
        {
            placeholder: 'Ingresa tu email',
            type: 'email',
            labelName: 'Email',
            control: {...email}
        },
        {
            placeholder: 'Selecciona tu fecha de nacimiento',
            type: 'date',
            labelName:'Fecha de nacimiento',
            control: {...birthdate}
        },
        {
            placeholder:'Ingresa tu nombre de usuario',
            type: 'text',
            labelName: 'Nombre de usuario',
            control: {...username}
        },
        {
            placeholder: 'Contraseña',
            type: 'password',
            labelName: 'Contraseña',
            control: {...password}

        }
    ]

    return(
        <Box
            as="main"
            d="flex"
            alignItems="center"
            justifyContent="center"
            boxSizing="border-box"
            w="100%"
            h="85vh"
        >
            <AuthForm
            title={'Registrate perro'}
            buttonText={'Ingresar'}
            inputs={inputs}
            loading={loading}    
            actionButton={handleSignUp}        
            />
        </Box>
    )
}