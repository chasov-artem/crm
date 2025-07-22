'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/button';

export interface AddPromotionButtonProps {
  companyId: string;
  onClick?: () => void;
}

export default function AddPromotionButton({
  companyId,
  onClick,
}: AddPromotionButtonProps) {
  const router = useRouter();
  return (
    <Button
      onClick={
        onClick
          ? onClick
          : () => router.push(`/companies/${companyId}/new-promotion`)
      }
    >
      Add promotions
    </Button>
  );
}
