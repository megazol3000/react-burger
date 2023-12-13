import { FC } from "react";
import OrderFeed from "../components/order-feed/order-feed";

const Feed: FC = () => {
  return (
    <div className="bodyContainer pt-10 pb-10">
      <OrderFeed />
    </div>
  );
};

export default Feed;
