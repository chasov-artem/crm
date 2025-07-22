import React, { use } from 'react';
import { getCompany } from '@/lib/api';
import Header from '@/app/components/header';

export interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  const company = use(getCompany(id, { cache: 'no-store' }));
  return <Header>{company?.title}</Header>;
}
