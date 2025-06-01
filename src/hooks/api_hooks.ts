import api from "@/services/api";
import { APIResponse } from "@/types";
import { InfiniteData, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions, useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { Axios, AxiosError, AxiosRequestConfig } from "axios";
/*
T-> type of the data returned
E-> type of the error returned for now it will be AxiosError as we are sending the AxiosErro back but we may change it
*/
export interface ApiGetOptions<T,E>{
    queryKey:QueryKey;
    enabled?:boolean;
    onSuccess?:(data:T)=>void;
    onError?:(error:E)=>void;
    queryOptions?:Omit<UseQueryOptions<T,E,T,QueryKey>,'queryKey'|'queryFn'>
}
export interface ApiMutationOptions<T,D,E>{
  queryKey?:QueryKey,
  enabled?:boolean,
  onSuccess:(data:T,variables:D,context:unknown)=>void,
  onError?:(error:E,variables:D,context:unknown)=>void,
  mutationOptions?:Omit<UseMutationOptions<T,E,D,unknown>,'mutationFn'>
}
// export interface ApiInfiniteOptions<T,E,S>{
//   queryKey?: QueryKey;
//   enabled?: boolean;
//   getNextPageParam?: (lastPage: {data:T,nextCursor:string|number|undefined}, allPages:{data:T[],nextCursor:string|number|undefined}[]) => unknown;
//   onSuccess?: (data:S ) => void;
//   onError?: (error: E) => void;
//   infiniteOptions?: Omit<UseInfiniteQueryOptions<T, E, T, T, QueryKey>, 'queryKey' | 'queryFn' | 'getNextPageParam'>;
// }
export function useApiGet<T>(url:string,apiOptions:AxiosRequestConfig,options:ApiGetOptions<T,AxiosError>)
{
     const {
    queryKey = [url],
    enabled = true,
    onSuccess,
    onError,
    queryOptions = {},
  } = options;

  const getQuery = useQuery({
    queryKey,
    queryFn:async():Promise<T>=>{
        const response = await api.get<APIResponse<T>>(url,apiOptions);
        if(onSuccess)onSuccess(response.data.data!)
        return response.data.data!;
    },
    
    enabled,
    ...queryOptions
  });
  return getQuery
}

export function useApiPost<T,D>(url:string,apiOptions:AxiosRequestConfig,data:D,options:ApiMutationOptions<T,D,AxiosError>){
 const {
    queryKey,
    onSuccess,
    onError,
    mutationOptions = {},
  } = options;
  const queryClient = useQueryClient();
  return useMutation<T,AxiosError,D>({
    mutationFn:async(data:D):Promise<T>=>{
      const response = await api.post<APIResponse<T>>(url,data,apiOptions);
      return response.data.data!
      
    },
    onSuccess:(data,variables,context)=>{
      if(queryKey)
      {
        queryClient.invalidateQueries({queryKey});
      }
      if(onSuccess){
        onSuccess(data,variables,context)
      }
    },
    onError:(error,variables,context)=>{
      if(onError){
        onError(error,variables,context)
      }
    },
    ...mutationOptions
  })
}

export function useApiPut<T = unknown,D = unknown >(url:string,options:ApiMutationOptions<T,D,AxiosError>,data:D,apiOptions:AxiosRequestConfig){
  const {
    queryKey,
    onSuccess,
    onError,
    mutationOptions = {},
  } = options;
    const queryClient = useQueryClient();
    return useMutation<T,AxiosError,D>({
      mutationFn:async(data:D):Promise<T>=>{
        const response = await api.put<APIResponse<T>>(url,data,apiOptions)
        return response.data.data!;
      },
      onSuccess:(data,variables,context)=>{
        if(queryKey)
        {
          queryClient.invalidateQueries({queryKey})
        }
        if(onSuccess){
          onSuccess(data,variables,context)
        }
      },
      onError,
      ...mutationOptions
    })

}

export function useApiDelete<T>(
  url:string,apiOptions:AxiosRequestConfig,options:ApiMutationOptions<T,string|number,AxiosError>
    
  )
  {
     const {
    queryKey,
    onSuccess,
    onError,
    mutationOptions = {},
  } = options;
  
  const queryClient = useQueryClient();
    return useMutation({
mutationFn:async(id:string|number):Promise<T>=>{
  const endpoint = id ? `${url}/${id}` : url;
  const response = await api.delete<APIResponse<T>>(endpoint,apiOptions);
  return response.data.data!;
},
onSuccess:(data,variables,context)=>{
  if(queryKey)
  {
    queryClient.invalidateQueries({queryKey})
  }
  if(onSuccess)
  {
    onSuccess(data,variables,context)
  }
},
onError,
...mutationOptions
    })
  }
export interface PaginatedResponse<T> 
{
    success:boolean,
    data:{
      data:T[],
      nextCursor:number|undefined|string,
      prevCursor:number|undefined|string,
      totalResults:number
    },
    message?:string,
    error?:string,
 
}
export function useApiInfinite<T>(
  url: string,
  apiOptions: AxiosRequestConfig,
  options: any
) {
  const {
    queryKey,
    
    enabled = true,
    onSuccess,
   

  } = options;

  return useInfiniteQuery<
  { data: T[]; nextCursor?: string | number; prevCursor?: string | number },
  AxiosError,
  InfiniteData<{ data: T[]; nextCursor?: string | number; prevCursor?: string | number }>,
  QueryKey
>({
  queryKey: queryKey!,
  queryFn: async (props) => {
    const separator = url.includes('?') ? '&' : '?';
    const response = await api.get<PaginatedResponse<T>>(
      `${url}${separator}page=${props.pageParam}&size=50`,
      apiOptions
    );
    if (onSuccess) onSuccess(response.data.data.data);

    return {
      data: response.data.data.data,
      nextCursor: response.data.data.nextCursor,
      prevCursor: response.data.data.prevCursor,
    };
  },
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
  enabled,
  initialPageParam: 1
  
});
}