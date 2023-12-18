import { WS_NORMA_API } from "./burger-api";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

  export const wsApi = createApi({
    reducerPath: 'wsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (build) => ({
      getMessages: build.query<any, any>({
        queryFn: async () => ({data: {}}),
        async onCacheEntryAdded(
          arg,
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
        ) {
          const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');
          try {
            await cacheDataLoaded
            const listener = (event: MessageEvent) => {
              const data = JSON.parse(event.data);
  
              updateCachedData(() => data);
            }
  
            ws.addEventListener('message', listener);
          } catch {
            // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
            // in which case `cacheDataLoaded` will throw
          }
          await cacheEntryRemoved
          ws.close()
        },
      }),
    }),
  })

  export const { useGetMessagesQuery } = wsApi;