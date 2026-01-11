import { createBrowserRouter } from 'react-router-dom'
import { ProductPage } from '@/components/ProductPage'
import AcademiaView from '@/sections/academia/AcademiaView'
import MedicalHubView from '@/sections/medical-hub/MedicalHubView'
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
import { ShippingPage } from '@/storefront/ShippingPage'
import { PrivacyPage } from '@/storefront/PrivacyPage'
import { TermsPage } from '@/storefront/TermsPage'
import { NotFoundPage } from '@/storefront/NotFoundPage'
import { FitFinderPage } from '@/storefront/FitFinderPage'
import FitGuaranteePage from '@/storefront/pages/FitGuaranteePage'
import WholesalePage from '@/storefront/pages/WholesalePage'
import PostSurgeryPage from '@/storefront/pages/PostSurgeryPage'
import BlogTemplate from '@/storefront/pages/BlogTemplate'
import HourglassPage from '@/storefront/pages/HourglassPage'
import EssentialsPage from '@/storefront/pages/EssentialsPage'
import BBLKitPage from '@/storefront/pages/BBLKitPage'
import OurStoryPage from '@/storefront/pages/OurStoryPage'
import FAQPage from '@/storefront/pages/FAQPage'

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
        path: 'collections/recovery',
        element: <PostSurgeryPage />,
      },
      // Alias for legacy support
      {
        path: 'collections/post-surgery-fajas',
        element: <PostSurgeryPage />,
      },
      {
        path: 'collections/sculpt',
        element: <HourglassPage />,
      },
      // Alias for legacy support
      {
        path: 'collections/hourglass-shapewear',
        element: <HourglassPage />,
      },
      {
        path: 'collections/bras',
        element: <EssentialsPage />,
      },
      // Alias for legacy support
      {
        path: 'collections/lipo-foams-boards',
        element: <EssentialsPage />,
      },
      {
        path: 'pages/bbl-recovery-kit',
        element: <BBLKitPage />,
      },
      // Alias
      {
        path: 'pages/bbl-surgery-essentials',
        element: <BBLKitPage />,
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
        path: 'pages/guia-de-tallas',
        element: <FitFinderPage />,
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
        element: <FitGuaranteePage />,
      },
      // Alias for direct link
      {
        path: 'pages/fit-guarantee',
        element: <FitGuaranteePage />,
      },
      // Alias for SEO
      {
        path: 'pages/cambios-y-devoluciones',
        element: <FitGuaranteePage />,
      },
      {
        path: 'pages/faq',
        element: <FAQPage />,
      },
      {
        path: 'pages/wholesale',
        element: <WholesalePage />,
      },
      // Alias
      {
        path: 'pages/programa-mayorista',
        element: <WholesalePage />,
      },
      {
        path: 'blogs/recovery-tips/:handle',
        element: <BlogTemplate />,
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
        path: 'maternity',
        element: <CollectionPage title="Maternidad" handle="maternity" description="Support and recovery for your post-partum journey." />,
      },
      {
        path: 'account',
        element: <UserDashboard />,
      },
      {
        path: 'pages/our-story',
        element: <OurStoryPage />,
      },
      {
        path: 'pages/tracking',
        element: <UserDashboard />, // Or ShippingPage, but Account is safer for tracking logic
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
