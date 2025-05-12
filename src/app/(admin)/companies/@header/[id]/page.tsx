'use client';

import React, { use } from 'react';
import { Company, getCompany } from '@/lib/api';
import getQueryClient from '@/lib/utils/getQueryClient';
import Header from '@/app/components/header';

export interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  const queryClient = getQueryClient();

  React.useEffect(() => {
    async function fetchData() {
      await queryClient.prefetchQuery({
        queryKey: ['company', id],
        queryFn: () => getCompany(id, { cache: 'no-store' }),
        staleTime: 10 * 1000,
      });
    }

    fetchData();
  }, [id, queryClient]);

  const company = queryClient.getQueryData([
    'company',
    id,
  ]) as Company;

  return <Header>{company?.title}</Header>;
}
