import { createBrowserRouter, Navigate, useLocation, useParams } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { StorefrontLayout } from '@/storefront/StorefrontLayout';
import { HomePage } from '@/storefront/HomePage';
import i18n from '@/i18n';

// Lazy load all pages for code splitting

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

// --- i18n Helpers ---

const LangWrapper = ({ lang, children }: { lang: string; children: React.ReactNode }) => {
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);
  return <>{children}</>;
};

const LocalizedNavigate = ({ to }: { to: string }) => {
  const location = useLocation();
  const isEn = location.pathname.startsWith('/en');
  // If current path is english, and target doesn't already have /en, prepend it.
  // NOTE: 'to' must be absolute path for this logic to be simple.
  const target = (isEn && !to.startsWith('/en')) ? `/en${to}` : to;
  return <Navigate to={target} replace />;
};

// --- ROUTES DEFINITION ---
// These are passed as children to both / (es) and /en (en) roots.

const sharedRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  /* --- COLECCIONES (Rutas Principales en Español) --- */
  {
    path: 'colecciones/recuperacion-postquirurgica',
    element: withSuspense(PostSurgeryPage),
  },
  // English route (renders same component)
  {
    path: 'collections/post-surgery-recovery',
    element: withSuspense(PostSurgeryPage),
  },
  // Aliases: Redirect to Canonical
  { path: 'collections/recovery', element: <LocalizedNavigate to="/colecciones/recuperacion-postquirurgica" /> },
  { path: 'collections/post-surgery-fajas', element: <LocalizedNavigate to="/colecciones/recuperacion-postquirurgica" /> },
  { path: 'colecciones/recuperacion', element: <LocalizedNavigate to="/colecciones/recuperacion-postquirurgica" /> },

  {
    path: 'colecciones/moldeo-y-estetica',
    element: withSuspense(HourglassPage),
  },
  // English route
  {
    path: 'collections/sculpting-shapewear',
    element: withSuspense(HourglassPage),
  },
  {
    path: 'colecciones/fajas-reloj-de-arena',
    element: withSuspense(HourglassPage),
  },
  // Aliases: Redirect to Canonical
  { path: 'collections/sculpt', element: <LocalizedNavigate to="/colecciones/moldeo-y-estetica" /> },
  { path: 'collections/hourglass-shapewear', element: <LocalizedNavigate to="/colecciones/moldeo-y-estetica" /> },
  { path: 'colecciones/moldeo', element: <LocalizedNavigate to="/colecciones/moldeo-y-estetica" /> },

  {
    path: 'colecciones/brasieres-y-postura',
    element: withSuspense(EssentialsPage),
  },
  // English route
  {
    path: 'collections/bras-and-posture',
    element: withSuspense(EssentialsPage),
  },
  // Aliases: Redirect to Canonical
  { path: 'collections/bras', element: <LocalizedNavigate to="/colecciones/brasieres-y-postura" /> },
  { path: 'collections/lipo-foams-boards', element: <LocalizedNavigate to="/colecciones/brasieres-y-postura" /> },
  { path: 'colecciones/brasieres', element: <LocalizedNavigate to="/colecciones/brasieres-y-postura" /> },

  // --- TODO EL CATÁLOGO ---
  {
    path: 'colecciones/todo',
    element: <Suspense fallback={<LoadingFallback />}><CollectionPage handle="all" /></Suspense>,
  },
  // English route
  {
    path: 'collections/all',
    element: <Suspense fallback={<LoadingFallback />}><CollectionPage handle="all" /></Suspense>,
  },

  /* --- COLECCIONES GRANULARES SEO --- */
  {
    path: 'colecciones/:silo/:filter',
    element: <Suspense fallback={<LoadingFallback />}><CollectionPage /></Suspense>,
  },

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
  { path: 'pages/bbl-surgery-essentials', element: <LocalizedNavigate to="/pages/bbl-recovery-kit" /> },

  {
    path: 'laboratorio',
    element: withSuspense(LabPage),
  },
  // English route
  {
    path: 'lab',
    element: withSuspense(LabPage),
  },

  {
    path: 'carrito',
    element: withSuspense(CartPage),
  },
  // English route
  {
    path: 'cart',
    element: withSuspense(CartPage),
  },

  {
    path: 'pago',
    element: withSuspense(CheckoutPage),
  },
  // English route
  {
    path: 'checkout',
    element: withSuspense(CheckoutPage),
  },

  {
    path: 'calculadora-de-tallas',
    element: withSuspense(FitFinderPage),
  },
  // English route
  {
    path: 'fit-finder',
    element: withSuspense(FitFinderPage),
  },
  { path: 'pages/guia-de-tallas', element: <LocalizedNavigate to="/calculadora-de-tallas" /> },

  {
    path: 'solutions',
    element: withSuspense(PainPointsView),
  },
  {
    path: 'institute',
    element: withSuspense(AcademiaView),
  },
  { path: 'instituto', element: <LocalizedNavigate to="/institute" /> },

  // Rutas de productos
  {
    path: 'producto/:id',
    element: withSuspense(ProductDetailView),
  },
  { path: 'products/:id', element: withSuspense(ProductDetailView) },

  { path: 'products', element: <LocalizedNavigate to="/colecciones/todo" /> },

  // Legacy direct paths -> Redirect to Granular
  {
    path: 'cinturillas',
    element: <LocalizedNavigate to="/colecciones/moldeo-y-estetica/cinturillas" />,
  },
  {
    path: 'shorts',
    element: <LocalizedNavigate to="/colecciones/moldeo-y-estetica/shorts" />,
  },

  /* --- PÁGINAS INFORMATIVAS --- */
  {
    path: 'nosotros',
    element: withSuspense(AboutPage),
  },
  // English route
  {
    path: 'about',
    element: withSuspense(AboutPage),
  },

  {
    path: 'contacto',
    element: withSuspense(ContactPage),
  },
  // English route
  {
    path: 'contact',
    element: withSuspense(ContactPage),
  },

  {
    path: 'devoluciones',
    element: withSuspense(FitGuaranteePage),
  },
  { path: 'returns', element: <LocalizedNavigate to="/devoluciones" /> },
  { path: 'pages/fit-guarantee', element: <LocalizedNavigate to="/devoluciones" /> },
  { path: 'pages/cambios-y-devoluciones', element: <LocalizedNavigate to="/devoluciones" /> },

  {
    path: 'pages/faq',
    element: withSuspense(FAQPage),
  },
  {
    path: 'pages/wholesale',
    element: withSuspense(WholesalePage),
  },
  { path: 'pages/programa-mayorista', element: <LocalizedNavigate to="/pages/wholesale" /> },

  {
    path: 'blogs/recovery-tips/:handle',
    element: withSuspense(BlogTemplate),
  },
  {
    path: 'envios',
    element: withSuspense(ShippingPage),
  },
  { path: 'shipping', element: <LocalizedNavigate to="/envios" /> },

  {
    path: 'privacidad',
    element: withSuspense(PrivacyPage),
  },
  { path: 'privacy', element: <LocalizedNavigate to="/privacidad" /> },

  {
    path: 'terminos',
    element: withSuspense(TermsPage),
  },
  { path: 'terms', element: <LocalizedNavigate to="/terminos" /> },

  // Legacy Collections -> Redirect
  {
    path: 'post-quirurgica',
    element: <LocalizedNavigate to="/colecciones/recuperacion-postquirurgica/etapa-1" />,
  },
  {
    path: 'maternity',
    element: <LocalizedNavigate to="/colecciones/recuperacion-postquirurgica/post-parto" />,
  },
  {
    path: 'bras',
    element: <LocalizedNavigate to="/colecciones/brasieres-y-postura" />,
  },

  {
    path: 'cuenta',
    element: withSuspense(UserDashboard),
  },
  { path: 'account', element: <LocalizedNavigate to="/cuenta" /> },

  {
    path: 'nuestra-historia',
    element: withSuspense(OurStoryPage),
  },
  { path: 'pages/our-story', element: <LocalizedNavigate to="/nuestra-historia" /> },

  {
    path: 'rastreo',
    element: withSuspense(UserDashboard),
  },
  { path: 'pages/tracking', element: <LocalizedNavigate to="/rastreo" /> },

  /* --- ECOSISTEMA DE CONTENIDO MAES --- */
  // 1. Herramientas y Guías (Rutas en Español)
  { path: 'herramientas', element: withSuspense(ToolsHubPage) },
  { path: 'herramientas/linea-de-tiempo-recuperacion', element: withSuspense(RecoveryTimelineCalculator) },
  { path: 'herramientas/comparador-de-etapas', element: withSuspense(StageComparator) },
  { path: 'herramientas/calculadora-reloj-de-arena', element: withSuspense(GuitarRatioQuiz) },

  // Legacy / English Aliases -> Redirects
  { path: 'herramientas/linea-de-tiempo', element: <LocalizedNavigate to="/herramientas/linea-de-tiempo-recuperacion" /> },
  { path: 'herramientas/etapa1-vs-etapa2', element: <LocalizedNavigate to="/herramientas/comparador-de-etapas" /> },
  { path: 'herramientas/calculadora', element: <LocalizedNavigate to="/herramientas/calculadora-reloj-de-arena" /> },
  { path: 'herramientas/ratio-guitarra', element: <LocalizedNavigate to="/herramientas/calculadora-reloj-de-arena" /> },
  { path: 'tools', element: <LocalizedNavigate to="/herramientas" /> },
  { path: 'tools/recovery-timeline', element: <LocalizedNavigate to="/herramientas/linea-de-tiempo-recuperacion" /> },
  { path: 'tools/stage1-vs-stage2', element: <LocalizedNavigate to="/herramientas/comparador-de-etapas" /> },
  { path: 'tools/calculator', element: <LocalizedNavigate to="/herramientas/calculadora-reloj-de-arena" /> },
  { path: 'tools/guitar-ratio', element: <LocalizedNavigate to="/herramientas/calculadora-reloj-de-arena" /> },

  { path: 'guias/manual-espuma-lipo', element: withSuspense(LipoFoamManual) },
  { path: 'guias/solucion-problemas', element: withSuspense(FajaTroubleshooting) },

  // Aliases -> Redirects
  { path: 'guides/lipo-foam-manual', element: <LocalizedNavigate to="/guias/manual-espuma-lipo" /> },
  { path: 'guides/troubleshooting', element: <LocalizedNavigate to="/guias/solucion-problemas" /> },

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
  { path: 'blog/fibrosis-bible', element: <LocalizedNavigate to="/articulos/biblia-fibrosis" /> },
  { path: 'blog/anatomy-of-faja', element: <LocalizedNavigate to="/articulos/anatomia-faja" /> },
  { path: 'blog/inflammation-timeline', element: <LocalizedNavigate to="/articulos/linea-tiempo-inflamacion" /> },
  { path: 'blog/sizing-asymmetric', element: <LocalizedNavigate to="/articulos/tallas-asimetricas" /> },
  { path: 'blog/arm-back-lipo', element: <LocalizedNavigate to="/articulos/lipo-brazos-espalda" /> },
  { path: 'blog/snatch-test', element: <LocalizedNavigate to="/articulos/snatch-test" /> },
  { path: 'blog/morning-routine', element: <LocalizedNavigate to="/articulos/rutina-manana" /> },
  { path: 'blog/waist-training-myths', element: <LocalizedNavigate to="/articulos/mitos-waist-training" /> },
  { path: 'blog/postpartum-vs-lipo', element: <LocalizedNavigate to="/articulos/postparto-vs-lipo" /> },

  // 3. Galería y Lifestyle
  { path: 'galeria/novias-curvas', element: withSuspense(CurvyBridesLookbook) },
  { path: 'gallery/curvy-brides', element: <LocalizedNavigate to="/galeria/novias-curvas" /> },

  // 4. Recursos y Local
  { path: 'local/:city', element: withSuspense(CityLandingPage) },
  { path: 'glosario', element: withSuspense(GlossaryPage) },
  { path: 'glossary', element: <LocalizedNavigate to="/glosario" /> },
  { path: 'comparar/vs-genericas', element: withSuspense(VsGenericPage) },
  { path: 'compare/vs-generic', element: <LocalizedNavigate to="/comparar/vs-genericas" /> },
  { path: 'recursos/checklist-bbl', element: withSuspense(BBLChecklist) },
  { path: 'resources/bbl-checklist', element: <LocalizedNavigate to="/recursos/checklist-bbl" /> },
  { path: 'historias/diarios-recuperacion', element: withSuspense(RecoveryDiaries) },
  { path: 'stories/recovery-diaries', element: <LocalizedNavigate to="/historias/diarios-recuperacion" /> },

  /* --- CHECKOUT REDIRECT FAILSAFE --- */
  {
    path: 'cart/c/:id',
    element: <CheckoutRedirect />,
  },
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  }
];

