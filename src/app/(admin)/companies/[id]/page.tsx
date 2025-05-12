'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getCompany, getPromotions, getCompanies } from '@/lib/api';
import getQueryClient from '@/lib/utils/getQueryClient';
import CompanyInfo from '@/app/components/company-info';
import CompanyPromotions from '@/app/components/company-promotions';

export interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  console.log('Page received company ID:', id);
  const queryClient = getQueryClient();

  React.useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching initial data for company:', id);

        // Отримуємо дані компанії
        const company = await getCompany(id, {
          cache: 'no-store',
        });
        console.log('Received company data:', company);

        // Отримуємо акції компанії
        const promotions = await getPromotions(
          { companyId: id },
          { cache: 'no-store' },
        );
        console.log('Received promotions data:', promotions);

        // Встановлюємо дані в кеш
        queryClient.setQueryData(['company', id], company);
        queryClient.setQueryData(
          ['promotions', { companyId: id }],
          promotions,
        );
        console.log('Data cached successfully');
      } catch (error) {
        console.error('Error fetching initial data:', error);
        if (
          error instanceof Error &&
          error.message === 'Resource not found'
        ) {
          notFound();
        }
        throw error;
      }
    }

    fetchData();
  }, [id, queryClient]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="py-6 px-10 grid grid-cols-12 gap-5">
        <div className="col-span-3">
          <CompanyInfo companyId={id} />
        </div>
        <div className="col-span-9">
          <CompanyPromotions companyId={id} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
