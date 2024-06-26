import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharacterState, LoadCharactersResponse, SaveCharactersResponse } from './types';

const USER_NAME = '{ehilo}';

export const characterApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://recruiting.verylongdomaintotestwith.ca/api/' }),
    tagTypes: [],
    reducerPath: 'characterApi',
    endpoints: (builder) => ({
      getCharacterData: builder.query<LoadCharactersResponse, void>({
        query: () => `{${USER_NAME}}/character`,
      }),
      saveCharacters: builder.mutation<SaveCharactersResponse, CharacterState>({
        query: (data: CharacterState) => ({
          url: `{${USER_NAME}}/character`,
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json'
          },
        }),
      }),    
    }),
})
  
  // Export hooks for usage in functional components
export const { useGetCharacterDataQuery } = characterApi
