import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const GalleryAdmin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH PENDING PHOTOS
  const fetchPending = async () => {
    setLoading(true);
    try {
      // "hashingPasswordForBackendAPI" is the password Burhan set
      const res = await axios.post(
        "https://fiestron-2025.onrender.com/api/admin/pending-photos",
        {
          password: password,
        }
      );
      setPhotos(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      alert("Wrong Password!");
    } finally {
      setLoading(false);
    }
  };

  // HANDLE APPROVE / REJECT
  const handleAction = async (id, action) => {
    try {
      await axios.put(
        "https://fiestron-2025.onrender.com/api/admin/update-status",
        {
          password: password,
          photoId: id,
          action: action,
        }
      );

      // Remove from list immediately
      setPhotos((prev) => prev.filter((p) => p._id !== id));
      alert(`Photo ${action} successfully!`);
    } catch (err) {
      alert("Action failed.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 pt-32">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
        GALLERY MODERATION
      </h1>

      {/* 1. AUTHENTICATION SECTION */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto bg-[#111] p-8 rounded-xl border border-white/10">
          <p className="mb-4 text-white/60">
            Enter Admin Password to load pending photos:
          </p>
          <input
            type="password"
            className="w-full p-3 bg-black border border-white/20 rounded-lg text-white mb-4"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={fetchPending}
            disabled={loading}
            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200"
          >
            {loading ? "Loading..." : "Access Dashboard"}
          </button>
        </div>
      ) : (
        /* 2. DASHBOARD SECTION */
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-white/50">
              Pending Requests:{" "}
              <span className="text-white font-bold">{photos.length}</span>
            </h2>
            <button
              onClick={fetchPending}
              className="text-sm underline text-orange-400"
            >
              Refresh List
            </button>
          </div>

          {photos.length === 0 ? (
            <div className="text-center py-20 bg-[#111] rounded-xl border border-white/10">
              <p className="text-2xl">
                🎉 No pending photos! You are all caught up.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <motion.div
                  layout
                  key={photo._id}
                  className="bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col"
                >
                  {/* Image Preview */}
                  <div className="h-64 w-full bg-black relative">
                    <img
                      src={photo.imageUrl}
                      alt="Upload"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                        {photo.eventCategory}
                      </span>
                      <span className="text-xs text-white/40">
                        {new Date(photo.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-white mb-1">
                      {photo.studentName}
                    </h3>
                    <p className="text-xs text-white/60 uppercase tracking-widest mb-4">
                      {photo.contingentName}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-1 p-2 bg-black/50 border-t border-white/10">
                    <button
                      onClick={() => handleAction(photo._id, "rejected")}
                      className="py-3 bg-red-900/20 text-red-400 font-bold text-sm rounded hover:bg-red-900/40 transition-colors"
                    >
                      ✕ REJECT
                    </button>
                    <button
                      onClick={() => handleAction(photo._id, "approved")}
                      className="py-3 bg-green-900/20 text-green-400 font-bold text-sm rounded hover:bg-green-900/40 transition-colors"
                    >
                      ✓ APPROVE
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryAdmin;
