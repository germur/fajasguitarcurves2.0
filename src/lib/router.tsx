
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { StorefrontLayout } from '@/storefront/StorefrontLayout';
import { HomePage } from '@/storefront/HomePage';
import { RootErrorBoundary } from '@/components/RootErrorBoundary';

// Lazy load all pages for code splitting
const ProductPage = lazy(() => import('@/components/ProductPage').then(m => ({ default: m.ProductPage })));
const AcademiaView = lazy(() => import('@/sections/academia/AcademiaView'));
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
      /* --- COLECCIONES (Rutas Principales en Español) --- */
      {
        path: 'colecciones/recuperacion-postquirurgica',
        element: withSuspense(PostSurgeryPage),
      },
      // Aliases: Redirect to Canonical
      { path: 'collections/recovery', element: <Navigate to="/colecciones/recuperacion-postquirurgica" replace /> },
      { path: 'collections/post-surgery-fajas', element: <Navigate to="/colecciones/recuperacion-postquirurgica" replace /> },
      { path: 'colecciones/recuperacion', element: <Navigate to="/colecciones/recuperacion-postquirurgica" replace /> },

      {
        path: 'colecciones/moldeo-y-estetica',
        element: withSuspense(HourglassPage),
      },
      {
        path: 'colecciones/fajas-reloj-de-arena',
        element: withSuspense(HourglassPage),
      },
      // Aliases: Redirect to Canonical
      { path: 'collections/sculpt', element: <Navigate to="/colecciones/moldeo-y-estetica" replace /> },
      { path: 'collections/hourglass-shapewear', element: <Navigate to="/colecciones/moldeo-y-estetica" replace /> },
      { path: 'colecciones/moldeo', element: <Navigate to="/colecciones/moldeo-y-estetica" replace /> },

      {
        path: 'colecciones/brasieres-y-postura',
        element: withSuspense(EssentialsPage),
      },
      // Aliases: Redirect to Canonical
      { path: 'collections/bras', element: <Navigate to="/colecciones/brasieres-y-postura" replace /> },
      { path: 'collections/lipo-foams-boards', element: <Navigate to="/colecciones/brasieres-y-postura" replace /> },
      { path: 'colecciones/brasieres', element: <Navigate to="/colecciones/brasieres-y-postura" replace /> },

      // --- TODO EL CATÁLOGO ---
      {
        path: 'colecciones/todo',
        element: <Suspense fallback={<LoadingFallback />}><CollectionPage handle="all" title="Todo el Catálogo" description="Explora toda nuestra colección de fajas colombianas premium." /></Suspense>,
      },
      { path: 'collections/all', element: <Navigate to="/colecciones/todo" replace /> },

      /* --- COLECCIONES GRANULARES SEO --- */
      {
        path: 'colecciones/:silo/:filter',
        element: <Suspense fallback={<LoadingFallback />}><CollectionPage /></Suspense>,
      },
      // Redirect English granular to Spanish base (best effort, logic in CollectionPage handles the rest if mapped)
      // But path matching is tricky. We'll leave the alias element for dynamic params if we want to support them, 
      // OR we just let CollectionPage handle it. 
      // Better to redirect if we can, but parameters make it hard to statically redirect without a wrapper.
      // We will leave dynamic aliases as-is for now, as they are less common top-level entry points.
      { path: 'collections/:silo/:filter', element: <Suspense fallback={<LoadingFallback />}><CollectionPage /></Suspense> },

      // New: Generic SEO Collections
      {
        path: 'colecciones/:handle',
        element: <Suspense fallback={<LoadingFallback />}><CollectionPage /></Suspense>
      },
      {
        path: 'collections/:handle',
        element: <Suspense fallback={<LoadingFallback />}><CollectionPage /></Suspense>
      },

      {
        path: 'pages/bbl-recovery-kit',
        element: withSuspense(BBLKitPage),
      },
      { path: 'pages/bbl-surgery-essentials', element: <Navigate to="/pages/bbl-recovery-kit" replace /> },

      {
        path: 'laboratorio',
        element: withSuspense(LabPage),
      },
      { path: 'lab', element: <Navigate to="/laboratorio" replace /> },

      {
        path: 'carrito',
        element: withSuspense(CartPage),
      },
      { path: 'cart', element: <Navigate to="/carrito" replace /> },

      {
        path: 'pago',
        element: withSuspense(CheckoutPage),
      },
      { path: 'checkout', element: <Navigate to="/pago" replace /> },

      {
        path: 'calculadora-de-tallas',
        element: withSuspense(FitFinderPage),
      },
      { path: 'fit-finder', element: <Navigate to="/calculadora-de-tallas" replace /> },
      { path: 'pages/guia-de-tallas', element: <Navigate to="/calculadora-de-tallas" replace /> },

      {
        path: 'solutions',
        element: withSuspense(PainPointsView),
      },
      {
        path: 'institute',
        element: withSuspense(AcademiaView),
      },
      { path: 'instituto', element: <Navigate to="/institute" replace /> }, // Or vice-versa if we want Spanish

      // Rutas de productos
      {
        path: 'producto/:id',
        element: withSuspense(ProductDetailView),
      },
      { path: 'products/:id', element: withSuspense(ProductDetailView) }, // Keep English for Shopify standard compatibility? Or redirect? Redirect is safer for SEO.
      // Managing param redirect needs a wrapper. Passing for now.

      { path: 'products', element: <Navigate to="/colecciones/todo" replace /> },

      // Legacy direct paths -> Redirect to Granular
      {
        path: 'cinturillas',
        element: <Navigate to="/colecciones/moldeo-y-estetica/cinturillas" replace />,
      },
      {
        path: 'shorts',
        element: <Navigate to="/colecciones/moldeo-y-estetica/shorts" replace />,
      },

      /* --- PÁGINAS INFORMATIVAS --- */
      {
        path: 'nosotros',
        element: withSuspense(AboutPage),
      },
      { path: 'about', element: <Navigate to="/nosotros" replace /> },

      {
        path: 'contacto',
        element: withSuspense(ContactPage),
      },
      { path: 'contact', element: <Navigate to="/contacto" replace /> },

      {
        path: 'devoluciones',
        element: withSuspense(FitGuaranteePage),
      },
      { path: 'returns', element: <Navigate to="/devoluciones" replace /> },
      { path: 'pages/fit-guarantee', element: <Navigate to="/devoluciones" replace /> },
      { path: 'pages/cambios-y-devoluciones', element: <Navigate to="/devoluciones" replace /> },

      {
        path: 'pages/faq',
        element: withSuspense(FAQPage),
      },
      {
        path: 'pages/wholesale',
        element: withSuspense(WholesalePage),
      },
      { path: 'pages/programa-mayorista', element: <Navigate to="/pages/wholesale" replace /> },

      {
        path: 'blogs/recovery-tips/:handle',
        element: withSuspense(BlogTemplate),
      },
      {
        path: 'envios',
        element: withSuspense(ShippingPage),
      },
      { path: 'shipping', element: <Navigate to="/envios" replace /> },

      {
        path: 'privacidad',
        element: withSuspense(PrivacyPage),
      },
      { path: 'privacy', element: <Navigate to="/privacidad" replace /> },

      {
        path: 'terminos',
        element: withSuspense(TermsPage),
      },
      { path: 'terms', element: <Navigate to="/terminos" replace /> },

      // Legacy Collections -> Redirect
      {
        path: 'post-quirurgica',
        element: <Navigate to="/colecciones/recuperacion-postquirurgica/etapa-1" replace />,
      },
      {
        path: 'maternity',
        element: <Navigate to="/colecciones/recuperacion-postquirurgica/post-parto" replace />,
      },
      {
        path: 'bras',
        element: <Navigate to="/colecciones/brasieres-y-postura" replace />,
      },

      {
        path: 'cuenta',
        element: withSuspense(UserDashboard),
      },
      { path: 'account', element: <Navigate to="/cuenta" replace /> },

      {
        path: 'nuestra-historia',
        element: withSuspense(OurStoryPage),
      },
      { path: 'pages/our-story', element: <Navigate to="/nuestra-historia" replace /> },

      {
        path: 'rastreo',
        element: withSuspense(UserDashboard),
      },
      { path: 'pages/tracking', element: <Navigate to="/rastreo" replace /> },

      /* --- ECOSISTEMA DE CONTENIDO MAES --- */
      // 1. Herramientas y Guías (Rutas en Español)
      { path: 'herramientas', element: withSuspense(ToolsHubPage) },
      { path: 'herramientas/linea-de-tiempo-recuperacion', element: withSuspense(RecoveryTimelineCalculator) },
      { path: 'herramientas/comparador-de-etapas', element: withSuspense(StageComparator) },
      { path: 'herramientas/calculadora-reloj-de-arena', element: withSuspense(GuitarRatioQuiz) },

      // Legacy / English Aliases -> Redirects
      { path: 'herramientas/linea-de-tiempo', element: <Navigate to="/herramientas/linea-de-tiempo-recuperacion" replace /> },
      { path: 'herramientas/etapa1-vs-etapa2', element: <Navigate to="/herramientas/comparador-de-etapas" replace /> },
      { path: 'herramientas/calculadora', element: <Navigate to="/herramientas/calculadora-reloj-de-arena" replace /> },
      { path: 'herramientas/ratio-guitarra', element: <Navigate to="/herramientas/calculadora-reloj-de-arena" replace /> },
      { path: 'tools', element: <Navigate to="/herramientas" replace /> },
      { path: 'tools/recovery-timeline', element: <Navigate to="/herramientas/linea-de-tiempo-recuperacion" replace /> },
      { path: 'tools/stage1-vs-stage2', element: <Navigate to="/herramientas/comparador-de-etapas" replace /> },
      { path: 'tools/calculator', element: <Navigate to="/herramientas/calculadora-reloj-de-arena" replace /> },
      { path: 'tools/guitar-ratio', element: <Navigate to="/herramientas/calculadora-reloj-de-arena" replace /> },

      { path: 'guias/manual-espuma-lipo', element: withSuspense(LipoFoamManual) },
      { path: 'guias/solucion-problemas', element: withSuspense(FajaTroubleshooting) },

      // Aliases -> Redirects
      { path: 'guides/lipo-foam-manual', element: <Navigate to="/guias/manual-espuma-lipo" replace /> },
      { path: 'guides/troubleshooting', element: <Navigate to="/guias/solucion-problemas" replace /> },

      // 2. Artículos (Blog en Español)
      { path: 'articulos/biblia-fibrosis', element: withSuspense(FibrosisBible) },
      { path: 'articulos/anatomia-faja', element: withSuspense(AnatomyFaja) },
      { path: 'articulos/linea-tiempo-inflamacion', element: withSuspense(InflammationTimeline) },
      { path: 'articulos/tallas-asimetricas', element: withSuspense(SizingAsymmetric) },
      { path: 'articulos/lipo-brazos-espalda', element: withSuspense(ArmBackLipo) },
      { path: 'articulos/snatch-test', element: withSuspense(SnatchTest) },
      { path: 'articulos/rutina-manana', element: withSuspense(MorningRoutine) },
      { path: 'articulos/mitos-waist-training', element: withSuspense(WaistTrainingMyths) },
      { path: 'articulos/postparto-vs-lipo', element: withSuspense(PostpartumVsLipo) },

      // Aliases -> Redirects
      { path: 'blog/fibrosis-bible', element: <Navigate to="/articulos/biblia-fibrosis" replace /> },
      { path: 'blog/anatomy-of-faja', element: <Navigate to="/articulos/anatomia-faja" replace /> },
      { path: 'blog/inflammation-timeline', element: <Navigate to="/articulos/linea-tiempo-inflamacion" replace /> },
      { path: 'blog/sizing-asymmetric', element: <Navigate to="/articulos/tallas-asimetricas" replace /> },
      { path: 'blog/arm-back-lipo', element: <Navigate to="/articulos/lipo-brazos-espalda" replace /> },
      { path: 'blog/snatch-test', element: <Navigate to="/articulos/snatch-test" replace /> },
      { path: 'blog/morning-routine', element: <Navigate to="/articulos/rutina-manana" replace /> },
      { path: 'blog/waist-training-myths', element: <Navigate to="/articulos/mitos-waist-training" replace /> },
      { path: 'blog/postpartum-vs-lipo', element: <Navigate to="/articulos/postparto-vs-lipo" replace /> },

      // 3. Galería y Lifestyle
      { path: 'galeria/novias-curvas', element: withSuspense(CurvyBridesLookbook) },
      { path: 'gallery/curvy-brides', element: <Navigate to="/galeria/novias-curvas" replace /> },

      // 4. Recursos y Local
      { path: 'local/:city', element: withSuspense(CityLandingPage) },
      { path: 'glosario', element: withSuspense(GlossaryPage) },
      { path: 'glossary', element: <Navigate to="/glosario" replace /> },
      { path: 'comparar/vs-genericas', element: withSuspense(VsGenericPage) },
      { path: 'compare/vs-generic', element: <Navigate to="/comparar/vs-genericas" replace /> },
      { path: 'recursos/checklist-bbl', element: withSuspense(BBLChecklist) },
      { path: 'resources/bbl-checklist', element: <Navigate to="/recursos/checklist-bbl" replace /> },
      { path: 'historias/diarios-recuperacion', element: withSuspense(RecoveryDiaries) },
      { path: 'stories/recovery-diaries', element: <Navigate to="/historias/diarios-recuperacion" replace /> },

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
