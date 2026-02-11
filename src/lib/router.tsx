
import { createBrowserRouter, Navigate, useParams, generatePath } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { StorefrontLayout } from '@/storefront/StorefrontLayout';
import { HomePage } from '@/storefront/HomePage';
import i18n from '@/i18n';

// Helper for named exports
const lazyNamed = (importPromise: Promise<any>, name: string) =>
  lazy(() => importPromise.then((module) => ({ default: module[name] })));

// Componentes Lazy (Carga diferida)
// Sections (Default Exports)
const AcademiaView = lazy(() => import('@/sections/academia/AcademiaView'));
const GuitarCurvesView = lazy(() => import('@/sections/guitar-curves/GuitarCurvesView'));
// const LifestyleView = lazy(() => import('@/sections/lifestyle/LifestyleView')); // MISSING
// const MedicalHubView = lazy(() => import('@/sections/medical-hub/MedicalHubView')); // MISSING
const PainPointsView = lazy(() => import('@/sections/pain-points/PainPointsView'));
const SolutionsView = lazy(() => import('@/sections/solutions/SolutionsView'));

// Storefront Root Components (Named Exports)
const ProductDetailView = lazyNamed(import('@/storefront/ProductDetailView'), 'ProductDetailView');
const CollectionPage = lazyNamed(import('@/storefront/CollectionPage'), 'CollectionPage');
const AboutPage = lazy(() => import('@/storefront/AboutPage'));
const ContactPage = lazy(() => import('@/storefront/ContactPage'));
// const FAQPage = lazyNamed(import('@/storefront/FAQPage'), 'FAQPage'); // Moved to pages/ (Default)
const ShippingPage = lazyNamed(import('@/storefront/ShippingPage'), 'ShippingPage');
const ReturnsPage = lazyNamed(import('@/storefront/ReturnsPage'), 'ReturnsPage');
const PrivacyPage = lazyNamed(import('@/storefront/PrivacyPage'), 'PrivacyPage');
const TermsPage = lazyNamed(import('@/storefront/TermsPage'), 'TermsPage');
const FitFinderPage = lazyNamed(import('@/storefront/FitFinderPage'), 'FitFinderPage');
const LabPage = lazyNamed(import('@/storefront/LabPage'), 'LabPage');
const CartPage = lazyNamed(import('@/storefront/CartPage'), 'CartPage');
const CheckoutPage = lazyNamed(import('@/storefront/CheckoutPage'), 'CheckoutPage');
const NotFoundPage = lazyNamed(import('@/storefront/NotFoundPage'), 'NotFoundPage');
const UserDashboard = lazyNamed(import('@/storefront/UserDashboard'), 'UserDashboard');

// Storefront Pages (Default Exports)
const FAQPage = lazy(() => import('@/storefront/pages/FAQPage')); // Corrected path
const WholesalePage = lazy(() => import('@/storefront/pages/WholesalePage'));
const EssentialsPage = lazy(() => import('@/storefront/pages/EssentialsPage'));
const FitGuaranteePage = lazy(() => import('@/storefront/pages/FitGuaranteePage'));
const OurStoryPage = lazy(() => import('@/storefront/pages/OurStoryPage'));
const PostSurgeryPage = lazy(() => import('@/storefront/pages/PostSurgeryPage'));
const HourglassPage = lazy(() => import('@/storefront/pages/HourglassPage'));
const BBLKitPage = lazy(() => import('@/storefront/pages/BBLKitPage'));
const ToolsHubPage = lazy(() => import('@/storefront/pages/tools/ToolsHubPage'));
const GuitarRatioQuiz = lazy(() => import('@/storefront/pages/tools/GuitarRatioQuiz'));
const StageComparator = lazy(() => import('@/storefront/pages/tools/StageComparator'));
const RecoveryTimelineCalculator = lazy(() => import('@/storefront/pages/tools/RecoveryTimelineCalculator'));
const BlogTemplate = lazy(() => import('@/storefront/pages/BlogTemplate'));
const BBLChecklist = lazy(() => import('@/storefront/pages/resources/BBLChecklist'));
const GlossaryPage = lazy(() => import('@/storefront/pages/resources/GlossaryPage'));
const VsGenericPage = lazy(() => import('@/storefront/pages/resources/VsGenericPage'));
const RecoveryDiaries = lazy(() => import('@/storefront/pages/social/RecoveryDiaries'));
const CityLandingPage = lazy(() => import('@/storefront/pages/local/CityLandingPage'));
const CurvyBridesLookbook = lazy(() => import('@/storefront/pages/lifestyle/CurvyBridesLookbook'));

