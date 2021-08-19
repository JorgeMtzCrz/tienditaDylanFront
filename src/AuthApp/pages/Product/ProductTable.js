import React, {useState, useMemo} from 'react'
import {Box, Flex, Icon, Image, Menu, Button, MenuButton, MenuList, MenuGroup, MenuItem} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useTable } from 'react-table'


export default function ProductTable({data=[], deleteProduct, updateProduct}) {
    const products = useMemo(()=> data, [data])

    products.map(e=>{
        return e.update = {id:e._id}
    })

    const columns = useMemo(()=>[
        {
            Header: 'Nombre',
            accessor: 'title'
        },
        {
            Header: 'Categoría',
            accessor: 'category'
        },
        {
            Header: 'Precio',
            accessor: 'price'
        },
        {
            Header: 'Borrar',
            Cell: ({value}) => <Icon cursor="pointer" name="delete" onClick={()=> deleteProduct(value)} />,
            accessor: '_id'
        },
        {
            Header: 'Actualizar',
            Cell: ({value}) => <Icon cursor="pointer" name="update" onClick={()=> updateProduct(value.id)} />,
            accessor: 'update'
        },
        {
            Header: 'Imagen',
            Cell: ({value}) => value.map(e=> <Image src={e.newPath.url}/> ),
            accessor: 'img'
        }

    ],[deleteProduct, updateProduct])

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data: products})

    return(
        <Box
            p={[10,10,10,20]}
            boxShadow="xl"
            w="100%"
            boxSizing="border-box"
            borderRadius="8px"
            display="flex"
            flexDirection="column"
        >
            <Box as="table" {...getTableProps} >
                <Box as="thead">
                    {headerGroups.map(headerGroup=>(
                        <Box
                         as="tr" 
                         {...headerGroup.getHeaderGroupProps()}
                        >  
                        {headerGroup.headers.map(column=>(
                            <Box as="th" textAlign="center" pl={2} pb={10} color="tomato">
                                {column.render('Header')}
                            </Box>
                        ))}
                        </Box>
                    ))

                    }
                </Box>
                <Box as="tbody" {...getTableBodyProps}>
                    {rows.map(row=>{
                        prepareRow(row)
                        return(
                            <Box as="tr" {...row.getRowProps()}>
                                {
                                    row.cells.map(cell=>{
                                        return(
                                            <Box as="td" textAlign="center" {...cell.getCellProps()} px={2} py={3}>
                                                {cell.render('Cell')}
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        )
                    })
                    }
                </Box>
            </Box>

        </Box>
    )
}