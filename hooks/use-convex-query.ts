import { useQuery, useMutation } from "convex/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FunctionReference, OptionalRestArgs } from "convex/server";

export const useConvexQuery = <T extends FunctionReference<"query">>(
  query: T,
  ...args: OptionalRestArgs<T>
) => {
  const result = useQuery(query, ...args);
  const [data, setData] = useState<typeof result>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Use effect to handle the state changes based on the query result
  useEffect(() => {
    if (result === undefined) {
      setIsLoading(true);
    } else {
      try {
        setData(result);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(error);
        toast.error(error.message);
        setIsLoading(false);
      }
    }
  }, [result]);

  return {
    data,
    isLoading,
    error,
  };
};

export const useConvexMutation = <T extends FunctionReference<"mutation">>(
  mutation: T
) => {
  const mutationFn = useMutation(mutation);
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (...args: OptionalRestArgs<T>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mutationFn(...args);
      setData(response);
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, isLoading, error };
};