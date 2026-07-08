'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Copy, Trash2, Moon, Sun } from 'lucide-react';

export default function Page() {
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [message, setMessage] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('telegramBotSender');
    if (saved) {
      const data = JSON.parse(saved);
      setBotToken(data.botToken || '');
      setChatId(data.chatId || '');
      setIsDark(data.isDark || false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('telegramBotSender', JSON.stringify({ botToken, chatId, isDark }));
  }, [botToken, chatId, isDark]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const autoExpandTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(chatId);
    setStatus({ type: 'success', text: 'Chat ID copied!' });
    setTimeout(() => setStatus({ type: null, text: '' }), 2000);
  };

  const sendMessage = async () => {
    if (!botToken.trim()) {
      setStatus({ type: 'error', text: 'Please enter your bot token' });
      return;
    }
    if (!chatId.trim()) {
      setStatus({ type: 'error', text: 'Please enter chat ID' });
      return;
    }
    if (!message.trim()) {
      setStatus({ type: 'error', text: 'Please enter a message' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });

      const data = await response.json();
      if (data.ok) {
        setStatus({ type: 'success', text: 'Message sent successfully!' });
        setMessage('');
        autoExpandTextarea();
      } else {
        setStatus({ type: 'error', text: `Error: ${data.description}` });
      }
    } catch (error) {
      setStatus({ type: 'error', text: 'Network error. Check your connection.' });
    }
    setIsLoading(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'}`}>
      <style>{`
        * { box-sizing: border-box; }
        ::selection { background: ${isDark ? '#3b82f6' : '#dbeafe'}; color: ${isDark ? '#fff' : '#1e40af'}; }
      `}</style>

      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className={`border-b backdrop-blur-md ${isDark ? 'border-slate-800 bg-slate-900/80' : 'border-blue-200 bg-white/80'}`}>
          <div className="max-w-2xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <Send className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Telegram Bot Sender</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Send messages instantly via Telegram Bot API</p>
              </div>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-blue-100 hover:bg-blue-200'}`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center py-8 px-4">
          <div className="w-full max-w-2xl">
            <div className={`rounded-2xl shadow-xl backdrop-blur-sm p-8 border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white/90 border-blue-200'}`}>
              {/* Bot Token */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Bot Token</label>
                <input
                  type="password"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  placeholder="123456:ABCdefGHIjklmnoPQRstuvWXYZ"
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                    isDark
                      ? 'bg-slate-700 border-slate-600 focus:ring-blue-500 text-white placeholder-gray-500'
                      : 'bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>

              {/* Chat ID */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Chat ID</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    placeholder="e.g., 123456789"
                    className={`flex-1 px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                      isDark
                        ? 'bg-slate-700 border-slate-600 focus:ring-blue-500 text-white placeholder-gray-500'
                        : 'bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold">Message</label>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{message.length} / 4096</span>
                </div>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    autoExpandTextarea();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !e.nativeEvent.isComposing) {
                      sendMessage();
                    }
                  }}
                  placeholder="Type your message here... (Ctrl+Enter to send)"
                  maxLength={4096}
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 resize-none ${
                    isDark
                      ? 'bg-slate-700 border-slate-600 focus:ring-blue-500 text-white placeholder-gray-500'
                      : 'bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-400'
                  }`}
                  style={{ minHeight: '120px', maxHeight: '200px' }}
                />
              </div>

              {/* Status Message */}
              {status.type && (
                <div className={`mb-6 p-3 rounded-lg text-sm font-medium transition-all ${
                  status.type === 'success'
                    ? isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'
                    : isDark ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800'
                }`}>
                  {status.text}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={sendMessage}
                  disabled={isLoading}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
                <button
                  onClick={() => {
                    setMessage('');
                    autoExpandTextarea();
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
