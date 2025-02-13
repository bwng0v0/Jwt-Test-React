import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://wide-dulcea-bwng0v0-c69673af.koyeb.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        alert("Sign-up successful! Redirecting to login...");
        navigate("/"); // 회원가입 성공하면 로그인 페이지로 이동
      } else {
        const data = await response.json();
        setError(data.message || "User already exists.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-zinc-900 rounded-lg shadow-lg p-8 border border-zinc-800">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Create account</h1>
          <p className="text-zinc-400 mt-2">Sign up to get started</p>
        </div>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="block w-full pl-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your username"
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
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Create a password"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Confirm password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full pl-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Confirm your password"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-zinc-900"
          >
            {loading ? "Signing up..." : "Create account"}
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
