import { supabase } from "lib/supabase";
import { useQuery } from "react-query";
import { getPagination } from "utils/getPagination";

type FilterType = {
  diambil: boolean;
  page: number;
  perPage: number;
};

const getSertifikat = async ({ page, perPage, diambil }: FilterType) => {
  const { from, to } = getPagination(page - 1, perPage);
  const { data, count } = await supabase
    .from("sertifikat")
    .select(`*`, { count: "exact" })
    .match({ diambil })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (data) {
    return {
      data,
      count,
      page: +page,
    };
  } else {
    return;
  }
};

export const useSertifikat = (filter: FilterType) => {
  return useQuery(["sertifikat", filter], () => getSertifikat(filter), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
};
