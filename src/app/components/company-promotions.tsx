'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPromotions, Promotion } from '@/lib/api';

export interface CompanyPromotionsProps {
  companyId: string;
}

export default function CompanyPromotions({
  companyId,
}: CompanyPromotionsProps) {
  console.log('CompanyPromotions received companyId:', companyId);

  // Отримуємо всі промоакції і фільтруємо їх на клієнті
  const { data, isLoading, error } = useQuery<Promotion[]>({
    queryKey: ['promotions'],
    queryFn: () => getPromotions(),
    staleTime: 30 * 1000,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Фільтруємо промоакції для конкретної компанії
  const companyPromotions = React.useMemo(() => {
    if (!data) return [];
    return data.filter(
      (promotion) => promotion.companyId === companyId,
    );
  }, [data, companyId]);

  if (isLoading) return <div>Loading promotions...</div>;
  if (error) {
    console.error('Error loading promotions:', error);
    return (
      <div>
        Error loading promotions:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
  if (!companyPromotions.length)
    return <div>No promotions found for this company</div>;

  return (
    <div className="grid grid-cols-12 gap-5">
      {companyPromotions.map((promotion) => (
        <div key={promotion.id} className="col-span-4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">
              {promotion.title}
            </h3>
            <p className="text-gray-600">{promotion.description}</p>
            <p className="text-green-600 font-semibold">
              Discount: {promotion.discount}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
