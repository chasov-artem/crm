import React from 'react';

import Header from '@/app/components/header';

export interface PageProps {
  params: Promise<{ id: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <>
      <Header>Companies ({String(resolvedParams.id)})</Header>
      <p>{new Date().toTimeString()}</p>
    </>
  );
}
