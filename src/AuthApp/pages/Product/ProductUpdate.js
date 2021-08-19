import React, {useState, useEffect} from 'react'
import {Box, Button, Heading, Flex, FormControl, Text, FormLabel, SimpleGrid, Select, Input} from '@chakra-ui/react'
import useForm from '../../../hooks/useForm'
import handleAsync from '../../../utils/handleAsync'
import MY_SERVICE from '../../../services'
import PRODUCT_SERVICE from '../../../services/product_service'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function ProductUpdate(props){
    const [form, handleInput] = useForm()
    const [product, setProduct] = useState(null)
    const [docs, setDocs] = useState([])
    const categories = [{value: 'TV', key:1}, {value: 'PHONE', key:2}, {value: 'COMPUTER', key:3}, {value: 'HEADPHONE', key:4},  ]
    const history = useHistory()
    useEffect(()=>{
        PRODUCT_SERVICE.DETAIL(props.match.params.id)
        .then(({data: {product}})=>{
            setProduct(product)
            setDocs(product.img)
        })
    },[props.match.params.id])

    const handleDocs = async(e) =>{
        const formData = new FormData()

        for(let key in e.target.files){
            formData.append('docs', e.target.files[key])
        }

        const response = await handleAsync(()=> MY_SERVICE.UPLOAD(formData))
        if(response.data.length > 0){
            setDocs([...docs, ...response.data])
        }else{
            setDocs(docs)
        }
    }

    const submit = async e =>{
        e.preventDefault()
        form.img= docs
        console.log(form)
        const response = await handleAsync(()=> PRODUCT_SERVICE.UPDATE(form, props.match.params.id))
        if(response.product){
            history.push('/app/productos')
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
        }
    }
    return(
        <>

            <Box display="flex" alignItems="center" justifyContent="center" w="100%" flexDirection="column">
                <Heading as="h2">Crear un producto</Heading>
            <Flex direction="column" w="50%" >
                <FormLabel m={2}>
                    Nombre 
                </FormLabel>
                <Input defaultValue={product?.title} onChange={handleInput} m={2} type="text" name="title"  />
                <FormLabel m={2}>
                    Descripción 
                </FormLabel>
                <Input defaultValue={product?.description} onChange={handleInput}  m={2} type="text" name="description"  />
                <FormLabel m={2}>
                    Precio 
                </FormLabel>
                <Input defaultValue={product?.price} onChange={handleInput}  m={2} type="number" name="price"  />
                <FormLabel m={2}>
                    Descuento
                </FormLabel>
                <Input defaultValue={product?.discount} onChange={handleInput}  m={2} type="number" name="discount"  />
                <FormLabel m={2}>
                    Categoría
                </FormLabel>
                <Select placeholder='Selecciona una categoria' onChange={handleInput}  m={2} type="text" name="category"  >
                    {
                        categories.map(e=>(
                            <option selected={product && product.category === e.value ? true : false} value={e.value} key={e.id}>{e.value}</option>
                        ))
                    }
                </Select>
                <FormLabel m={2}>
                    Imagenes
                </FormLabel>
                <Input m={2} type="file" name="docs" onChange={handleDocs} multiple/>
                {
                    docs && docs.map(e=> <Text>{e.name}</Text>)
                }

                <Button onClick={submit} color="white" backgroundColor="blue.500" m={2}>Crear</Button>
            </Flex>

            </Box>
        </>
    )
}