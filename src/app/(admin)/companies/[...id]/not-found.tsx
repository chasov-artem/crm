import Link from 'next/link';
import React from 'react';

// export interface NotFoundProps {}

export default function NotFound() {
  return (
    <div>
      <p>Could not found the company</p>
      <Link href="/companies" className="text-blue-500">
        Back to companies
      </Link>
    </div>
  );
}
