import React, { useState } from "react";
import { Lock, User } from "lucide-react";
import { Link } from "react-router-dom";

export function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      console.log("🔹 서버 응답 상태코드:", response.status); // ✅ 상태코드 확인
      let data;
      const contentLength = response.headers.get("content-length"); // ✅ 응답 크기 확인
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json(); // ✅ JSON 파싱 가능할 때만 수행
      } else {
        data = {}; // ✅ 빈 객체 반환하여 JSON 오류 방지
      }
      
      console.log("🔹 서버 응답 데이터:", data); // ✅ 응답 데이터 확인

      if (!response.ok) {
        if (response.status === 400) {
          setError(data.message || "잘못된 요청입니다. 입력값을 확인해주세요.");
        } else if (response.status === 401) {
          setError("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다."); // ✅ 기본 메시지
        } else if (response.status === 403) {
          setError("접근이 거부되었습니다. 관리자에게 문의하세요.");
        } else {
          setError("⚠️ 로그인 실패: 예상치 못한 오류가 발생했습니다.");
        }
        return;
      }

      // ✅ 로그인 성공: 토큰과 username 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("username", formData.username);

      // ✅ 로그인 성공 후 페이지 이동
      window.location.href = "/";
    } catch (err) {
      console.error("로그인 요청 중 오류 발생:", err);
      setError("네트워크 오류: 인터넷 연결을 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-zinc-900 rounded-lg shadow-lg p-8 border border-zinc-800">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Demo Project</h1>
          <p className="text-zinc-400 mt-2">로그인이 필요합니다</p>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-center text-sm bg-red-900 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-zinc-500" />
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
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          계정이 없으신가요?{" "}
          <Link to="/signup" className="font-medium text-purple-400 hover:text-purple-300">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
