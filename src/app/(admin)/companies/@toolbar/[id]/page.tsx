import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { getCompany } from '@/lib/api';
import CompanyInfo from '@/app/components/company-info';
import CompanyPromotions from '@/app/components/company-promotions';

export interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  const company = use(getCompany(id, { cache: 'no-store' }));
  if (!company) {
    notFound();
  }
  return (
    <div className="py-6 px-10 grid grid-cols-12 gap-5">
      <div className="col-span-3">
        <CompanyInfo companyId={id} />
      </div>
      <div className="col-span-9">
        <CompanyPromotions companyId={id} />
      </div>
    </div>
  );
}
