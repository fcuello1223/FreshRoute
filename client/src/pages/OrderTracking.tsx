import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { dummyDashboardOrdersData } from "../assets/assets";

import Loading from "../components/Loading";
import LiveMap from "../components/OrderTracking/LiveMap";
import OrderOTP from "../components/OrderTracking/OrderOTP";
import OrderTimeLine from "../components/OrderTracking/OrderTimeLine";

import type { Order } from "../types";
import { ArrowLeft, MapPin, Phone } from "lucide-react";

const OrderTracking = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || '$';

  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [liveLocation, setLiveLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOrder(dummyDashboardOrdersData.find((order) => order._id === id) as any);
    setIsLoading(false);
  }, [id, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-app-cream mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-sm text-app-text-light hover:text-app-green transition-colors mb-6"
        >
          <ArrowLeft className="size-4" /> Back to Orders
        </button>
        {/* Order ID, Date and Status */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-app-green">
              Order #{order!._id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-sm text-app-text-light mt-1">
              Placed on{" "}
              {new Date(order!.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <span
            className={`px-4 py-1.5 text-sm font-semibold rounded-full ${order!.status === "Delivered" ? "bg-green-100 text-green-700" : order!.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-app-orange/10 text-app-orange"}`}
          >
            {order!.status}
          </span>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left side - Timeline + Map Area */}
          <div className="lg:col-span-2 space-y-6">
            <OrderOTP order={order} />
            <LiveMap order={order} liveLocation={liveLocation} />
            <OrderTimeLine order={order} />
            {order?.deliveryPartner &&
              order.status !== "Delivered" &&
              order.status !== "Cancelled" && (
                <div className="bg-white rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-full bg-app-green text-center flex-center">
                      <span className="text-white font-semibold text-sm">
                        {order.deliveryPartner.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-app-green">
                        {order.deliveryPartner.name}
                      </p>
                      <p className="text-xs text-app-text-light capitalize">
                        {order.deliveryPartner.vehicleType} - Delivery Partner
                      </p>
                    </div>
                  </div>
                  <a
                    href={`Tel: ${order.deliveryPartner.phone}`}
                    className="p-2.5 bg-app-cream hover:bg-app-cream-dark rounded-xl transition-colors"
                  >
                    <Phone className="size-4 text-app-green" />
                  </a>
                </div>
              )}
          </div>
          {/* Right side - Order Details */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-app-green mb-3 flex items-center gap-2">
                <MapPin className="size-4" />
                Delivery Address
              </h3>
              <p className="text-sm text-app-text-light leading-relaxed">
                {order?.shippingAddress.label}
                <br />
                {order?.shippingAddress.address}
                <br />
                {order?.shippingAddress.city}, {order?.shippingAddress.state}{" "}
                {order?.shippingAddress.zip}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-app-green mb-3">
                Items ({order?.items.length})
              </h3>
              <div className="space-y-3">
                {order?.items.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-app-green truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-app-text-light">
                          x{item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">
                        {currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-app-border space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-app-text-light">Subtotal</span>
                  <span>
                    {currency}
                    {order?.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-app-text-light">Delivery Fee</span>
                  <span>
                    {order.deliveryFee === 0
                      ? "Free"
                      : `${currency}${order.deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-app-text-light">Tax</span>
                  <span>
                    {currency}
                    {order?.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-app-border font-semibold text-app-green">
                  <span>Total</span>
                  <span>
                    {currency}
                    {order?.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
