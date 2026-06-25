import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ArrowRight, ShoppingCart, Star, ShieldCheck, Tag } from "lucide-react";

// Mock Data cho Giỏ hàng
const initialCart = [
  {
    id: 1,
    title: "Master Full-Stack Web Development in 6 Months",
    instructor: "David Nguyen",
    price: 199.0,
    oldPrice: 249.0,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "UI/UX Design Essentials — From Research to Prototype",
    instructor: "Sarah Pham",
    price: 149.0,
    oldPrice: 199.0,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&fit=crop&q=60",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [selectedItems, setSelectedItems] = useState(initialCart.map(i => i.id));
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  const toggleSelect = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) setSelectedItems([]);
    else setSelectedItems(cartItems.map(i => i.id));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((i) => i !== id));
  };

  const selectedCartList = cartItems.filter(item => selectedItems.includes(item.id));

  const subtotal = selectedCartList.reduce((acc, item) => acc + item.oldPrice, 0);
  const baseTotal = selectedCartList.reduce((acc, item) => acc + item.price, 0);
  const extraDiscount = isApplied ? baseTotal * 0.1 : 0; // 10% discount for mock
  const total = baseTotal - extraDiscount;
  const totalDiscount = (subtotal - baseTotal) + extraDiscount;

  const handleApplyCoupon = () => {
    if (couponCode.trim()) setIsApplied(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-body py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {cartItems.length} {cartItems.length === 1 ? 'course' : 'courses'} in cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 border-dashed bg-white py-24 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <ShoppingCart size={32} />
            </div>
            <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Looks like you haven't added any courses to your cart yet.
            </p>
            <Link
              to="/courses"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-slate-900"
            >
              Explore Courses
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            
            {/* Cart Items */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <label className="flex cursor-pointer items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                    onChange={toggleSelectAll}
                    className="h-5 w-5 rounded border-slate-300 text-slate-900 accent-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:accent-white" 
                  />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Select All ({cartItems.length} items)</span>
                </label>
              </div>

              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className={`group flex flex-col gap-5 rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-slate-900 sm:flex-row sm:items-center sm:p-5 ${selectedItems.includes(item.id) ? 'border-amber-400 dark:border-amber-500' : 'border-slate-200/80 hover:border-amber-200 dark:border-slate-800'}`}
                  >
                    <div className="flex items-center sm:mr-2">
                       <input 
                         type="checkbox" 
                         checked={selectedItems.includes(item.id)}
                         onChange={() => toggleSelect(item.id)}
                         className="h-5 w-5 rounded border-slate-300 text-slate-900 accent-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:accent-white" 
                       />
                    </div>
                    <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
                      <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                    </div>

                    <div className="flex flex-1 flex-col sm:justify-center">
                      <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">By {item.instructor}</p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span className="flex items-center text-amber-500">
                          {item.rating} <Star size={12} className="ml-1 fill-current" />
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">|</span>
                        <span className="text-emerald-500">Lifetime Access</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-col sm:items-end sm:justify-center sm:border-none sm:pt-0">
                      <div className="text-right">
                        <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                          ${item.price.toFixed(2)}
                        </div>
                        {item.oldPrice && (
                          <div className="text-xs text-slate-400 line-through">
                            ${item.oldPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-slate-400 transition-colors hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                        <span className="sm:hidden">Remove</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary Checkout Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="sticky top-24 h-fit rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/20 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
            >
              <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">Order Summary</h2>
              
              <div className="mt-6 flex flex-col gap-4 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">${subtotal.toFixed(2)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Discount</span>
                    <span className="font-semibold">-${totalDiscount.toFixed(2)}</span>
                  </div>
                )}

                {/* Promo Code Input */}
                <div className="mt-3">
                  <p className="mb-2 text-xs font-semibold text-slate-700 dark:text-slate-300">Promo Code</p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setIsApplied(false);
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition-colors focus:border-amber-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-amber-500"
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim()}
                      className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                    >
                      Apply
                    </button>
                  </div>
                  {isApplied && (
                    <p className="mt-2 text-xs font-medium text-emerald-500">
                      Coupon applied successfully! (10% off)
                    </p>
                  )}
                </div>
                
                <div className="my-2 h-px w-full bg-slate-100 dark:bg-slate-800" />
                
                <div className="flex justify-between text-lg font-extrabold text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                disabled={selectedItems.length === 0}
                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4 text-sm font-bold text-[#0f1119] shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/40 disabled:opacity-50 disabled:pointer-events-none"
              >
                Proceed to Checkout ({selectedItems.length})
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>

              <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-slate-50 p-4 text-xs text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                <ShieldCheck size={16} className="shrink-0 text-emerald-500" />
                <p>30-Day Money-Back Guarantee. Safe and secure checkout.</p>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </div>
  );
}