// Blog Pages (Default Exports)
const AnatomyFaja = lazy(() => import('@/storefront/pages/blog/AnatomyFaja'));
const FibrosisBible = lazy(() => import('@/storefront/pages/blog/FibrosisBible'));
const SnatchTest = lazy(() => import('@/storefront/pages/blog/SnatchTest'));
const WaistTrainingMyths = lazy(() => import('@/storefront/pages/blog/WaistTrainingMyths'));
const PostpartumVsLipo = lazy(() => import('@/storefront/pages/blog/PostpartumVsLipo'));
const SizingAsymmetric = lazy(() => import('@/storefront/pages/blog/SizingAsymmetric'));
const InflammationTimeline = lazy(() => import('@/storefront/pages/blog/InflammationTimeline'));
const MorningRoutine = lazy(() => import('@/storefront/pages/blog/MorningRoutine'));
const ArmBackLipo = lazy(() => import('@/storefront/pages/blog/ArmBackLipo'));
const FajaTroubleshooting = lazy(() => import('@/storefront/pages/guides/FajaTroubleshooting'));
const LipoFoamManual = lazy(() => import('@/storefront/pages/guides/LipoFoamManual'));

const LangWrapper = ({ children, lang }: { children: React.ReactNode; lang: string }) => {
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }
  return <>{children}</>;
};

// -----------------------------------------------------------------------------
// ROUTES CONFIGURATION (Split by Language to Avoid Alias Loops)
// -----------------------------------------------------------------------------

const commonRoutes = [
  { index: true, element: <HomePage /> },
  { path: 'local/:city', element: <Suspense fallback={<div className="h-screen" />}><CityLandingPage /></Suspense> },
  { path: 'local/:city', element: <Suspense fallback={<div className="h-screen" />}><CityLandingPage /></Suspense> },
  { path: '*', element: <Suspense fallback={<div className="h-screen" />}><NotFoundPage /></Suspense> }
];

// Helper to handle dynamic redirects (e.g. /es/products/:handle -> /es/productos/:handle)
const RedirectWithParams = ({ to }: { to: string }) => {
  const params = useParams();
  return <Navigate to={generatePath(to, params)} replace />;
};

