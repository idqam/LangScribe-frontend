import React from "react";
import { useTranslations } from 'next-intl';
import { SignInButton } from "@/components/general/SignInButton";

const DesignSystem = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            LangScribe Design System
          </h1>
          <p className="text-slate-600">Modern, educational, and accessible</p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-indigo-600 rounded-lg shadow-md"></div>
              <p className="text-sm font-medium">Primary: Indigo-600</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-emerald-500 rounded-lg shadow-md"></div>
              <p className="text-sm font-medium">Success: Emerald-500</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-amber-500 rounded-lg shadow-md"></div>
              <p className="text-sm font-medium">Accent: Amber-500</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-slate-900 rounded-lg shadow-md"></div>
              <p className="text-sm font-medium">Text: Slate-900</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Typography
          </h2>
          <div className="space-y-3 bg-white p-6 rounded-xl shadow-sm">
            <h1 className="text-4xl font-bold text-slate-900">
              Heading 1 - Bold 4xl
            </h1>
            <h2 className="text-3xl font-bold text-slate-900">
              Heading 2 - Bold 3xl
            </h2>
            <h3 className="text-2xl font-semibold text-slate-900">
              Heading 3 - Semibold 2xl
            </h3>
            <p className="text-base text-slate-600">
              Body text - Regular base slate-600
            </p>
            <p className="text-sm text-slate-500">
              Small text - Regular sm slate-500
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const Navigation = () => {
  const t = useTranslations('Navigation');
  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-slate-900">LangScribe</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('features')}
            </a>
            <a
              href="#pricing"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('pricing')}
            </a>
            <a
              href="#teachers"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('teachers')}
            </a>
            <a
              href="#about"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t('about')}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <SignInButton />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              {t('registerHero')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const t = useTranslations('Hero');
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            <span>{t('badge')}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-normal">
            {t('title')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 p-2">
              {" "}
              {t('titleHighlight')}
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              {t('ctaStart')}
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold text-lg border-2 border-slate-200">
              {t('ctaDemo')}
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{t('noCreditCard')}</span>
            </div>
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-5xl mx-auto">
            <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
            </div>
            <div className="p-8 bg-gradient-to-br from-slate-50 to-indigo-50">
              <div className="bg-white rounded-lg p-6 shadow-sm mb-4 border border-indigo-100">
                <div className="text-sm text-indigo-600 font-medium mb-2">
                  {t('todaysPrompt')}
                </div>
                <div className="text-lg text-slate-900">
                  {t('promptExample')}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm min-h-48 text-slate-400">
                {t('inputPlaceholder')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const t = useTranslations('Features');
  const features = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      title: t('items.prompts.title'),
      description: t('items.prompts.description'),
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: t('items.feedback.title'),
      description: t('items.feedback.description'),
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: t('items.srs.title'),
      description: t('items.srs.description'),
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: t('items.analytics.title'),
      description: t('items.analytics.description'),
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: t('items.dashboard.title'),
      description: t('items.dashboard.description'),
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      ),
      title: t('items.multiLanguage.title'),
      description: t('items.multiLanguage.description'),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-600">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all bg-white"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// const StatsSection = () => {
//   return (
//     <section className="py-20 bg-gradient-to-br from-indigo-600 to-indigo-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid md:grid-cols-4 gap-8 text-center">
//           <div className="space-y-2">
//             <div className="text-4xl font-bold text-white">10K+</div>
//             <div className="text-indigo-200">Active Learners</div>
//           </div>
//           <div className="space-y-2">
//             <div className="text-4xl font-bold text-white">2M+</div>
//             <div className="text-indigo-200">Entries Written</div>
//           </div>
//           <div className="space-y-2">
//             <div className="text-4xl font-bold text-white">15+</div>
//             <div className="text-indigo-200">Languages</div>
//           </div>
//           <div className="space-y-2">
//             <div className="text-4xl font-bold text-white">94%</div>
//             <div className="text-indigo-200">Satisfaction Rate</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-white">LangScribe</span>
            </div>
            <p className="text-sm text-slate-400">
              {t('description')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('product')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('links.features')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('links.pricing')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('links.teachers')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('links.api')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('company')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('links.about')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('links.blog')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('links.careers')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('links.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('links.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('links.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('links.security')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-sm text-slate-400 text-center">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      {/* <StatsSection /> */}
      <Footer />
    </div>
  );
};

export default Home;
