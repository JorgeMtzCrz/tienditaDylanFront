import React, {useState, useEffect} from 'react'
import {Flex, Heading, Text, Button, Input, SimpleGrid,  useToast, Box, Icon} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import handleAsync from '../../../utils/handleAsync'
import PRODUCT_SERVICE from '../../../services/product_service'
import ProductTable from './ProductTable'
import Loader from '../../../components/Loader'

export default function Product(){
    const history = useHistory()
    const toast = useToast()
    const [products, setProducts] = useState(null)

    useEffect(() => {
        PRODUCT_SERVICE.GET_PRODUCTS()
        .then(({data})=>setProducts([...data.products]))
        .catch(err=>console.log(err))
    }, [])

    const goToCreate = () =>{
        history.push('/app/productos/crear')
    }

    const handleDelete = async(id) =>{
      await handleAsync(()=> PRODUCT_SERVICE.DELETE(id))
      setProducts(products.filter(product => product._id !== id))
    }

    const goToUpdate = (id) => {
        history.push(`/app/productos/update/${id}`)
    }

    if(!products) return <Loader/>
    return(
        <Flex direction="column" align="flex-start" h="100%">
            <Heading as="h2" size="lg" color="blue.700" mb={[3,3,5,10]}>
                Productos
            </Heading>
            <Text mb="30px">Estos son los productos registrados en tu tienda</Text>
            <ProductTable data={products} deleteProduct={handleDelete} updateProduct={goToUpdate}/>
            <Box position="fixed" right="50px" bottom="50px">
                <Icon onClick={goToCreate} width="60px" height="60px" name="add_item" cursor="pointer" />
            </Box>
        </Flex>
    )
}