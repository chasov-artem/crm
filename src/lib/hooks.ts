import { useQuery } from '@tanstack/react-query';
import {
  getSummaryStats,
  getSummarySales,
  getCountries,
  getCategories,
  getCompanies,
  getCompany,
  getPromotions,
  type SummaryStats,
  type SummarySales,
  type Country,
  type Category,
  type Company,
  type Promotion,
} from './api';

export const useSummaryStats = () => {
  return useQuery<SummaryStats>({
    queryKey: ['summaryStats'],
    queryFn: () => getSummaryStats(),
  });
};

export const useSummarySales = () => {
  return useQuery<SummarySales[]>({
    queryKey: ['summarySales'],
    queryFn: () => getSummarySales(),
  });
};

export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: () => getCountries(),
  });
};

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
};

export const useCompanies = () => {
  return useQuery<Company[]>({
    queryKey: ['companies'],
    queryFn: () => getCompanies(),
  });
};

export const useCompany = (id: string) => {
  return useQuery<Company>({
    queryKey: ['company', id],
    queryFn: () => getCompany(id),
    enabled: !!id,
  });
};

export const usePromotions = (
  params: Record<string, string> = {},
) => {
  return useQuery<Promotion[]>({
    queryKey: ['promotions', params],
    queryFn: () => getPromotions(params),
  });
};