const enRoutes = [
  // Storefront
  { path: 'products/:handle', element: <Suspense fallback={<div className="h-screen" />}><ProductDetailView /></Suspense> },
  { path: 'collections/:handle', element: <Suspense fallback={<div className="h-screen" />}><CollectionPage /></Suspense> },
  { path: 'cart', element: <Suspense fallback={<div className="h-screen" />}><CartPage /></Suspense> },
  { path: 'checkout', element: <Suspense fallback={<div className="h-screen" />}><CheckoutPage /></Suspense> },

  // Legacy Spanish paths in English Context (Redirect to English)
  { path: 'productos/:handle', element: <RedirectWithParams to="/en/products/:handle" /> },
  { path: 'colecciones/:handle', element: <RedirectWithParams to="/en/collections/:handle" /> },

  // Pages
  { path: 'about', element: <Suspense fallback={<div className="h-screen" />}><AboutPage /></Suspense> },
  { path: 'contact', element: <Suspense fallback={<div className="h-screen" />}><ContactPage /></Suspense> },
  { path: 'faq', element: <Suspense fallback={<div className="h-screen" />}><FAQPage /></Suspense> },
  { path: 'shipping', element: <Suspense fallback={<div className="h-screen" />}><ShippingPage /></Suspense> },
  { path: 'returns', element: <Suspense fallback={<div className="h-screen" />}><ReturnsPage /></Suspense> },
  { path: 'privacy', element: <Suspense fallback={<div className="h-screen" />}><PrivacyPage /></Suspense> },
  { path: 'terms', element: <Suspense fallback={<div className="h-screen" />}><TermsPage /></Suspense> },
  { path: 'fit-finder', element: <Suspense fallback={<div className="h-screen" />}><FitFinderPage /></Suspense> },
  { path: 'lab', element: <Suspense fallback={<div className="h-screen" />}><LabPage /></Suspense> },
  { path: 'account', element: <Suspense fallback={<div className="h-screen" />}><UserDashboard /></Suspense> },

  // Landing / Marketing
  { path: 'wholesale', element: <Suspense fallback={<div className="h-screen" />}><WholesalePage /></Suspense> },
  { path: 'essentials', element: <Suspense fallback={<div className="h-screen" />}><EssentialsPage /></Suspense> },
  { path: 'fit-guarantee', element: <Suspense fallback={<div className="h-screen" />}><FitGuaranteePage /></Suspense> },
  { path: 'our-story', element: <Suspense fallback={<div className="h-screen" />}><OurStoryPage /></Suspense> },
  { path: 'post-surgery', element: <Suspense fallback={<div className="h-screen" />}><PostSurgeryPage /></Suspense> },
  { path: 'hourglass-sculpting', element: <Suspense fallback={<div className="h-screen" />}><HourglassPage /></Suspense> },
  { path: 'bbl-survival-kit', element: <Suspense fallback={<div className="h-screen" />}><BBLKitPage /></Suspense> },

  // Sections
  { path: 'academia', element: <Suspense fallback={<div className="h-screen" />}><AcademiaView /></Suspense> },
  { path: 'guitar-curves', element: <Suspense fallback={<div className="h-screen" />}><GuitarCurvesView /></Suspense> },
  { path: 'pain-points', element: <Suspense fallback={<div className="h-screen" />}><PainPointsView /></Suspense> },
  { path: 'solutions', element: <Suspense fallback={<div className="h-screen" />}><SolutionsView /></Suspense> },

  // Tools & Resources
  { path: 'tools', element: <Suspense fallback={<div className="h-screen" />}><ToolsHubPage /></Suspense> },
  { path: 'tools/ratio-quiz', element: <Suspense fallback={<div className="h-screen" />}><GuitarRatioQuiz /></Suspense> },
  { path: 'tools/comparator', element: <Suspense fallback={<div className="h-screen" />}><StageComparator /></Suspense> },
  { path: 'tools/timeline', element: <Suspense fallback={<div className="h-screen" />}><RecoveryTimelineCalculator /></Suspense> },
  { path: 'resources/bbl-checklist', element: <Suspense fallback={<div className="h-screen" />}><BBLChecklist /></Suspense> },
  { path: 'resources/glossary', element: <Suspense fallback={<div className="h-screen" />}><GlossaryPage /></Suspense> },
  { path: 'resources/vs-generic', element: <Suspense fallback={<div className="h-screen" />}><VsGenericPage /></Suspense> },
  { path: 'community/diaries', element: <Suspense fallback={<div className="h-screen" />}><RecoveryDiaries /></Suspense> },
  { path: 'lifestyle/brides', element: <Suspense fallback={<div className="h-screen" />}><CurvyBridesLookbook /></Suspense> },
  { path: 'lifestyle', element: <Suspense fallback={<div className="h-screen" />}><NotFoundPage /></Suspense> }, // Placeholder
  { path: 'medical-hub', element: <Suspense fallback={<div className="h-screen" />}><NotFoundPage /></Suspense> }, // Placeholder

  // Blog
  { path: 'blog/anatomy-faja', element: <Suspense fallback={<div className="h-screen" />}><AnatomyFaja /></Suspense> },
  { path: 'blog/fibrosis-bible', element: <Suspense fallback={<div className="h-screen" />}><FibrosisBible /></Suspense> },
  { path: 'blog/snatch-test', element: <Suspense fallback={<div className="h-screen" />}><SnatchTest /></Suspense> },
  { path: 'blog/waist-training-myths', element: <Suspense fallback={<div className="h-screen" />}><WaistTrainingMyths /></Suspense> },
  { path: 'blog/postpartum-vs-lipo', element: <Suspense fallback={<div className="h-screen" />}><PostpartumVsLipo /></Suspense> },
  { path: 'blog/sizing-asymmetric', element: <Suspense fallback={<div className="h-screen" />}><SizingAsymmetric /></Suspense> },
  { path: 'blog/inflammation-timeline', element: <Suspense fallback={<div className="h-screen" />}><InflammationTimeline /></Suspense> },
  { path: 'blog/morning-routine', element: <Suspense fallback={<div className="h-screen" />}><MorningRoutine /></Suspense> },
  { path: 'blog/arm-back-lipo', element: <Suspense fallback={<div className="h-screen" />}><ArmBackLipo /></Suspense> },
  { path: 'guides/troubleshooting', element: <Suspense fallback={<div className="h-screen" />}><FajaTroubleshooting /></Suspense> },
  { path: 'guides/lipo-foam', element: <Suspense fallback={<div className="h-screen" />}><LipoFoamManual /></Suspense> },
  { path: 'blog/:slug', element: <Suspense fallback={<div className="h-screen" />}><BlogTemplate /></Suspense> },
];

