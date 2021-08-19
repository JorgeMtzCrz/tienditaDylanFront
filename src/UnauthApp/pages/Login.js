import React, {useState} from 'react'
import AuthForm from '../../components/AuthForm'
import {useAuth} from '../../AuthContext'
import {Box, useToast} from '@chakra-ui/react'
import handleAsync from '../../utils/handleAsync'
import AUTH_SERVICE from '../../services/auth_service'
import useInput from '../../hooks/useInput'

export default function Login (props){
    const toast = useToast()
    const [, dispatch] = useAuth()
    const email = useInput('')
    const password = useInput('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async e =>{
        e.preventDefault()
        setLoading(true)
        const data ={
            email: email.value,
            password: password.value
        }

        const {user} = await handleAsync(() => AUTH_SERVICE.LOGIN(data))

        setLoading(false)
        if(user){
            dispatch({type: 'LOGIN', payload: {user}})
        }else{
            toast({
                position:'top-right',
                title:'No autorizado',
                description: 'Email o contraseña incorrecta',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }

    const inputs =[
        {
            placeholder: 'john@snow.com',
            type: 'email',
            labelName: 'Email',
            control: {...email}
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
            title={'Iniciar Sesión'}
            buttonText={'Entrar'}
            inputs={inputs}
            actionButton={handleLogin}
            loading={loading}
            />
        </Box>
    )
}