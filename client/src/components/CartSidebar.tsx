import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

const CartSidebar = () => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  const {
    items,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) {
    return null;
  }

  const deliveryFee = cartTotal > 20 ? 0 : 4.99;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <Fragment>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-app-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5" />
            <h2 className="text-lg font-medium">Your Cart</h2>
            <span className="px-2 py-0.5 text-xs font-semibold bg-app-cream rounded-full">
              {items.length} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl hover:bg-app-cream transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>
        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="size-16 text-app-border mb-4" />
              <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
            </div>
          ) : (
            items.map((item) => {
              return (
                <div
                  key={item.product._id}
                  className="flex gap-3 bg-app-cream/60 rounded-xl p-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="size-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-app-text-light">
                      {currency}
                      {item.product.price.toFixed(2)} / {item.product.unit}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity - 1)
                          }
                          className="size-7 rounded-lg bg-white border-app-border flex-center"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1)
                          }
                          className="size-7 rounded-lg bg-white border-app-border flex-center"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {currency}
                          {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="p-1 text-app-text-light hover:text-app-error transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-app-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-app-text-light">Subtotal</span>
              <span className="font-medium">
                {currency}
                {cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-app-text-light">Delivery</span>
              <span className="font-medium">
                {deliveryFee === 0 ? (
                  <span className="text-app-success">Free</span>
                ) : (
                  `${currency}${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>
            {deliveryFee > 0 && (
              <p className="text-xs text-app-text-light text-center">
                Free delivery on orders over {currency}20
              </p>
            )}
            <div className="flex justify-between font-semibold text-base border-t border-app-border pt-3">
              <span>Total</span>
              <span>
                {currency}
                {grandTotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate("/checkout");
                window.scrollTo(0, 0);
              }}
              className="w-full py-3 bg-app-orange text-white font-semibold rounded-xl hover:bg-app-orange-dark transition-colors flex-center gap-2 active:scale-[0.98]"
            >
              Proceed to Checkout <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CartSidebar;
