import React from 'react'
import PageSection from '../components/Layout/PageSection'
import Product from './pages/Product/Product'
import ProductCreate from './pages/Product/ProductCreate'
import ProductUpdate from './pages/Product/ProductUpdate'
import { Profile } from './pages/Profile'


export default [
    {
        path: '/app/home',
        label: 'Inicio',
        type: 'menu',
        Component: () =>(
            <PageSection>
                <Profile/>
            </PageSection>
        )
    },
    {
        path:'/app/productos',
        label: 'Productos',
        type: 'menu',
        Component: () => (
            <PageSection>
                <Product/>
            </PageSection>
        )
    },
    {
        path: '/app/productos/crear',
        label: 'Crear Producto',
        type: 'internal',
        Component: () => (
            <PageSection>
                <ProductCreate/>
            </PageSection>
        )
    },
    {
        path: '/app/productos/update/:id',
        label: 'Actualizar Producto',
        type: 'internal',
        Component: (props) => (
            <PageSection>
                <ProductUpdate {...props}/>
            </PageSection>
        )
    }
]