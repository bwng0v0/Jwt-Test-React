import { useEffect, useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Lock,
  Plus,
  Trash2,
  X,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// 🔹 게시글 타입 정의
interface Post {
  id: number;
  title: string;
  content: string;
  createAt: string;
}

// 🔹 사용자 타입 정의
interface User {
  username: string;
}

// 🔹 삭제 모달 타입 정의
interface DeleteModalState {
  isOpen: boolean;
  postId: number | null;
}

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, isDeleting }: DeleteModalState & {
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Delete Post</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-zinc-300 mb-6">
        해당 글을 삭제하시겠습니까? 삭제된 내용은 복구할 수 없습니다.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-zinc-300 hover:text-white"
            disabled={isDeleting}
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="inline-block animate-pulse">삭제중...</span>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                삭제
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function BulletinSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 animate-pulse">
      <div className="h-6 bg-zinc-800 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-zinc-800 rounded w-full mb-2"></div>
      <div className="h-4 bg-zinc-800 rounded w-5/6 mb-2"></div>
    </div>
  );
}

export function BulletinPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    postId: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // 사용자 인증 정보 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);
  
  // 게시글 데이터 가져오기
  useEffect(() => {
    fetchPosts();
  }, [isLoggedIn]);

  // 사용자 인증 상태 확인 함수 (api/auth/me 사용)
  const checkAuthStatus = async () => {
    try {
      const response = await fetch(
        "https://jwt-production-a8d6.up.railway.app/api/auth/me",
        {
          method: "GET",
          credentials: "include", // HttpOnly 쿠키를 위해 credentials 포함
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUserData(data); // 서버에서 받은 사용자 정보 저장
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 게시글 가져오기 함수
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jwt-production-a8d6.up.railway.app/api/posts",
        {
          method: "GET",
          credentials: "include", // HttpOnly 쿠키를 위해 credentials 포함
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // 로그아웃 처리 함수 (api/auth/logout 사용)
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://jwt-production-a8d6.up.railway.app/api/auth/logout",
        {
          method: "POST",
          credentials: "include", // HttpOnly 쿠키를 위해 credentials 포함
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.ok) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // 게시글 삭제 모달 열기
  const handleDeleteClick = (postId: number) => {
    setDeleteModal({
      isOpen: true,
      postId,
    });
  };

  // 게시글 삭제 처리
  const handleDeleteConfirm = async () => {
    if (!deleteModal.postId) return;
    setIsDeleting(true);
    
    try {
      const response = await fetch(
        `https://jwt-production-a8d6.up.railway.app/api/posts/${deleteModal.postId}`,
        {
          method: "DELETE",
          credentials: "include", // HttpOnly 쿠키를 위해 credentials 포함
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      
      setPosts(posts.filter((post) => post.id !== deleteModal.postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
      setDeleteModal({
        isOpen: false,
        postId: null,
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-black">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Demo Project</h1>
          <div className="flex items-center space-x-4">
            {isLoggedIn && userData ? (
              <>
                <div className="flex items-center space-x-2 text-white px-4 py-2 rounded-md bg-zinc-800">
                  <User className="h-5 w-5 text-zinc-400" />
                  <span>{userData.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-400 px-4 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <div className="text-white hover:text-purple-400 px-4 py-2">
                    Login
                  </div>
                </Link>
                <Link to="/signup">
                  <div className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md">
                    Sign Up
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {isLoggedIn && (
          <div className="mb-6 flex">
            <Link to="/create">
              <div className="flex items-center px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md transition">
                <Plus className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Create</span>
              </div>
            </Link>
          </div>
        )}
        {!isLoggedIn && !isLoading && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-lg">
            <div className="text-center bg-zinc-900/80 px-8 py-6 rounded-lg backdrop-blur-sm">
              <Lock className="h-12 w-12 text-zinc-400 mx-auto mb-3" />
              <p className="text-zinc-300 text-lg font-medium">
                Please login to view posts
              </p>
            </div>
          </div>
        )}
        <div
          className={`grid gap-6 ${!isLoggedIn && !isLoading ? "opacity-30" : ""}`}
        >
          {isFetching ? (
            <>
              <BulletinSkeleton />
              <BulletinSkeleton />
              <BulletinSkeleton />
            </>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">
                      {post.title}
                    </h2>
                    <div className="flex items-center text-sm text-zinc-400">
                      <span>
                        {new Date(post.createAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {isLoggedIn && (
                    <button
                      onClick={() => handleDeleteClick(post.id)}
                      className="text-zinc-500 hover:text-red-400 p-2 hover:bg-zinc-800 rounded-md transition-colors"
                      aria-label="Delete post"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <p className="text-zinc-300 mb-6">{post.content}</p>
                <div className="flex items-center space-x-6">
                  <button className="flex items-center text-zinc-400 hover:text-purple-400">
                    <ThumbsUp className="h-5 w-5 mr-2" />
                    <span>0</span>
                  </button>
                  <button className="flex items-center text-zinc-400 hover:text-purple-400">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span>0</span>
                  </button>
                  <button className="flex items-center text-zinc-400 hover:text-purple-400">
                    <Share2 className="h-5 w-5 mr-2" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-400 text-center">No posts found.</p>
          )}
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        postId={deleteModal.postId}
        onClose={() =>
          setDeleteModal({
            isOpen: false,
            postId: null,
          })
        }
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default BulletinPage;