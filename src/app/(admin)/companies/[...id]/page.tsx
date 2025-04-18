import { notFound } from 'next/navigation';
import Header from '@/app/components/header';

export interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const id = Number.parseInt(params.id);
  if (Number.isNaN(id)) {
    notFound();
  }

  return (
    <>
      <Header>Companies ({id})</Header>
    </>
  );
}
