import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IPost,
  IServerResponce,
  IUser,
  IUserPostsResponse,
} from '../../interfaces/dummy';  

export const dummyApi = createApi({
  reducerPath: 'dummy',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (build) => ({
    getUsers: build.query<IUser[], string>({
      query: () => ({ url: 'users', params: { limit: 7 } }),
      transformResponse: (res: IServerResponce<IUser>) => res.users,
    }),
    getUser: build.query<IUser, string>({
      query: (id) => ({ url: `users/${id}` }),
    }),
    getUserPost: build.query<IPost[], string>({
      query: (id) => ({ url: `users/${id}/posts` }),
      transformResponse: (res: IUserPostsResponse<IPost>) => res.posts,
      keepUnusedDataFor: 120,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetUserPostQuery,
  useLazyGetUserQuery,
  useLazyGetUserPostQuery,
} = dummyApi;
