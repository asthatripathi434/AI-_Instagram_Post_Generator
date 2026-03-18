import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FaInstagram, FaHeart, FaComment, FaRegHeart, FaPalette } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';

function App() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Casual');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const generatePost = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8000/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone }),
      });
      if (!response.ok) throw new Error('Failed to generate post');
      const data = await response.json();
      setPreview(data.preview);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const postToInstagram = async () => {
    if (!preview) return;
    try {
      const response = await fetch(`http://localhost:8000/post/${preview.id}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to post');
      alert('Posted to Instagram!');
      setPreview(null);
    } catch (err) {
      alert('Error posting: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto px-4 py-8 gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/3 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8 md:mb-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4">
              <BsStars className="text-blue-600 text-2xl mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">AI Agents</h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              <li><span className="font-semibold">Content Agent:</span> Generates captions & hashtags.</li>
              <li><span className="font-semibold">Image Agent:</span> Creates relevant images.</li>
              <li><span className="font-semibold">Post Simulation:</span> Preview & simulate posting.</li>
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Workflow</h3>
            <ol className="list-decimal list-inside text-gray-600 text-sm">
              <li>Enter topic & tone</li>
              <li>Generate post</li>
              <li>Preview & simulate posting</li>
            </ol>
          </div>
        </aside>

        {/* Main Content */}
        <div className="md:w-2/3">
          <header className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BsStars className="text-blue-600 text-3xl mr-3" />
              <h1 className="text-5xl font-extrabold text-gray-800">AI Instagram Post Generator</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              Build a system that generates Instagram posts and simulates posting using AI agents.
            </p>
          </header>

          {!preview ? (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <BsStars className="mr-2 text-blue-500" />
                  Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Beach vacation, Healthy recipes, Tech gadgets"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-gray-700"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaPalette className="mr-2 text-blue-500" />
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 text-gray-700"
                >
                  <option>Casual</option>
                  <option>Professional</option>
                  <option>Humorous</option>
                  <option>Inspirational</option>
                </select>
              </div>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  {error}
                </div>
              )}
              <button
                onClick={generatePost}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  <>
                    <BsStars className="inline mr-2" />
                    Generate Post
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="relative">
                <img src={preview.image_url} alt="Generated" className="w-full h-80 object-cover" />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2">
                  <FaInstagram className="text-pink-500 text-xl" />
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-800 text-lg leading-relaxed mb-4">{preview.caption}</p>
                <p className="text-blue-600 font-medium mb-6">{preview.hashtags.join(" ")}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                      <FaRegHeart className="mr-1" />
                      Like
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                      <FaComment className="mr-1" />
                      Comment
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">Preview</span>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setPreview(null)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-all duration-200 font-semibold"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={postToInstagram}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-xl hover:from-pink-600 hover:to-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                  >
                    <FaInstagram className="inline mr-2" />
                    Post to Instagram
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);