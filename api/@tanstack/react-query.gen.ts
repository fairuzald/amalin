// This file is auto-generated by @hey-api/openapi-ts

import { queryOptions, type UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { client as _heyApiClient } from '../client.gen';
import { type Options, registerUser } from '../sdk.gen';
import type { RegisterUserData, RegisterUserError, RegisterUserResponse } from '../types.gen';

export type QueryKey<TOptions extends Options> = [
  Pick<TOptions, 'baseURL' | 'body' | 'headers' | 'path' | 'query'> & {
    _id: string;
    _infinite?: boolean;
  },
];

const createQueryKey = <TOptions extends Options>(
  id: string,
  options?: TOptions,
  infinite?: boolean
): [QueryKey<TOptions>[0]] => {
  const params: QueryKey<TOptions>[0] = {
    _id: id,
    baseURL: (options?.client ?? _heyApiClient).getConfig().baseURL,
  } as QueryKey<TOptions>[0];
  if (infinite) {
    params._infinite = infinite;
  }
  if (options?.body) {
    params.body = options.body;
  }
  if (options?.headers) {
    params.headers = options.headers;
  }
  if (options?.path) {
    params.path = options.path;
  }
  if (options?.query) {
    params.query = options.query;
  }
  return [params];
};

export const registerUserQueryKey = (options: Options<RegisterUserData>) =>
  createQueryKey('registerUser', options);

export const registerUserOptions = (options: Options<RegisterUserData>) => {
  return queryOptions({
    queryFn: async ({ queryKey, signal }) => {
      const { data } = await registerUser({
        ...options,
        ...queryKey[0],
        signal,
        throwOnError: true,
      });
      return data;
    },
    queryKey: registerUserQueryKey(options),
  });
};

export const registerUserMutation = (options?: Partial<Options<RegisterUserData>>) => {
  const mutationOptions: UseMutationOptions<
    RegisterUserResponse,
    AxiosError<RegisterUserError>,
    Options<RegisterUserData>
  > = {
    mutationFn: async localOptions => {
      const { data } = await registerUser({
        ...options,
        ...localOptions,
        throwOnError: true,
      });
      return data;
    },
  };
  return mutationOptions;
};
