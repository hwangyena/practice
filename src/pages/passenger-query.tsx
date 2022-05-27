import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Loading } from 'src/components/common';
import { PassengerAddButton, PassengerTable } from 'src/components/passenger';
import { getFetch } from 'src/lib/api';
import { PassengerStore } from 'src/store';

type Props = {};

export default function PassengerQuery({}: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <header className="grid place-items-center mt-5">
        <h2>✈️ Page /passenger - React Query ✈</h2>
      </header>
      <main className="grid place-items-center mt-3 p-2">
        <h3>사용자 목록</h3>
        <section className="w-[50%] flex justify-end">
          <PassengerAddButton isQuery />
        </section>
        <PassengerStore.Provider>
          <QueryClientPassenger />
        </PassengerStore.Provider>
      </main>
    </QueryClientProvider>
  );
}

function QueryClientPassenger() {
  /**
   * useQuery<TQueryFnData=unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>
   *
   * TQueryFnData: useQuery 함수가 반환하는 값
   * TError: useQuery 함수에서 반환되는 에러
   * TData : data 반환 값, queryFn에 따라 다른 값 반환
   *
   */
  const { isLoading, data, error, isFetching } = useQuery<unknown, unknown, IApiRes<IPassengerData>>('passenger', () =>
    getFetch('/v1/passenger', { page: 0, size: 5 })
  );

  return isLoading ? <Loading /> : <PassengerTable passengers={data?.data.data ?? []} />;
}
