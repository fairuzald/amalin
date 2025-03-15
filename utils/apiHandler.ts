import { hideToast, showToast } from '@/components/elements/toast';
import DevConsole from '@/utils/DevConsole';
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';

export interface ToastOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  showLoadingToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
  autoHide?: boolean;
  showRefetchLoadingToast?: boolean;
}

// Default toast options
const defaultToastOptions: ToastOptions = {
  showSuccessToast: true,
  showErrorToast: true,
  showLoadingToast: true,
  successMessage: 'Operation completed successfully',
  errorMessage: 'An error occurred',
  loadingMessage: 'Processing...',
  position: 'top',
  visibilityTime: 4000,
  autoHide: true,
  showRefetchLoadingToast: false,
};

export function useApiMutation<TData, TError, TVariables>(
  options: UseMutationOptions<TData, TError, TVariables>,
  toastOptions?: ToastOptions
): UseMutationResult<TData, TError, TVariables> {
  const mergedToastOptions = { ...defaultToastOptions, ...toastOptions };

  const {
    onMutate: originalOnMutate,
    onSuccess: originalOnSuccess,
    onError: originalOnError,
    ...restOptions
  } = options;

  return useMutation<TData, TError, TVariables>({
    ...restOptions,
    onMutate: async (variables: TVariables) => {
      hideToast();

      if (mergedToastOptions.showLoadingToast) {
        showToast({
          type: 'info',
          text1: mergedToastOptions.loadingMessage,
          position: mergedToastOptions.position,
          visibilityTime: mergedToastOptions.visibilityTime,
          autoHide: mergedToastOptions.autoHide,
        });
      }

      if (originalOnMutate) {
        return await originalOnMutate(variables);
      }
    },
    onSuccess: (data: TData, variables: TVariables, context: unknown) => {
      hideToast();

      if (mergedToastOptions.showSuccessToast) {
        showToast({
          type: 'success',
          text1: mergedToastOptions.successMessage,
          position: mergedToastOptions.position,
          visibilityTime: mergedToastOptions.visibilityTime,
          autoHide: mergedToastOptions.autoHide,
        });
      }

      if (originalOnSuccess) {
        originalOnSuccess(data, variables, context);
      }
    },
    onError: (error: TError, variables: TVariables, context: unknown) => {
      hideToast();

      DevConsole.error('API Error:', error);

      let errorMessage = mergedToastOptions.errorMessage;
      let detailMessage = '';

      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          detailMessage = Object.values(errors).flat().join('. ');
        }
      }

      if (mergedToastOptions.showErrorToast) {
        showToast({
          type: 'error',
          text1: errorMessage,
          text2: detailMessage || undefined,
          position: mergedToastOptions.position,
          visibilityTime: mergedToastOptions.visibilityTime,
          autoHide: mergedToastOptions.autoHide,
        });
      }

      if (originalOnError) {
        originalOnError(error, variables, context);
      }
    },
  });
}

export function useApiHandler<TData, TError, TVariables, TOptions>(
  mutationOptionsFn: (options?: TOptions) => UseMutationOptions<TData, TError, TVariables>,
  mutationOptions?: TOptions,
  toastOptions?: ToastOptions
): UseMutationResult<TData, TError, TVariables> {
  const options = mutationOptionsFn(mutationOptions);
  return useApiMutation<TData, TError, TVariables>(options, toastOptions);
}

export function useApiQuery<TQueryFnData, TError, TData, TQueryKey extends QueryKey>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  toastOptions?: ToastOptions
): UseQueryResult<TData, TError> {
  const mergedToastOptions = { ...defaultToastOptions, ...toastOptions };

  const { ...queryOptions } = options;

  const isInitialLoadRef = React.useRef(true);

  React.useEffect(() => {
    if (isInitialLoadRef.current && mergedToastOptions.showLoadingToast) {
      showToast({
        type: 'info',
        text1: mergedToastOptions.loadingMessage,
        position: mergedToastOptions.position,
        visibilityTime: mergedToastOptions.visibilityTime,
        autoHide: mergedToastOptions.autoHide,
      });
    }
  }, []);

  const result = useQuery<TQueryFnData, TError, TData, TQueryKey>(queryOptions);

  React.useEffect(() => {
    if (result.isSuccess && isInitialLoadRef.current) {
      hideToast();

      if (mergedToastOptions.showSuccessToast) {
        showToast({
          type: 'success',
          text1: mergedToastOptions.successMessage,
          position: mergedToastOptions.position,
          visibilityTime: mergedToastOptions.visibilityTime,
          autoHide: mergedToastOptions.autoHide,
        });
      }

      isInitialLoadRef.current = false;
    }
  }, [result.isSuccess, result.dataUpdatedAt]);

  React.useEffect(() => {
    if (result.isError) {
      hideToast();

      DevConsole.error('API Query Error:', result.error);

      let errorMessage = mergedToastOptions.errorMessage;
      let detailMessage = '';

      if (result.error instanceof AxiosError) {
        if (result.error.response?.data?.message) {
          errorMessage = result.error.response.data.message;
        }
        if (result.error.response?.data?.errors) {
          const errors = result.error.response.data.errors;
          detailMessage = Object.values(errors).flat().join('. ');
        }
      }

      if (mergedToastOptions.showErrorToast) {
        showToast({
          type: 'error',
          text1: errorMessage,
          text2: detailMessage || undefined,
          position: mergedToastOptions.position,
          visibilityTime: mergedToastOptions.visibilityTime,
          autoHide: mergedToastOptions.autoHide,
        });
      }
    }
  }, [result.isError, result.error]);

  return result;
}

export function useApiQueryHandler<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey,
  TOptions,
>(
  queryOptionsFn: (options?: TOptions) => UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryOptions?: TOptions,
  toastOptions?: ToastOptions
): UseQueryResult<TData, TError> {
  const options = queryOptionsFn(queryOptions);
  return useApiQuery<TQueryFnData, TError, TData, TQueryKey>(options, toastOptions);
}
