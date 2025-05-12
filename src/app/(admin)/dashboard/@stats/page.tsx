'use client';

import React from 'react';
import StatCard, { StatCardType } from '@/app/components/stat-card';
import { useSummaryStats } from '@/lib/hooks';

// export interface PageProps {}

const labelByStat = {
  promotions: 'Total promotions',
  categories: 'Total categories',
  newCompanies: 'New companies',
  activeCompanies: 'Total active companies',
} as const;

export default function Page() {
  const { data, isLoading, error } = useSummaryStats();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading stats</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-5">
      {(Object.keys(labelByStat) as (keyof typeof labelByStat)[]).map(
        (key) => (
          <div key={key} className="col-span-3">
            <StatCard
              type={StatCardType.Gradient}
              label={labelByStat[key]}
              counter={data?.[key] ?? 0}
            />
          </div>
        ),
      )}
    </div>
  );
}
