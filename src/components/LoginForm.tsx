import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export function LoginForm() {
  // ✅ 로그인 폼 입력값을 관리하는 state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // ✅ 로그인 요청 상태 (로딩 중, 에러 메시지)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ API 엔드포인트
  const API_URL = "https://wide-dulcea-bwng0v0-c69673af.koyeb.app/api/auth/login";

  // ✅ 로그인 요청 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      // ✅ 로그인 성공: 토큰 저장
      localStorage.setItem("accessToken", data.accessToken);

      // ✅ 로그인 성공 후 페이지 이동 (예: 메인 페이지)
      window.location.href = "/";

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-zinc-900 rounded-lg shadow-lg p-8 border border-zinc-800">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
          <p className="text-zinc-400 mt-2">Please sign in to continue</p>
        </div>

        {/* ✅ 에러 메시지 표시 */}
        {error && (
          <div className="mb-4 text-red-500 text-center text-sm bg-red-900 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="block w-full pl-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">
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
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="block w-full pl-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md shadow-sm placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-zinc-900"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-purple-400 hover:text-purple-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
