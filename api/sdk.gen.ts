// This file is auto-generated by @hey-api/openapi-ts

import type { Client, Options as ClientOptions, TDataShape } from '@hey-api/client-axios';
import { client as _heyApiClient } from './client.gen';
import type { RegisterUserData, RegisterUserError, RegisterUserResponse } from './types.gen';
import { zRegisterUserResponse } from './zod.gen';

export type Options<
  TData extends TDataShape = TDataShape,
  ThrowOnError extends boolean = boolean,
> = ClientOptions<TData, ThrowOnError> & {
  /**
   * You can provide a client instance returned by `createClient()` instead of
   * individual options. This might be also useful if you want to implement a
   * custom client.
   */
  client?: Client;
  /**
   * You can pass arbitrary values through the `meta` object. This can be
   * used to access values that aren't defined as part of the SDK function.
   */
  meta?: Record<string, unknown>;
};

/**
 * Register a new user
 * Register a new user and send verification email
 */
export const registerUser = <ThrowOnError extends boolean = false>(
  options: Options<RegisterUserData, ThrowOnError>
) => {
  return (options.client ?? _heyApiClient).post<
    RegisterUserResponse,
    RegisterUserError,
    ThrowOnError
  >({
    responseValidator: async data => {
      return await zRegisterUserResponse.parseAsync(data);
    },
    url: '/api/auth/register',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};
