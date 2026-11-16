/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { CustomizerProvider } from './context/CustomizerContext.tsx';
import { Header } from './components/Header.tsx';
import { LandingView } from './components/LandingView.tsx';
import { PortalView } from './components/PortalView.tsx';
import { StoreBuilderView } from './components/StoreBuilderView.tsx';
import { BillingSubscriptionView } from './components/BillingSubscriptionView.tsx';
import { AdminView } from './components/AdminView.tsx';
import { TemplateHubView } from './components/TemplateHubView.tsx';
import { FormationWizardModal } from './components/FormationWizardModal.tsx';
import { NewStoreModal } from './components/NewStoreModal.tsx';
import { AIChatModal } from './components/AIChatModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { ContentEditorModal } from './components/ContentEditorModal.tsx';
import { Footer } from './components/Footer.tsx';
import { CheckCircle } from 'lucide-react';

const WORKSPACE_ROUTE_PREFIXES = [
  '/overview',
  '/orders',
  '/documents',
  '/stores',
  '/billing',
  '/qabs-ai',
  '/crypto',
  '/support',
  '/settings',
  '/company-formation',
  '/workspace',
  '/requests',
  '/formation',
  '/products',
  '/inventory',
  '/customers',
  '/discounts',
  '/payments',
  '/shipping',
  '/domains',
  '/apps',
  '/analytics',
  '/create-store',
  '/design',
  '/pages',
  '/cards',
  '/bank-accounts'
];

const isWorkspaceLocation = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hash = window.location.hash || '';
  const path = window.location.pathname || '';
  return WORKSPACE_ROUTE_PREFIXES.some(prefix => hash.startsWith(`#${prefix}`) || path.startsWith(prefix));
};

const MainLayout: React.FC = () => {
  const {
    mode,
    setMode,
    toastMessage,
    isAuthenticated,
    isOwner,
    openClientAuth,
    openOwnerAuth
  } = useApp();

  const [formationModalOpen, setFormationModalOpen] = useState(false);
  const [selectedStateCode, setSelectedStateCode] = useState<string>('WY');
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // Browse First, Auth on Action: guard workspace hashes & mode access
  useEffect(() => {
    const syncWorkspaceRoute = () => {
      if (isWorkspaceLocation()) {
        if (isAuthenticated) {
          setMode('portal');
        } else {
          setMode('landing');
          openClientAuth('login');
        }
      }
    };

    syncWorkspaceRoute();
    window.addEventListener('hashchange', syncWorkspaceRoute);
    window.addEventListener('popstate', syncWorkspaceRoute);
    return () => {
      window.removeEventListener('hashchange', syncWorkspaceRoute);
      window.removeEventListener('popstate', syncWorkspaceRoute);
    };
  }, [isAuthenticated, setMode, openClientAuth]);

  useEffect(() => {
    if (!isAuthenticated && mode !== 'landing') {
      setMode('landing');
      return;
    }
    if ((mode === 'admin' || mode === 'template_hub') && !isOwner) {
      setMode(isAuthenticated ? 'portal' : 'landing');
      openOwnerAuth();
    }
  }, [mode, isAuthenticated, isOwner, setMode, openOwnerAuth]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (mode === 'portal' && isAuthenticated) {
      if (!isWorkspaceLocation()) {
        window.history.replaceState({ qabsWorkspace: 'overview' }, '', '#/overview');
      }
    } else if (isWorkspaceLocation() && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [mode, isAuthenticated]);

  const handleOpenFormationWithState = (stateCode?: string) => {
    if (stateCode) {
      setSelectedStateCode(stateCode);
    }
    setFormationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] dark:bg-[#03131D] text-[#14243E] dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-[#D5B46B]/30 selection:text-[#14243E] dark:selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white dark:bg-[#082030] border-2 border-[#D5B46B] text-[#14243E] dark:text-white text-xs font-bold shadow-2xl animate-fade-in">
          <CheckCircle className="w-4 h-4 text-[#92743A] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenFormationModal={() => handleOpenFormationWithState()}
        onOpenStoreModal={() => setStoreModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {(mode === 'landing' || !isAuthenticated) && (
          <LandingView
            onOpenFormationModal={handleOpenFormationWithState}
            onOpenStoreModal={() => setStoreModalOpen(true)}
            onOpenAIModal={() => setAiModalOpen(true)}
          />
        )}

        {isAuthenticated && mode === 'portal' && (
          <PortalView
            onOpenFormationModal={() => handleOpenFormationWithState()}
            onOpenStoreModal={() => setStoreModalOpen(true)}
          />
        )}

        {isAuthenticated && mode === 'store_builder' && (
          <StoreBuilderView
            onOpenStoreModal={() => setStoreModalOpen(true)}
          />
        )}

        {isAuthenticated && mode === 'billing' && (
          <BillingSubscriptionView />
        )}

        {isOwner && mode === 'admin' && (
          <AdminView />
        )}

        {isOwner && mode === 'template_hub' && (
          <TemplateHubView />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <FormationWizardModal
        isOpen={formationModalOpen}
        onClose={() => setFormationModalOpen(false)}
        initialStateCode={selectedStateCode}
      />

      <NewStoreModal
        isOpen={storeModalOpen}
        onClose={() => setStoreModalOpen(false)}
      />

      <AIChatModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />

      <AuthModal />

      <CheckoutModal />

      <ContentEditorModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <CustomizerProvider>
        <MainLayout />
      </CustomizerProvider>
    </AppProvider>
  );
}
