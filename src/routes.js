import { lazy } from 'react'
import MainLayout from './layout/MainLayout'

const SignIn = lazy(() => import('./features/auth/components/SignIn'));
// =======products routes===== 
const Products = lazy(() => import('./features/products/pages/Products'));
const AddProduct = lazy(() => import('./features/products/pages/AddProduct'));
const EditProduct = lazy(() => import("./features/products/pages/EditProduct"));
const DuplicateProduct = lazy(() => import("./features/products/pages/DuplicateProduct"))
const Categories = lazy(() => import('./features/categories/pages/Sections'));
const sectionDetails = lazy(() => import('./features/categories/pages/SectionDetails'));
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
                element: sectionDetails,
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
            {
                path: 'products/duplicate/:id',
                element: DuplicateProduct,
            },
            {
                path: 'products/:id',
                element: EditProduct,
            },
        ]
    },
    {
        path: '*',
        redirect: '/login'
    }
]