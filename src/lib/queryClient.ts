import { QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query";
const env = process.env.ENVIRONMENT;
export const queryClient =new QueryClient({
    defaultOptions:{
        queries:{
      staleTime: 60 * 1000, 
      refetchOnWindowFocus: env == "DEVELOPMENT" ? false:true,
      refetchOnMount:env == "DEVELOPMENT" ? false:true ,
      refetchOnReconnect:env == "DEVELOPMENT" ? false:true ,
      retry: 1,
        }
    }
})

export const invalidateQueries = (queryKey:QueryKey) => {
  return queryClient.invalidateQueries({ queryKey });
};
export const prefetchQuery = async <T>(queryKey: QueryKey, queryFn: QueryFunction<T>) => {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });
};
export const resetQueries = (): void => {
  queryClient.resetQueries();
};
export default queryClient;