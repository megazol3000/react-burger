import { FC } from "react";
import OrderFeedTape from "./order-feed-tape/order-feed-tape";
import OrderFeedDashboard from "./order-feed-dashboard/order-feed-dashboard";
import { useGetMessagesQuery } from "../../utils/ws-api";

const OrderFeed: FC = () => {
  const res = useGetMessagesQuery('');

  return (
    <>
      {
        res.data && <OrderFeedTape data={res.data} />
      }
      <OrderFeedDashboard />
    </>
  );
};

export default OrderFeed;
