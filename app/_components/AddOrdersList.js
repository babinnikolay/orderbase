import React from "react";
import OrderChip from "@/app/_components/OrderChip";
import useSWR from "swr";
import EmptyList from "@/app/_components/EmptyList";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AddOrdersList({ onSelect, clientId }) {
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR(`/api/orders/available?clientId=${clientId}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (orders.length === 0)
    return (
      <div className="absolute">
        <EmptyList name="orders" />
      </div>
    );

  return (
    <div className=" absolute flex flex-wrap gap-2 p-2 border bg-primary-600 rounded-xl min-h-min">
      {orders.map((order, index) => (
        <OrderChip
          key={index}
          order={order}
          selectable={true}
          deletable={false}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default AddOrdersList;
