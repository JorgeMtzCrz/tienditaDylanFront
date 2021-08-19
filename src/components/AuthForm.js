import React from 'react'
import PropTypes from 'prop-types'
import {Flex, Heading, Text, Input, InputGroup, Icon, Button, Box} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

function AuthForm(props){
    const {title, buttonText, inputs, actionButton, loading} = props
    return(
        <Flex
            boxSizing="border-box"
            py={20}
            px={[5, 24, 32, 32]}
            direction="column"
            align="center"
            textAlign="center"
            boxShadow="2xl"
            w={['90%', '80%', '60%', '40%']}
            borderRadius="lg"
            position="relative"
        >
            <Heading as="h3" color="gray.500" size="lg" mb={5}>
                {title}
            </Heading>
            <Box as="form" w="100%" d="flex" flexDirection="column">
                {inputs.map((input, idx)=>(
                    <Box d="flex" w="100%" flexDirection="row" justifyContent="space-around" alignContent="center" alignItems="center" key={idx}>
                        <InputGroup w="75%" size="md">
                            <Input
                                {...input.control}
                                color="gray.500"
                                focusBorderColor="blue.500"
                                type={input.type}
                                placeholder={input.placeholder}
                                variant="flushed"
                                mb={5}
                            />
                        </InputGroup>
                    </Box>
                ))}
                <Button
                    mt={10}
                    onClick={actionButton}
                    isLoading={loading}
                    width="30%"
                    size="lg"
                    backgroundColor="blue.900"
                    variant="solid"
                    type="submit"
                    alignSelf="center"
                    boxShadow="xl"
                    color="white"
                >
                    {buttonText}
                </Button>
                {
                    title === 'Iniciar Sesión' ? 
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        mt={2}
                    ><Text fontSize={['md','md', 'lg', 'lg']} color="blue.900">No tienes cuenta &nbsp;</Text><Link to="/signup">crea una aquí</Link></Box>
                    : title === 'Registrate perro' ?
                    <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    mt={2}
                    ><Text fontSize={['md','md', 'lg', 'lg']} color="blue.900">Ya tienes una cuenta, inicia sesión &nbsp;</Text><Link to="/">aquí</Link></Box>
                    : null
                }
            </Box>
        </Flex>
    )
}

export default AuthForm