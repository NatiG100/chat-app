import { 
    useQueryClient,
    QueryKey,
    QueryFunction,
    QueryOptions,
    useQuery,
    MutationKey,
    MutationFunction,
    MutationOptions,
    useMutation,
 } from "react-query";

export function useRequestProcessor(){
    const queryClient = useQueryClient();

    function query(key:QueryKey, queryFunction:QueryFunction,options:QueryOptions={}){
        return useQuery({
            queryKey:key,
            queryFn:queryFunction,
            ...options
        });
    }
    function mutate(key:MutationKey,mutationFunction:MutationFunction,options:MutationOptions={}){
        return useMutation({
            mutationKey:key,
            mutationFn:mutationFunction,
            onSettled:()=>queryClient.invalidateQueries(key),
            ...options,
        });
    }

    return {query,mutate};
}