import { Bike, Loader2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link } from "react-router-dom";

import { heroSectionData } from "../assets/assets";

const Login = () => {
  const [loginState, setLoginState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => (window.location.href = "/"), 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
        <img
          src={heroSectionData.hero_image}
          alt="hero img"
          className="absolute inset-0 object-cover h-full bg-center opacity-25"
        />
        <div className="relative text-center px-12">
          <h2 className="text-4xl font-semibold text-white mb-4">
            Welcome back to FreshRoute
          </h2>
          <p className="text-white/60 font-serif text-xl max-w-sm mx-auto">
            Fresh groceries and organic produce, delivered to your doorstep
          </p>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1 flex-center px-4 py-12 bg-app-cream">
        <div className="w-full max-w-md">
          {/* Form header message */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Bike className="size-8 text-app-green" />
              <span className="text-2xl font-semibold text-app-green">
                FreshRoute
              </span>
            </Link>
            <h1 className="text-2xl font-semibold text-app-green mb-2">
              {loginState
                ? "Sign in to your account"
                : "Sign up for an account"}
            </h1>
            <p className="text-sm text-app-text-light">
              {loginState
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                onClick={() => setLoginState(!loginState)}
                className="text-orange-500 ml-1 font-semibold hover:text-orange-600 transition-colors"
              >
                {loginState ? "Create one" : "Sign in"}
              </button>
            </p>
          </div>
          {/* Login/Register form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!loginState && (
              <label className="flex flex-col gap-1 text-sm">
                Name{" "}
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                  />
                </div>
              </label>
            )}
            <label className="flex flex-col gap-1 text-sm">
              E-mail Address{" "}
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                />
              </div>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Password{" "}
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                />
              </div>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="flex-center w-full py-3 bg-green-950 text-white font-semibold rounded-xl hover:bg-green-900 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : loginState ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
