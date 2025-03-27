import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { useStorage } from './manage-store';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers) => {
    const { getAccessToken } = useStorage();
    const accessToken = getAccessToken();

    console.log('accessToken', accessToken);

    if (accessToken) {
      headers.set('Authorization', `${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (arguments_, api, extraOptions) => {
  let result = await baseQuery(arguments_, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (mutex.isLocked()) {
      await mutex.waitForUnlock();
      result = await baseQuery(arguments_, api, extraOptions);
    } else {
      const release = await mutex.acquire();
      const { getRefreshToken } = useStorage();

      const refreshToken = getRefreshToken();

      try {
        const refreshResult = await baseQuery(
          {
            method: 'POST',
            url: 'auth/refresh',
            body: {
              refresh: refreshToken,
            },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch({
            type: 'auth/refreshToken',
            payload: refreshResult.data,
          });
          result = await baseQuery(arguments_, api, extraOptions);
        } else {
          api.dispatch({
            type: 'user/signout',
          });
        }
      } finally {
        release();
      }
    }
  }

  return result;
};
