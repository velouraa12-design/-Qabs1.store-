import React from 'react';
import { useApp } from '../context/AppContext.tsx';

export const Footer: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  return (
    <footer className="w-full bg-white dark:bg-[#020D14] border-t-2 border-[#00A896]/30 text-slate-600 dark:text-slate-400 text-xs py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            {isAr
              ? 'الرسوم الحكومية ورسوم الجهات الخارجية منفصلة. قبول Stripe و PayPal يخضع للأهلية وموافقة المزود.'
              : 'Government statutory and third-party fees separate. Stripe & PayPal approvals are subject to provider compliance.'}
          </p>
          <div className="flex items-center gap-4 font-semibold text-[#004457] dark:text-slate-400">
            <span>© 2026 QABS | قبس — متاجر إلكترونية | خدمات رقمية.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
