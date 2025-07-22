'use client';

import React, { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getCompany, getPromotions } from '@/lib/api';
import getQueryClient from '@/lib/utils/getQueryClient';
import CompanyInfo from '@/app/components/company-info';
import CompanyPromotions from '@/app/components/company-promotions';
import PromotionFormModal from '@/app/components/promotion-form-modal';

export interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  const queryClient = getQueryClient();
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const company = await getCompany(id, {
          cache: 'no-store',
        });
        const promotions = await getPromotions(
          { companyId: id },
          { cache: 'no-store' },
        );
        queryClient.setQueryData(['company', id], company);
        queryClient.setQueryData(
          ['promotions', { companyId: id }],
          promotions,
        );
      } catch (error) {
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
          <CompanyPromotions
            companyId={id}
            onAdd={() => setShowModal(true)}
          />
        </div>
        {/* Модалка з формою */}
        {showModal && (
          <PromotionFormModal
            companyId={id}
            show={showModal}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </HydrationBoundary>
  );
}
