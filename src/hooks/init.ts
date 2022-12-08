import { useState } from "react";
import { useMutation } from "react-query";
import { useEffectOnce } from "react-use";

interface UseMutateInitial {
    mutate(): void;
    isLoading: boolean,
    error: [number, string] | null
}

/**
 * Hook for wrapping a mutation with an initial call that
 * will be invoked once and the loading states of both
 * are merged
 * 
 * @param init The init function
 * @param action The action function
 * @returns The state
 */
export function useMutateWithInitial(init: () => Promise<void>, action: () => Promise<void>):UseMutateInitial {
    const { isLoading, error, mutate } = useMutation<void, [number, string]>(action);
    const [isLoadingInit, setLoading] = useState(true);
    useEffectOnce(() => {
        setLoading(true);
        init()
            .then()
            .catch()
            .finally(() => setLoading(false));
    });
    return {
        isLoading: isLoading || isLoadingInit,
        error,
        mutate

    }
}