import React from "react";
import OrderChip from "@/app/_components/OrderChip";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AddOrdersList({ choose }) {
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR("/api/orders/available", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className=" absolute flex flex-wrap gap-2 p-2 border bg-primary-600 rounded-xl min-h-min">
      {orders.map((order, index) => (
        <OrderChip
          key={index}
          order={order}
          selectable={true}
          deletable={false}
          choose={choose}
        />
      ))}
    </div>
  );
}

export default AddOrdersList;
