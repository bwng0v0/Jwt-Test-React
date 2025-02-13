import React, { useEffect, useState } from "react";
import {
  Search,
  ThumbsUp,
  MessageCircle,
  Share2,
  Filter,
  Lock,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
function BulletinSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-full">
          <div className="h-6 bg-zinc-800 rounded w-3/4 mb-2"></div>
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-zinc-800 rounded w-24"></div>
            <div className="h-4 bg-zinc-800 rounded w-24"></div>
          </div>
        </div>
        <div className="h-6 bg-zinc-800 rounded-full w-24 flex-shrink-0"></div>
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-zinc-800 rounded w-full"></div>
        <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="h-5 bg-zinc-800 rounded w-16"></div>
        <div className="h-5 bg-zinc-800 rounded w-16"></div>
        <div className="h-5 bg-zinc-800 rounded w-16"></div>
      </div>
    </div>
  );
}
export function BulletinPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("bwng0v0");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  const bulletins = [
    {
      id: 1,
      title: "Important Company Update",
      author: "Sarah Johnson",
      date: "2024-01-15",
      content:
        "We're excited to announce our new office location opening next month in downtown...",
      category: "Announcements",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      title: "Team Building Event",
      author: "Mike Peterson",
      date: "2024-01-14",
      content:
        "Join us for our annual team building retreat! This year we're heading to the mountains...",
      category: "Events",
      likes: 45,
      comments: 12,
    },
    {
      id: 3,
      title: "New Project Guidelines",
      author: "Alex Chen",
      date: "2024-01-13",
      content:
        "Please review the updated project guidelines for all upcoming development work...",
      category: "Guidelines",
      likes: 16,
      comments: 5,
    },
  ];
  const renderBulletinContent = (bulletin) => (
    <div
      key={bulletin.id}
      className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">
            {bulletin.title}
          </h2>
          <div className="flex items-center text-sm text-zinc-400">
            <span>{bulletin.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(bulletin.date).toLocaleDateString()}</span>
          </div>
        </div>
        <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full">
          {bulletin.category}
        </span>
      </div>
      <p className="text-zinc-300 mb-6">{bulletin.content}</p>
      <div className="flex items-center space-x-6">
        <button className="flex items-center text-zinc-400 hover:text-purple-400">
          <ThumbsUp className="h-5 w-5 mr-2" />
          <span>{bulletin.likes}</span>
        </button>
        <button className="flex items-center text-zinc-400 hover:text-purple-400">
          <MessageCircle className="h-5 w-5 mr-2" />
          <span>{bulletin.comments}</span>
        </button>
        <button className="flex items-center text-zinc-400 hover:text-purple-400">
          <Share2 className="h-5 w-5 mr-2" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen w-full bg-black">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Demo Project</h1>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="text-white px-4 py-2 rounded-md bg-zinc-800">
                {userName}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                <div
                  className="text-white hover:text-purple-400 px-4 py-2"
                  // onClick={() => setIsLoggedIn(true)}
                >
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
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search bulletins..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="flex gap-4">
            {isLoggedIn && (
              <Link to="/create">
              <div className="flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md">
                <Plus className="h-5 w-5 mr-2" />
                Create
              </div>
              </Link>
            )}
            <button className="flex items-center justify-center px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white hover:bg-zinc-700">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>
        </div>
        <div className="relative">
          {!isLoggedIn && !isLoading && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-lg">
              <div className="text-center bg-zinc-900/80 px-8 py-6 rounded-lg backdrop-blur-sm">
                <Lock className="h-12 w-12 text-zinc-400 mx-auto mb-3" />
                <p className="text-zinc-300 text-lg font-medium">
                  Please login to view bulletins
                </p>
                <p className="text-zinc-400 mt-2">
                  Access to bulletin content is restricted to logged-in users
                </p>
              </div>
            </div>
          )}
          <div
            className={`grid gap-6 ${!isLoggedIn && !isLoading ? "opacity-30" : ""}`}
          >
            {isLoading ? (
              <>
                <BulletinSkeleton />
                <BulletinSkeleton />
                <BulletinSkeleton />
              </>
            ) : (
              bulletins.map(renderBulletinContent)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BulletinPage;
