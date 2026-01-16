
import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { StorefrontLayout } from '@/storefront/StorefrontLayout';
import { HomePage } from '@/storefront/HomePage';
import { RootErrorBoundary } from '@/components/RootErrorBoundary';

// Lazy load all pages for code splitting
const ProductPage = lazy(() => import('@/components/ProductPage').then(m => ({ default: m.ProductPage })));
const AcademiaView = lazy(() => import('@/sections/academia/AcademiaView'));
const LifestyleView = lazy(() => import('@/sections/lifestyle/LifestyleView'));
const PainPointsView = lazy(() => import('@/sections/pain-points/PainPointsView'));
const ProductDetailView = lazy(() => import('@/storefront/ProductDetailView').then(m => ({ default: m.ProductDetailView })));
const CartPage = lazy(() => import('@/storefront/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('@/storefront/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const AboutPage = lazy(() => import('@/storefront/AboutPage'));
const ContactPage = lazy(() => import('@/storefront/ContactPage'));
const UserDashboard = lazy(() => import('@/storefront/UserDashboard').then(m => ({ default: m.UserDashboard })));
const LabPage = lazy(() => import('@/storefront/LabPage').then(m => ({ default: m.LabPage })));
const CollectionPage = lazy(() => import('@/storefront/CollectionPage').then(m => ({ default: m.CollectionPage })));
const ShippingPage = lazy(() => import('@/storefront/ShippingPage').then(m => ({ default: m.ShippingPage })));
const PrivacyPage = lazy(() => import('@/storefront/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('@/storefront/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('@/storefront/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const FitFinderPage = lazy(() => import('@/storefront/FitFinderPage').then(m => ({ default: m.FitFinderPage })));
const FitGuaranteePage = lazy(() => import('@/storefront/pages/FitGuaranteePage'));
const WholesalePage = lazy(() => import('@/storefront/pages/WholesalePage'));
const PostSurgeryPage = lazy(() => import('@/storefront/pages/PostSurgeryPage'));
const BlogTemplate = lazy(() => import('@/storefront/pages/BlogTemplate'));
const HourglassPage = lazy(() => import('@/storefront/pages/HourglassPage'));
const EssentialsPage = lazy(() => import('@/storefront/pages/EssentialsPage'));
const BBLKitPage = lazy(() => import('@/storefront/pages/BBLKitPage'));
const OurStoryPage = lazy(() => import('@/storefront/pages/OurStoryPage'));
const FAQPage = lazy(() => import('@/storefront/pages/FAQPage'));

// MAES Content Ecosystem Assets
const RecoveryTimelineCalculator = lazy(() => import('@/storefront/pages/tools/RecoveryTimelineCalculator'));
const StageComparator = lazy(() => import('@/storefront/pages/tools/StageComparator'));
const GuitarRatioQuiz = lazy(() => import('@/storefront/pages/tools/GuitarRatioQuiz'));
const LipoFoamManual = lazy(() => import('@/storefront/pages/guides/LipoFoamManual'));
const FajaTroubleshooting = lazy(() => import('@/storefront/pages/guides/FajaTroubleshooting'));
const FibrosisBible = lazy(() => import('@/storefront/pages/blog/FibrosisBible'));
const AnatomyFaja = lazy(() => import('@/storefront/pages/blog/AnatomyFaja'));
const InflammationTimeline = lazy(() => import('@/storefront/pages/blog/InflammationTimeline'));
const SizingAsymmetric = lazy(() => import('@/storefront/pages/blog/SizingAsymmetric'));
const ArmBackLipo = lazy(() => import('@/storefront/pages/blog/ArmBackLipo'));
const SnatchTest = lazy(() => import('@/storefront/pages/blog/SnatchTest'));
const MorningRoutine = lazy(() => import('@/storefront/pages/blog/MorningRoutine'));
const WaistTrainingMyths = lazy(() => import('@/storefront/pages/blog/WaistTrainingMyths'));
const CurvyBridesLookbook = lazy(() => import('@/storefront/pages/lifestyle/CurvyBridesLookbook'));
const PostpartumVsLipo = lazy(() => import('@/storefront/pages/blog/PostpartumVsLipo'));
const CityLandingPage = lazy(() => import('@/storefront/pages/local/CityLandingPage'));
const GlossaryPage = lazy(() => import('@/storefront/pages/resources/GlossaryPage'));
const VsGenericPage = lazy(() => import('@/storefront/pages/resources/VsGenericPage'));
const BBLChecklist = lazy(() => import('@/storefront/pages/resources/BBLChecklist'));
const RecoveryDiaries = lazy(() => import('@/storefront/pages/social/RecoveryDiaries'));
const ToolsHubPage = lazy(() => import('@/storefront/pages/tools/ToolsHubPage'));

// Loading Fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
    <div className="animate-pulse text-[#D4AF37]">Cargando...</div>
  </div>
);

// Helper to wrap lazy components
const withSuspense = (Component: React.ComponentType<any>, props = {}) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component {...props} />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StorefrontLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'collections/recovery',
        element: withSuspense(PostSurgeryPage),
      },
      // Alias for legacy support
      {
        path: 'collections/post-surgery-fajas',
        element: withSuspense(PostSurgeryPage),
      },
      {
        path: 'collections/sculpt',
        element: withSuspense(HourglassPage),
      },
      // Alias for legacy support
      {
        path: 'collections/hourglass-shapewear',
        element: withSuspense(HourglassPage),
      },
      {
        path: 'collections/bras',
        element: withSuspense(EssentialsPage),
      },
      // Alias for legacy support
      {
        path: 'collections/lipo-foams-boards',
        element: withSuspense(EssentialsPage),
      },

      // --- VIEW ALL (Client Request) ---
      {
        path: 'collections/all',
        element: <Suspense fallback={<LoadingFallback />}><CollectionPage handle="all" title="Todo el Catálogo" description="Explora toda nuestra colección de fajas colombianas premium." /></Suspense>,
      },

      /* --- GRANULAR SEO COLLECTIONS (Programmatic) --- */
      // Matches /collections/recovery/stage-2, /collections/sculpt/post-lipo, etc.
      {
        path: 'collections/:silo/:filter',
        element: <Suspense fallback={<LoadingFallback />}><CollectionPage /></Suspense>,
      },

      {
        path: 'pages/bbl-recovery-kit',
        element: withSuspense(BBLKitPage),
      },
      // Alias
      {
        path: 'pages/bbl-surgery-essentials',
        element: withSuspense(BBLKitPage),
      },

      {
        path: 'lab',
        element: withSuspense(LabPage),
      },
      {
        path: 'cart',
        element: withSuspense(CartPage),
      },
      {
        path: 'checkout',
        element: withSuspense(CheckoutPage),
      },

      {
        path: 'fit-finder',
        element: withSuspense(FitFinderPage),
      },
      {
        path: 'pages/guia-de-tallas',
        element: withSuspense(FitFinderPage),
      },
      {
        path: 'lifestyle',
        element: withSuspense(LifestyleView),
      },
      {
        path: 'solutions',
        element: withSuspense(PainPointsView),
      },
      {
        path: 'institute',
        element: withSuspense(AcademiaView),
      },
      {
        path: 'products/:id',
        element: withSuspense(ProductDetailView),
      },
      {
        path: 'cinturillas',
        element: <Suspense fallback={<LoadingFallback />}><CollectionPage title="Cinturillas" handle="cinturillas" description="Premium waist trainers designed for maximum compression and comfort." /></Suspense>,
      },
      {
        path: 'shorts',
        element: <Suspense fallback={<LoadingFallback />}><CollectionPage title="Shorts" handle="shorts" description="Sculpting shorts for the perfect lift and control." /></Suspense>,
      },
      {
        path: 'about',
        element: withSuspense(AboutPage),
      },
      {
        path: 'contact',
        element: withSuspense(ContactPage),
      },
      {
        path: 'returns',
        element: withSuspense(FitGuaranteePage),
      },
      // Alias for direct link
      {
        path: 'pages/fit-guarantee',
        element: withSuspense(FitGuaranteePage),
      },
      // Alias for SEO
      {
        path: 'pages/cambios-y-devoluciones',
        element: withSuspense(FitGuaranteePage),
      },
      {
        path: 'pages/faq',
        element: withSuspense(FAQPage),
      },
      {
        path: 'pages/wholesale',
        element: withSuspense(WholesalePage),
      },
      // Alias
      {
        path: 'pages/programa-mayorista',
        element: withSuspense(WholesalePage),
      },
      {
        path: 'blogs/recovery-tips/:handle',
        element: withSuspense(BlogTemplate),
      },
      {
        path: 'shipping',
        element: withSuspense(ShippingPage),
      },
      {
        path: 'privacy',
        element: withSuspense(PrivacyPage),
      },
      {
        path: 'terms',
        element: withSuspense(TermsPage),
      },
      {
        path: 'post-quirurgica',
        element: <Suspense fallback={<LoadingFallback />}><CollectionPage title="Post-Quirúrgica (Stage 1)" handle="post-quirurgica" description="Medical-grade compression for the immediate post-op recovery phase." /></Suspense>,
      },

      {
        path: 'maternity',
        element: <Suspense fallback={<LoadingFallback />}><CollectionPage title="Maternidad" handle="maternity" description="Support and recovery for your post-partum journey." /></Suspense>,
      },
      // FAILSAFE ALIASES (User reported dead links)
      {
        path: 'bras',
        element: withSuspense(EssentialsPage),
      },

      {
        path: 'account',
        element: withSuspense(UserDashboard),
      },
      {
        path: 'pages/our-story',
        element: withSuspense(OurStoryPage),
      },
      {
        path: 'pages/tracking',
        element: withSuspense(UserDashboard), // Or ShippingPage, but Account is safer for tracking logic
      },

      /* --- MAES CONTENT ECOSYSTEM ROUTES --- */
      // 1. Money Pages (Tools & Guides)
      { path: 'tools', element: withSuspense(ToolsHubPage) },
      { path: 'tools/recovery-timeline', element: withSuspense(RecoveryTimelineCalculator) },
      { path: 'tools/stage1-vs-stage2', element: withSuspense(StageComparator) },
      { path: 'tools/calculator', element: withSuspense(GuitarRatioQuiz) },
      { path: 'tools/guitar-ratio', element: withSuspense(GuitarRatioQuiz) },
      { path: 'guides/lipo-foam-manual', element: withSuspense(LipoFoamManual) },
      { path: 'guides/troubleshooting', element: withSuspense(FajaTroubleshooting) },

      // 2. Authority Cluster
      { path: 'blog/fibrosis-bible', element: withSuspense(FibrosisBible) },
      { path: 'blog/anatomy-of-faja', element: withSuspense(AnatomyFaja) },
      { path: 'blog/inflammation-timeline', element: withSuspense(InflammationTimeline) },
      { path: 'blog/sizing-asymmetric', element: withSuspense(SizingAsymmetric) },
      { path: 'blog/arm-back-lipo', element: withSuspense(ArmBackLipo) },

      // 3. Lifestyle
      { path: 'blog/snatch-test', element: withSuspense(SnatchTest) },
      { path: 'blog/morning-routine', element: withSuspense(MorningRoutine) },
      { path: 'blog/waist-training-myths', element: withSuspense(WaistTrainingMyths) },
      { path: 'gallery/curvy-brides', element: withSuspense(CurvyBridesLookbook) },
      { path: 'blog/postpartum-vs-lipo', element: withSuspense(PostpartumVsLipo) },

      // 4. Technical & Local
      { path: 'local/:city', element: withSuspense(CityLandingPage) },
      { path: 'glossary', element: withSuspense(GlossaryPage) },
      { path: 'compare/vs-generic', element: withSuspense(VsGenericPage) },
      { path: 'resources/bbl-checklist', element: withSuspense(BBLChecklist) },
      { path: 'stories/recovery-diaries', element: withSuspense(RecoveryDiaries) },

      {
        path: '*',
        element: withSuspense(NotFoundPage),
      }
    ]
  },
  {
    path: '/design-os',
    element: withSuspense(ProductPage),
  }
])
