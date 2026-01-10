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
import { LabPage } from '@/storefront/LabPage'
import { CollectionPage } from '@/storefront/CollectionPage'
import { ReturnsPage } from '@/storefront/ReturnsPage'
import { ShippingPage } from '@/storefront/ShippingPage'
import { PrivacyPage } from '@/storefront/PrivacyPage'
import { TermsPage } from '@/storefront/TermsPage'
import { NotFoundPage } from '@/storefront/NotFoundPage'
import { FitFinderPage } from '@/storefront/FitFinderPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StorefrontLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'lab',
        element: <LabPage />,
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
        path: 'fit-finder',
        element: <FitFinderPage />,
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
        path: 'cinturillas',
        element: <CollectionPage title="Cinturillas" handle="cinturillas" description="Premium waist trainers designed for maximum compression and comfort." />,
      },
      {
        path: 'shorts',
        element: <CollectionPage title="Shorts" handle="shorts" description="Sculpting shorts for the perfect lift and control." />,
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
        path: 'returns',
        element: <ReturnsPage />,
      },
      {
        path: 'shipping',
        element: <ShippingPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'post-quirurgica',
        element: <CollectionPage title="Post-Quirúrgica (Stage 1)" handle="post-quirurgica" description="Medical-grade compression for the immediate post-op recovery phase." />,
      },
      {
        path: 'accesorios',
        element: <CollectionPage title="Medical Accessories" handle="accesorios" description="Professional foams, boards, and urinals for optimal recovery." />,
      },
      {
        path: 'account',
        element: <UserDashboard />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      }
    ]
  },
  {
    path: '/design-os',
    element: <ProductPage />,
  }
])
