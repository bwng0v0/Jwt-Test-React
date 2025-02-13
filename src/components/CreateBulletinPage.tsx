import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CreateBulletinPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "공지사항",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ["공지사항", "이벤트", "가이드라인", "일반"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("게시글을 작성하려면 로그인해야 합니다.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://wide-dulcea-bwng0v0-c69673af.koyeb.app/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ 토큰 추가
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
        }),
      });

      if (!response.ok) {
        throw new Error("게시글을 생성하는 데 실패했습니다.");
      }

      navigate("/"); // ✅ 게시글 목록 페이지로 이동
    } catch (error) {
      setError("게시글을 생성하는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const PreviewBulletin = () => {
    const storedUsername = localStorage.getItem("username") || "익명"; // ✅ 로컬에서 username 가져오기

    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">
              {formData.title || "게시글 제목"}
            </h2>
            <div className="flex items-center text-sm text-zinc-400">
              <span>{storedUsername}</span> {/* ✅ 유저명 적용 */}
              <span className="mx-2">•</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full">
            {formData.category}
          </span>
        </div>
        <p className="text-zinc-300 mb-6">
          {formData.content || "여기에 게시글 내용이 표시됩니다..."}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-black">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="text-zinc-400 hover:text-white p-2 rounded-md hover:bg-zinc-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-white">게시글 작성</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500">{error}</p>} {/* 오류 메시지 표시 */}

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                제목
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="게시글 제목을 입력하세요"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                카테고리
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                내용
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: e.target.value,
                  })
                }
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[200px]"
                placeholder="게시글 내용을 입력하세요"
                required
              />
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-zinc-300 hover:text-white"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
              >
                {loading ? "게시 중..." : "게시하기"}
              </button>
            </div>
          </form>

          {/* ✅ 미리보기 항상 표시 */}
          <div className="lg:sticky lg:top-24">
            <h2 className="text-zinc-300 text-sm font-medium mb-4">
              미리보기
            </h2>
            <PreviewBulletin />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBulletinPage;
