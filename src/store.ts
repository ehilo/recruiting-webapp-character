import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './state/characters/characterSlice';
import { characterApi } from './state/characters/characterApi';

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    [characterApi.reducerPath]: characterApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(characterApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch