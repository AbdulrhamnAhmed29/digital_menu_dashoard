import { lazy } from 'react'
import MainLayout from './layout/MainLayout'

const SignIn = lazy(() => import('./features/auth/components/SignIn'));
// =======products routes===== 
const Products = lazy(() => import('./features/products/pages/Products'));
const AddProduct = lazy(() => import('./features/products/pages/AddProduct'));

const Categories = lazy(() => import('./features/products/pages/Products'));
const sectionDetails = lazy(() => import('./pages/SectionDetails'));
const Offers = lazy(() => import('./pages/Offers'));
const finance = lazy(() => import('./pages/Finance'));



export const routes = [
    {
        path: '/login',
        element: SignIn,
        isPublic: true,
    },
    {
        path: '/', //Layout)
        element: MainLayout,
        isPublic: false,
        children: [
            {
                path: 'dashboard',
                element: () => <div>إحصائيات المنيو</div>,
            },
            {
                path: 'products',
                element: Products,
            },
            {
                path: 'section/:id',          
                     element:sectionDetails ,
            },
            {
                path: 'categories',
                element: Categories,
            },

            {
                path: 'offers', 
                element: Offers,
            },
            {
                path: 'finance', 
                element: finance,
            },
            {
                path: 'products/add',
                element: AddProduct,
            },
        ]
    },
    {
        path: '*',
        redirect: '/login'
    }
]