// Component to handle the redirect logic
function CheckoutRedirect() {
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    // Construct the full Shopify Checkout URL
    // The key is usually in the query params
    const searchParams = new URLSearchParams(location.search);
    const key = searchParams.get('key');

    if (id && key) {
      // Force redirect to the correct myshopify domain
      // We add auto_redirect=false and skip_shop_pay=true to prevent Shopify from serving the headless domain
      // We also add &logged_in=true to force a session check which sometimes bypasses the domain redirect
      const checkoutUrl = `https://92542c-b5.myshopify.com/cart/c/${id}?key=${key}&auto_redirect=false&edge_redirect=true&skip_shop_pay=true&logged_in=true`;

      // Attempt redirect
      window.location.replace(checkoutUrl);
    } else {
      // If invalid, go back to cart
      window.location.href = '/carrito';
    }
  }, [id, location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] p-4 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mb-4"></div>
      <h2 className="text-xl font-serif text-[#1C1C1C] mb-2">Redirigiendo a Shopify...</h2>
      <p className="text-gray-600 mb-6">Si no eres redirigido autom&aacute;ticamente, haz clic abajo:</p>
      {id && (
        <a
          href={`https://92542c-b5.myshopify.com/cart/c/${id}?key=${new URLSearchParams(location.search).get('key')}&auto_redirect=false&edge_redirect=true&skip_shop_pay=true`}
          className="bg-[#1C1C1C] text-white px-6 py-3 rounded hover:bg-[#333] transition-colors"
        >
          Ir a Pagar (Enlace Seguro)
        </a>
      )}
    </div>
  );
}

export const router = createBrowserRouter([
  /* --- ROOT LEVEL CHECKOUT REDIRECT --- */
  // Handles cases where Shopify redirects to root domain without language prefix
  {
    path: '/cart/c/:id',
    element: <CheckoutRedirect />
  },
  // Also match with trailing slash just in case
  {
    path: '/cart/c/:id/',
    element: <CheckoutRedirect />
  },
  {
    path: '/en',
    element: <LangWrapper lang="en"><StorefrontLayout /></LangWrapper>,
    children: sharedRoutes
  },
  {
    path: '/es',
    element: <LangWrapper lang="es"><StorefrontLayout /></LangWrapper>,
    children: sharedRoutes
  },
  {
    path: '/',
    element: <Navigate to="/es" replace />
  },
  /* --- GLOBAL FAIL-SAFE (CATCH-ALL) --- */
  // Catches any path that didn't match above (like /pago if Netlify missed it, or malformed URLs)
  // Instead of crashing, we redirect to the Spanish 404 or Home
  {
    path: '*',
    element: <Navigate to="/es/404" replace />
  }
]);
