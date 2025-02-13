import React from "react";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
export function SignUpForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
  };
  return (
    <div className="w-full max-w-md">
      <div className="bg-zinc-900 rounded-lg shadow-lg p-8 border border-zinc-800">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Create account</h1>
          <p className="text-zinc-400 mt-2">Sign up to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Full name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full pl-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your full name"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full pl-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full pl-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Create a password"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password-confirm"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Confirm password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full pl-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Confirm your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-zinc-900"
          >
            Create account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-purple-400 hover:text-purple-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
export default SignUpForm;