const esRoutes = [
  // Storefront
  { path: 'productos/:handle', element: <Suspense fallback={<div className="h-screen" />}><ProductDetailView /></Suspense> },
  { path: 'colecciones/:handle', element: <Suspense fallback={<div className="h-screen" />}><CollectionPage /></Suspense> },
  { path: 'carrito', element: <Suspense fallback={<div className="h-screen" />}><CartPage /></Suspense> },
  { path: 'pago', element: <Suspense fallback={<div className="h-screen" />}><CheckoutPage /></Suspense> },

  // Legacy English paths in Spanish Context (Redirect to Spanish)
  { path: 'products/:handle', element: <RedirectWithParams to="/es/productos/:handle" /> },
  { path: 'collections/:handle', element: <RedirectWithParams to="/es/colecciones/:handle" /> },
  { path: 'pages/wholesale', element: <Navigate to="/es/mayoristas" replace /> },
  { path: 'pages/bbl-recovery-kit', element: <Navigate to="/es/kit-supervivencia-bbl" replace /> },

  // Pages
  { path: 'nosotros', element: <Suspense fallback={<div className="h-screen" />}><AboutPage /></Suspense> },
  { path: 'contacto', element: <Suspense fallback={<div className="h-screen" />}><ContactPage /></Suspense> },
  { path: 'faq', element: <Suspense fallback={<div className="h-screen" />}><FAQPage /></Suspense> }, // 'faq' is shared or 'preguntas-frecuentes'? checking map... map uses 'faq' implicit or not? map says nothing for 'faq', effectively shared.
  { path: 'envios', element: <Suspense fallback={<div className="h-screen" />}><ShippingPage /></Suspense> },
  { path: 'devoluciones', element: <Suspense fallback={<div className="h-screen" />}><ReturnsPage /></Suspense> },
  { path: 'privacidad', element: <Suspense fallback={<div className="h-screen" />}><PrivacyPage /></Suspense> },
  { path: 'terminos', element: <Suspense fallback={<div className="h-screen" />}><TermsPage /></Suspense> },
  { path: 'calculadora-de-tallas', element: <Suspense fallback={<div className="h-screen" />}><FitFinderPage /></Suspense> },
  { path: 'laboratorio', element: <Suspense fallback={<div className="h-screen" />}><LabPage /></Suspense> },
  { path: 'cuenta', element: <Suspense fallback={<div className="h-screen" />}><UserDashboard /></Suspense> },

  // Landing / Marketing
  { path: 'mayoristas', element: <Suspense fallback={<div className="h-screen" />}><WholesalePage /></Suspense> },
  { path: 'esenciales', element: <Suspense fallback={<div className="h-screen" />}><EssentialsPage /></Suspense> },
  { path: 'garantia-de-ajuste', element: <Suspense fallback={<div className="h-screen" />}><FitGuaranteePage /></Suspense> },
  { path: 'nuestra-historia', element: <Suspense fallback={<div className="h-screen" />}><OurStoryPage /></Suspense> },
  { path: 'post-quirurgico', element: <Suspense fallback={<div className="h-screen" />}><PostSurgeryPage /></Suspense> },
  { path: 'moldeo-reloj-de-arena', element: <Suspense fallback={<div className="h-screen" />}><HourglassPage /></Suspense> },
  { path: 'kit-supervivencia-bbl', element: <Suspense fallback={<div className="h-screen" />}><BBLKitPage /></Suspense> },

  // Sections (Shared paths generally, but let's see if we can localize)
  { path: 'academia', element: <Suspense fallback={<div className="h-screen" />}><AcademiaView /></Suspense> },
  { path: 'guitar-curves', element: <Suspense fallback={<div className="h-screen" />}><GuitarCurvesView /></Suspense> },
  { path: 'pain-points', element: <Suspense fallback={<div className="h-screen" />}><PainPointsView /></Suspense> },
  { path: 'solutions', element: <Suspense fallback={<div className="h-screen" />}><SolutionsView /></Suspense> },
  { path: 'lifestyle', element: <Suspense fallback={<div className="h-screen" />}><NotFoundPage /></Suspense> },
  { path: 'medical-hub', element: <Suspense fallback={<div className="h-screen" />}><NotFoundPage /></Suspense> },

  // Tools & Resources
  { path: 'herramientas', element: <Suspense fallback={<div className="h-screen" />}><ToolsHubPage /></Suspense> },
  { path: 'herramientas/test-ratio', element: <Suspense fallback={<div className="h-screen" />}><GuitarRatioQuiz /></Suspense> },
  { path: 'herramientas/comparador', element: <Suspense fallback={<div className="h-screen" />}><StageComparator /></Suspense> },
  { path: 'herramientas/cronograma', element: <Suspense fallback={<div className="h-screen" />}><RecoveryTimelineCalculator /></Suspense> },
  { path: 'recursos/lista-bbl', element: <Suspense fallback={<div className="h-screen" />}><BBLChecklist /></Suspense> },
  { path: 'recursos/glosario', element: <Suspense fallback={<div className="h-screen" />}><GlossaryPage /></Suspense> },
  { path: 'recursos/vs-genericas', element: <Suspense fallback={<div className="h-screen" />}><VsGenericPage /></Suspense> },
  { path: 'comunidad/diarios', element: <Suspense fallback={<div className="h-screen" />}><RecoveryDiaries /></Suspense> },
  { path: 'estilo/novias', element: <Suspense fallback={<div className="h-screen" />}><CurvyBridesLookbook /></Suspense> },

  // Blog
  { path: 'blog/anatomia-faja', element: <Suspense fallback={<div className="h-screen" />}><AnatomyFaja /></Suspense> },
  { path: 'blog/biblia-fibrosis', element: <Suspense fallback={<div className="h-screen" />}><FibrosisBible /></Suspense> },
  { path: 'blog/prueba-ajuste', element: <Suspense fallback={<div className="h-screen" />}><SnatchTest /></Suspense> },
  { path: 'blog/mitos-cinturillas', element: <Suspense fallback={<div className="h-screen" />}><WaistTrainingMyths /></Suspense> },
  { path: 'blog/postparto-vs-lipo', element: <Suspense fallback={<div className="h-screen" />}><PostpartumVsLipo /></Suspense> },
  { path: 'blog/tallas-asimetricas', element: <Suspense fallback={<div className="h-screen" />}><SizingAsymmetric /></Suspense> },
  { path: 'blog/cronograma-inflamacion', element: <Suspense fallback={<div className="h-screen" />}><InflammationTimeline /></Suspense> },
  { path: 'blog/rutina-manana', element: <Suspense fallback={<div className="h-screen" />}><MorningRoutine /></Suspense> },
  { path: 'blog/lipo-brazos-espalda', element: <Suspense fallback={<div className="h-screen" />}><ArmBackLipo /></Suspense> },
  { path: 'guias/solucion-problemas', element: <Suspense fallback={<div className="h-screen" />}><FajaTroubleshooting /></Suspense> },
  { path: 'guias/uso-espuma', element: <Suspense fallback={<div className="h-screen" />}><LipoFoamManual /></Suspense> },
  { path: 'blog/:slug', element: <Suspense fallback={<div className="h-screen" />}><BlogTemplate /></Suspense> },
];

export const router = createBrowserRouter([
  {
    path: '/en',
    element: <LangWrapper lang="en"><StorefrontLayout /></LangWrapper>,
    children: [...commonRoutes, ...enRoutes]
  },
  {
    path: '/es',
    element: <LangWrapper lang="es"><StorefrontLayout /></LangWrapper>,
    children: [...commonRoutes, ...esRoutes]
  },
  {
    path: '/',
    element: <Navigate to="/es" replace />
  },
  // ESTA ES LA CLAVE: Captura cualquier ruta perdida y evita el CRASH
  {
    path: '*',
    element: <Navigate to="/es" replace />
  }
]);
