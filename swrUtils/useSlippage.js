import useSWR from "swr";
import fetcher from "./fetcher";

const useSlippage = () => {
  const { data, error } = useSWR("https://8sa5p2lw88.execute-api.sa-east-1.amazonaws.com/dev/slippage", fetcher, {
    refreshInterval: 15000
  });
  return {
    slippage: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useSlippage;