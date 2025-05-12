'use client';

import React from 'react';
import Image from 'next/image';
import { Promotion as PromotionType } from '@/lib/api';

interface PromotionProps {
  promotion: PromotionType;
}

export default function Promotion({ promotion }: PromotionProps) {
  return (
    <div className="flex flex-col gap-5 p-7 bg-gray-100 rounded">
      <div className="relative w-full h-40 rounded bg-gray-200 overflow-hidden">
        {promotion.avatar && (
          <Image
            src={promotion.avatar}
            alt={promotion.title}
            width={400}
            height={160}
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{promotion.title}</h3>
        <p className="text-gray-600">{promotion.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-blue-600">
            {promotion.discount}%
          </span>
          <span className="text-sm text-gray-500">discount</span>
        </div>
      </div>
    </div>
  );
}
