'use client';

import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getCompany } from '@/lib/api';
import StatusLabel from '@/app/components/status-label';

export interface CompanyInfoProps {
  companyId: string;
}

export default function CompanyInfo({ companyId }: CompanyInfoProps) {
  console.log('CompanyInfo received companyId:', companyId);

  const {
    data: company,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => {
      console.log('Fetching company with ID:', companyId);
      return getCompany(companyId);
    },
    staleTime: 10 * 1000,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log('Company data:', company);
  console.log('Loading state:', isLoading);
  console.log('Error state:', error);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error loading company:', error);
    return (
      <div className="text-red-500">
        Error loading company info:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
  if (!company) return <div>Company not found</div>;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center p-7 gap-5 bg-gray-900 rounded">
        <div className="relative w-20 h-20 rounded-full bg-blue-500 overflow-hidden">
          {company.avatar && (
            <Image
              src={company.avatar}
              alt="company avatar"
              sizes="80px"
              style={{ objectFit: 'cover' }}
              width={80}
              height={80}
            />
          )}
        </div>
        <p className="pb text-base font-semibold text-white">
          {company.title}
        </p>
        <StatusLabel status={company.status} />
      </div>
      <div className="p-7 text-base text-gray-900 bg-gray-100 rounded">
        <p className="pb-5 text-xl font-semibold">About company</p>
        <p className="pb-3">{`Category: ${company.categoryTitle}`}</p>
        <p className="pb-3">{`Country: ${company.countryTitle}`}</p>
        <p className="pb-3">{`Joined date: ${new Date(
          company.joinedDate,
        ).toLocaleDateString('uk')}`}</p>
        <div className="w-full h-px my-8 bg-gray-300" />
        <p>{company.description}</p>
      </div>
    </div>
  );
}
