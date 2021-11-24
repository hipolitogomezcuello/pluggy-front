import useSWR from "swr";
import fetcher from "./fetcher";

const useQuotes = () => {
  const { data, error } = useSWR("https://8sa5p2lw88.execute-api.sa-east-1.amazonaws.com/dev/quotes", fetcher, {
    refreshInterval: 15000
  });
  return {
    quotes: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useQuotes;