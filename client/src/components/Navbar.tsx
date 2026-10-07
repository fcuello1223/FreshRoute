import {
  ArrowUpRight,
  Bike,
  ChevronDown,
  LogOut,
  MapPin,
  Menu,
  Package,
  Search,
  Shield,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { Fragment, useState } from "react";
import type { SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user: any = {
    name: "John Doe",
    email: "john@example.com",
    isAdmin: true,
  };

  const { cartCount, setCartOpen } = {
    cartCount: 3,
    setCartOpen: (_data: any) => {},
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (event: SubmitEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-app-border">
      <div className="flex items-center justify-between gap-4 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[22px] font-medium shrink-0"
        >
          <Bike size={24} /> FreshRoute
        </Link>
        <div className="w-full flex items-center justify-end gap-4 lg:gap-10">
          {/* NavLinks - Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/deals" className="text-app-orange">
              Deals
            </Link>
          </div>
          {/* Search form */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm"
          >
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full pl-8 p-2 bg-orange-50 rounded-full ring ring-app-orange/15 focus:ring-app-orange/30"
              />
            </div>
          </form>
          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-xl"
            >
              <ShoppingCart className="size-5 text-zinc-900" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-1 size-4 bg-app-orange text-white text-[10px] rounded-full flex-center">
                  {cartCount}
                </span>
              )}
            </button>
            {/* User */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2"
                >
                  <div className="flex-center size-7 rounded-full bg-green-950 text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="size-3 text-zinc-500" />
                </button>
              ) : (
                <div className="flex-center gap-2">
                  <Link
                    to="/login"
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-950-light transition-colors"
                  >
                    <User size={16} /> Sign In
                  </Link>
                  {userMenuOpen ? (
                    <X
                      className="md:hidden"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    />
                  ) : (
                    <Menu
                      className="md:hidden"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    />
                  )}
                </div>
              )}
              {userMenuOpen && (
                <Fragment>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                    {user && (
                      <div className="px-4 py-2 border-b border-app-border">
                        <p className="text-sm font-medium text-zinc-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-zinc-500">{user?.email}</p>
                      </div>
                    )}
                    <div onClick={() => setUserMenuOpen(false)}>
                      {!user && (
                        <Link to="/login" className="dropdown-link">
                          <User size={16} /> Sign In
                        </Link>
                      )}
                      {user && (
                        <Link to="/orders" className="dropdown-link">
                          <Package size={16} /> My Orders
                        </Link>
                      )}
                      {user && (
                        <Link to="/addresses" className="dropdown-link">
                          <MapPin size={16} /> Addresses
                        </Link>
                      )}
                      <Link to="/products" className="dropdown-link md:hidden">
                        <ArrowUpRight size={16} /> Products
                      </Link>
                      <Link to="/deals" className="dropdown-link md:hidden">
                        <ArrowUpRight size={16} /> Deals
                      </Link>
                      {user?.isAdmin && (
                        <Link to="/admin/products" className="dropdown-link">
                          <Shield size={16} className="text-app-orange-dark" />
                          <span className="text-app-orange-dark">
                            Admin Panel
                          </span>
                        </Link>
                      )}
                      {user && (
                        <div className="border-t border-app-border pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors"
                          >
                            <LogOut size={16} /> Log Out
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
