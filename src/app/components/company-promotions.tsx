'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPromotions } from '@/lib/api';
import Promotion from '@/app/components/promotion';
import AddPromotionButton from '@/app/components/add-promotion-button';

export interface CompanyPromotionsProps {
  companyId: string;
  onAdd?: () => void;
}

export default function CompanyPromotions({
  companyId,
  onAdd,
}: CompanyPromotionsProps) {
  const { data } = useQuery({
    queryKey: ['promotions', companyId],
    queryFn: () => getPromotions({ companyId }),
    staleTime: 10 * 1000,
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <AddPromotionButton companyId={companyId} onClick={onAdd} />
      </div>
      <div className="grid grid-cols-12 gap-5">
        {data?.map((promotion) => (
          <div key={promotion.id} className="col-span-4">
            <Promotion promotion={promotion} />
          </div>
        ))}
      </div>
    </div>
  );
}
