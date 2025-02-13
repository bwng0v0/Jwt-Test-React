import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
export function CreateBulletinPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Announcements",
  });
  const [showPreview, setShowPreview] = useState(false);
  const categories = ["Announcements", "Events", "Guidelines", "General"];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert("Bulletin created successfully!"); // Replace with proper submission logic
  };
  const PreviewBulletin = () => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">
            {formData.title || "Bulletin Title"}
          </h2>
          <div className="flex items-center text-sm text-zinc-400">
            <span>Sarah Johnson</span>
            <span className="mx-2">•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full">
          {formData.category}
        </span>
      </div>
      <p className="text-zinc-300 mb-6">
        {formData.content || "Bulletin content will appear here..."}
      </p>
    </div>
  );
  return (
    <div className="min-h-screen w-full bg-black">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="text-zinc-400 hover:text-white p-2 rounded-md hover:bg-zinc-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-white">
              Create Bulletin
            </h1>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 text-zinc-400 hover:text-white px-4 py-2 rounded-md hover:bg-zinc-800"
          >
            {showPreview ? (
              <>
                <EyeOff className="h-5 w-5" />
                <span>Hide Preview</span>
              </>
            ) : (
              <>
                <Eye className="h-5 w-5" />
                <span>Show Preview</span>
              </>
            )}
          </button>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Title
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
                placeholder="Enter bulletin title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Category
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
                Content
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
                placeholder="Enter bulletin content"
                required
              />
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
              >
                Publish
              </button>
            </div>
          </form>
          {showPreview && (
            <div className="lg:sticky lg:top-24">
              <h2 className="text-zinc-300 text-sm font-medium mb-4">
                Preview
              </h2>
              <PreviewBulletin />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default CreateBulletinPage;
