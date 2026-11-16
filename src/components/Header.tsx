import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { useCustomizer } from '../context/CustomizerContext.tsx';
import { QabsLogo } from './QabsLogo.tsx';
import {
  Globe,
  Sun,
  Moon,
  Shield,
  Layers,
  Store,
  FileCode2,
  ChevronDown,
  CreditCard,
  Edit3,
  User,
  CheckCircle2,
  FlaskConical,
  LogOut,
  Crown
} from 'lucide-react';

interface HeaderProps {
  onOpenFormationModal: () => void;
  onOpenStoreModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenFormationModal, onOpenStoreModal }) => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    mode,
    setMode,
    user,
    isAuthenticated,
    isOwner,
    openClientAuth,
    openOwnerAuth,
    logout,
    isProductionMode,
    toggleProductionMode
  } = useApp();
  const { setEditorOpen } = useCustomizer();
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const isAr = language === 'ar';

  const handleGuardedMode = (targetMode: 'portal' | 'store_builder' | 'billing') => {
    if (!isAuthenticated) {
      openClientAuth('login');
      return;
    }
    setMode(targetMode);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#002B38]/95 backdrop-blur-md border-b-2 border-[#00A896]/30 text-[#14243E] dark:text-slate-100 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        {/* Zone 1: Official QABS Brand Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMode('landing')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            title="QABS | قبس — متاجر إلكترونية | خدمات رقمية"
          >
            <QabsLogo size="md" className="group-hover:scale-[1.02] transition-transform" />
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('landing')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors cursor-pointer ${
              mode === 'landing'
                ? 'border-[#D5B46B] text-[#14243E] dark:text-[#D5B46B]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#14243E] dark:hover:text-white'
            }`}
          >
            {isAr ? 'واجهة العرض الرئيسية' : 'Public Showcase'}
          </button>

          <button
            type="button"
            onClick={() => handleGuardedMode('portal')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              mode === 'portal'
                ? 'border-[#D5B46B] text-[#14243E] dark:text-[#D5B46B]'
                : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#14243E] dark:hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-[#92743A]" />
            <span>{isAr ? 'مساحة العمل والعملاء' : 'Client Workspace'}</span>
          </button>

          {isAuthenticated && (
            <>
              <button
                type="button"
                onClick={() => handleGuardedMode('store_builder')}
                className={`whitespace-nowrap pb-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  mode === 'store_builder'
                    ? 'border-[#D5B46B] text-[#14243E] dark:text-[#D5B46B]'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#14243E] dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#92743A]" />
                <span>{isAr ? 'منشئ المتاجر Studio' : 'Store Builder'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleGuardedMode('billing')}
                className={`whitespace-nowrap pb-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  mode === 'billing'
                    ? 'border-[#D5B46B] text-[#14243E] dark:text-[#D5B46B]'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#14243E] dark:hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-[#92743A]" />
                <span>{isAr ? 'الاشتراكات والفوترة' : 'Billing & Plans'}</span>
              </button>
            </>
          )}

          {isOwner && (
            <>
              <button
                type="button"
                onClick={() => setMode('admin')}
                className={`whitespace-nowrap pb-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  mode === 'admin'
                    ? 'border-[#14243E] dark:border-[#D5B46B] text-[#14243E] dark:text-[#D5B46B]'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#14243E] dark:hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-[#92743A]" />
                <span>{isAr ? 'لوحة إدارة المالك' : 'Owner Admin'}</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('template_hub')}
                className={`whitespace-nowrap pb-1 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  mode === 'template_hub'
                    ? 'border-[#D5B46B] text-[#14243E] dark:text-[#D5B46B]'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-[#14243E] dark:hover:text-white'
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5 text-[#92743A]" />
                <span>{isAr ? 'قالب GitHub' : 'GitHub Template'}</span>
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Auth Buttons (Client & Sole Owner), Lang, Theme, Owner Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Owner-only Production Toggle & Customizer */}
          {isOwner && (
            <>
              <button
                type="button"
                onClick={toggleProductionMode}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                  isProductionMode
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                }`}
                title={isAr ? 'تبديل وضع الاختبار والإنتاج' : 'Toggle Test / Production'}
              >
                {isProductionMode ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <FlaskConical className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                )}
                <span>
                  {isProductionMode ? (isAr ? 'الإنتاج مفعّل' : 'Live') : isAr ? 'تجريبي' : 'Preview'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setEditorOpen(true)}
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-[#14243E] dark:text-[#D5B46B] bg-[#F8F7F2] dark:bg-slate-800 hover:bg-[#EAE6DC] rounded-lg border border-[#D5B46B]/50 transition-colors cursor-pointer"
                title={isAr ? 'تخصيص محتوى الواجهة' : 'Customize Site Content'}
              >
                <Edit3 className="w-3.5 h-3.5 text-[#92743A]" />
                <span>{isAr ? 'تخصيص' : 'Customize'}</span>
              </button>
            </>
          )}

          {/* Client Sign In / Account Button */}
          {!isAuthenticated ? (
            <button
              type="button"
              onClick={() => openClientAuth('login')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-black text-[#14243E] dark:text-white bg-[#F8F7F2] dark:bg-slate-800 hover:bg-[#EAE6DC] dark:hover:bg-slate-700 rounded-xl border border-[#D5B46B] transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#92743A] shrink-0" />
              <span className="whitespace-nowrap">{isAr ? 'تسجيل الدخول / حسابي' : 'Sign In / My Account'}</span>
            </button>
          ) : !isOwner ? (
            <button
              type="button"
              onClick={() => setMode('portal')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-black text-[#14243E] dark:text-white bg-[#F8F7F2] dark:bg-slate-800 hover:bg-[#EAE6DC] rounded-xl border border-[#D5B46B] transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#92743A] shrink-0" />
              <span className="max-w-[110px] truncate">{isAr ? `حسابي: ${user.name}` : user.name}</span>
            </button>
          ) : null}

          {/* Dedicated Owner Admin Button */}
          {!isOwner ? (
            <button
              type="button"
              onClick={openOwnerAuth}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-black text-white bg-[#14243E] hover:bg-[#1d3559] rounded-xl border border-[#D5B46B]/60 shadow-sm transition-colors cursor-pointer"
              title={isAr ? 'دخول خاص بالمالك الوحيد: أنور الغزالي' : 'Sole Owner Admin Portal'}
            >
              <Crown className="w-3.5 h-3.5 text-[#D5B46B] shrink-0" />
              <span className="whitespace-nowrap hidden sm:inline">
                {isAr ? 'دخول لوحة الإدارة (المالك)' : 'Owner Admin'}
              </span>
              <span className="sm:hidden">{isAr ? 'المالك' : 'Owner'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMode('admin')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-black text-[#14243E] bg-gradient-to-r from-[#D5B46B] to-[#F3E5AB] hover:opacity-95 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-[#14243E] shrink-0" />
              <span className="whitespace-nowrap">
                {isAr ? `لوحة المالك: ${user.name}` : `Owner: ${user.name}`}
              </span>
            </button>
          )}

          {/* Logout button when authenticated */}
          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1 px-2.5 py-2 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 rounded-xl border border-rose-200 dark:border-rose-900 transition-colors cursor-pointer"
              title={isAr ? 'تسجيل الخروج' : 'Sign Out'}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isAr ? 'خروج' : 'Logout'}</span>
            </button>
          )}

          {/* Language Switch */}
          <button
            type="button"
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1 px-2.5 py-2 text-xs font-bold text-[#14243E] dark:text-slate-200 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700/60 transition-colors cursor-pointer"
            title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#92743A]" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-[#14243E] dark:text-slate-200 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700/60 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'الوضع النهاري الفاتح' : 'الوضع الليلي الداكن'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#D5B46B]" /> : <Moon className="w-4 h-4 text-[#14243E]" />}
          </button>

          {/* Quick Actions (only when authenticated) */}
          {isAuthenticated && (
            <div className="hidden sm:block relative">
              <button
                type="button"
                onClick={() => setActionMenuOpen(!actionMenuOpen)}
                className="px-3 py-2 text-xs font-bold text-white bg-[#14243E] hover:bg-[#1c3357] rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1"
              >
                <span>{isAr ? '+ جديد' : '+ New'}</span>
                <ChevronDown className="w-3 h-3 text-[#D5B46B]" />
              </button>

              {actionMenuOpen && (
                <div
                  className={`absolute ${
                    isAr ? 'left-0' : 'right-0'
                  } mt-2 w-56 bg-white dark:bg-[#082030] border border-[#EAE6DC] dark:border-cyan-950 rounded-xl shadow-2xl py-1.5 z-50 text-xs`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActionMenuOpen(false);
                      onOpenFormationModal();
                    }}
                    className="w-full text-start px-3 py-2.5 text-[#14243E] dark:text-slate-200 hover:bg-[#F8F7F2] dark:hover:bg-cyan-900/40 flex items-center gap-2 font-semibold cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-[#92743A]" />
                    <span>{isAr ? 'طلب تأسيس شركة جديدة' : 'Form US / UK Company'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActionMenuOpen(false);
                      onOpenStoreModal();
                    }}
                    className="w-full text-start px-3 py-2.5 text-[#14243E] dark:text-slate-200 hover:bg-[#F8F7F2] dark:hover:bg-cyan-900/40 flex items-center gap-2 font-semibold cursor-pointer"
                  >
                    <Store className="w-4 h-4 text-[#92743A]" />
                    <span>{isAr ? 'إنشاء متجر إلكتروني جديد' : 'Launch New Store'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
