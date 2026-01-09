import { createBrowserRouter } from 'react-router-dom'
import { ProductPage } from '@/components/ProductPage'
import AcademiaView from '@/sections/academia/AcademiaView'
import MedicalHubView from '@/sections/medical-hub/MedicalHubView'
import GuitarCurvesView from '@/sections/guitar-curves/GuitarCurvesView'
import LifestyleView from '@/sections/lifestyle/LifestyleView'
import PainPointsView from '@/sections/pain-points/PainPointsView'
import { StorefrontLayout } from '@/storefront/StorefrontLayout'
import { HomePage } from '@/storefront/HomePage'
import { ProductDetailView } from '@/storefront/ProductDetailView'
import { CartPage } from '@/storefront/CartPage'
import { CheckoutPage } from '@/storefront/CheckoutPage'
import AboutPage from '@/storefront/AboutPage'
import ContactPage from '@/storefront/ContactPage'
import { UserDashboard } from '@/storefront/UserDashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductPage />,
  },
  {
    path: '/store',
    element: <StorefrontLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'medical',
        element: <MedicalHubView />,
      },
      {
        path: 'guitar-curves',
        element: <GuitarCurvesView />,
      },
      {
        path: 'lifestyle',
        element: <LifestyleView />,
      },
      {
        path: 'solutions',
        element: <PainPointsView />,
      },
      {
        path: 'institute',
        element: <AcademiaView />,
      },
      {
        path: 'products/:id',
        element: <ProductDetailView />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'account',
        element: <UserDashboard />,
      }
    ]
  },
])
