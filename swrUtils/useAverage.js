import useSWR from "swr";
import fetcher from "./fetcher";

const useAverage = () => {
  const { data, error } = useSWR("https://8sa5p2lw88.execute-api.sa-east-1.amazonaws.com/dev/average", fetcher, {
    refreshInterval: 15000
  });
  return {
    average: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useAverage;