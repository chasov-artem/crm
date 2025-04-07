'use client';

import React from 'react';

export interface ClientComponentProps {
  children?: React.ReactNode;
}

export default function ClientComponentProps({
  children,
}: ClientComponentProps) {
  console.log('Client Component');
  return (
    <div>
      <span>Client Component</span>
      {children}
    </div>
  );
}
