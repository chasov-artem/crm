export interface SummaryStats {
  promotions: number;
  categories: number;
  newCompanies: number;
  activeCompanies: number;
}

export interface SummarySales {
  id: string;
  companyId: string;
  companyTitle: string;
  sold: number;
  income: number;
}

export interface Country {
  id: string;
  title: string;
}

export interface Category {
  id: string;
  title: string;
}

export enum CompanyStatus {
  Active = 'active',
  NotActive = 'notActive',
  Pending = 'pending',
  Suspended = 'suspended',
}

export interface Company {
  id: string;
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  hasPromotions: boolean;
  categoryId: string;
  categoryTitle: string;
  countryId: string;
  countryTitle: string;
  avatar?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  companyId: string;
  companyTitle: string;
  avatar?: string;
}

const buildUrl = (...paths: string[]) => {
  const url = `/api/${paths.join('/')}`;
  console.log('Building URL:', url);
  return url;
};

const stringifyQueryParams = (params: Record<string, string>) => {
  const queryString = new URLSearchParams(params).toString();
  console.log('Query params:', params);
  return queryString;
};

export const getApiUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return `http://localhost:3000${path}`;
  }
  return path;
};

const sendRequest = async <T>(url: string, init?: RequestInit) => {
  const apiUrl = getApiUrl(url);
  console.log('Sending request to:', apiUrl);
  const res = await fetch(apiUrl, init);
  console.log('Response status:', res.status);

  if (res.status === 404) {
    throw new Error('Resource not found');
  }
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error response:', errorText);
    throw new Error(errorText);
  }

  const data = await res.json();
  console.log('Response data:', data);
  return data as T;
};

export const getSummaryStats = (init?: RequestInit) => {
  return sendRequest<SummaryStats>(
    buildUrl('summary-stats', '1'),
    init,
  );
};

export const getSummarySales = (init?: RequestInit) => {
  return sendRequest<SummarySales[]>(buildUrl('summary-sales'), init);
};

export const getCountries = (init?: RequestInit) => {
  return sendRequest<Country[]>(buildUrl('countries'), init);
};

export const getCategories = (init?: RequestInit) => {
  return sendRequest<Category[]>(buildUrl('categories'), init);
};

export const getCompanies = (init?: RequestInit) => {
  return sendRequest<Company[]>(buildUrl('companies'), init);
};

export const getCompany = async (id: string, init?: RequestInit) => {
  try {
    console.log('Getting company with ID:', id);
    const url = buildUrl('companies', id);
    console.log('Company request URL:', url);
    return await sendRequest<Company>(url, init);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Resource not found'
    ) {
      return null;
    }
    throw error;
  }
};

export const getPromotions = async (
  params: Record<string, string | number> = {},
  init?: RequestInit,
) => {
  try {
    return await sendRequest<Promotion[]>(
      `${buildUrl('promotions')}?${stringifyQueryParams(params as Record<string, string>)}`,
      init,
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Resource not found'
    ) {
      return [];
    }
    throw error;
  }
};
