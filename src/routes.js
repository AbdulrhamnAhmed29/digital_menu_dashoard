import { lazy } from 'react'
import MainLayout from './layout/MainLayout'

const SignIn = lazy(() => import('./features/auth/components/SignIn'));
// =======products routes===== 
const Products = lazy(() => import('./features/products/pages/Products'));
const AddProduct = lazy(() => import('./features/products/pages/AddProduct'));
const EditProduct = lazy(() => import("./features/products/pages/EditProduct"));
const DuplicateProduct = lazy(() => import("./features/products/pages/DuplicateProduct"))

// =======sections routes===== 
const Categories = lazy(() => import('./features/categories/pages/Sections'));
const sectionDetails = lazy(() => import('./features/categories/pages/SectionDetails'));

// =======offers routes===== 
const Offers = lazy(() => import('./features/offers/pages/Offers'));
const updateOffer = lazy(() => import("./features/offers/pages/EditOffers"))
const notFound = lazy(() => import("./pages/NotFound"));
const addOffer = lazy(()=>import("./features/offers/pages/AddOffers"))

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
                path: 'offers/:id',
                element: updateOffer,
            },
            {
                path: 'addoffers',
                element: addOffer,
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
            {
                path: 'notFound',
                element: notFound,
            },
        ]
    },
    {
        path: '*',
        redirect: '/notFound'
    }
]