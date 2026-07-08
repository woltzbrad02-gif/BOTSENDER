'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Copy, Trash2, Moon, Sun, Plus } from 'lucide-react';

interface BotConfig {
  id: string;
  token: string;
  chatId: string;
  name: string;
}

export default function Page() {
  const [bots, setBots] = useState<BotConfig[]>([]);
  const [newBotToken, setNewBotToken] = useState('');
  const [newChatId, setNewChatId] = useState('');
  const [newBotName, setNewBotName] = useState('');
  const [message, setMessage] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('telegramBotSender');
    if (saved) {
      const data = JSON.parse(saved);
      setBots(data.bots || []);
      setIsDark(data.isDark || false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('telegramBotSender', JSON.stringify({ bots, isDark }));
  }, [bots, isDark]);

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

  const addBot = () => {
    if (!newBotToken.trim()) {
      setStatus({ type: 'error', text: 'Please enter a bot token' });
      return;
    }
    if (!newChatId.trim()) {
      setStatus({ type: 'error', text: 'Please enter a chat ID' });
      return;
    }

    const newBot: BotConfig = {
      id: Date.now().toString(),
      token: newBotToken,
      chatId: newChatId,
      name: newBotName || `Bot ${bots.length + 1}`,
    };

    setBots([...bots, newBot]);
    setNewBotToken('');
    setNewChatId('');
    setNewBotName('');
    setStatus({ type: 'success', text: 'Bot added successfully!' });
    setTimeout(() => setStatus({ type: null, text: '' }), 2000);
  };

  const removeBot = (id: string) => {
    setBots(bots.filter(bot => bot.id !== id));
    setStatus({ type: 'success', text: 'Bot removed' });
    setTimeout(() => setStatus({ type: null, text: '' }), 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setStatus({ type: 'success', text: 'Copied!' });
    setTimeout(() => setStatus({ type: null, text: '' }), 2000);
  };

  const sendMessageToAllBots = async () => {
    if (bots.length === 0) {
      setStatus({ type: 'error', text: 'Please add at least one bot' });
      return;
    }
    if (!message.trim()) {
      setStatus({ type: 'error', text: 'Please enter a message' });
      return;
    }

    setIsLoading(true);
    let successCount = 0;
    let failureCount = 0;

    for (const bot of bots) {
      try {
        const response = await fetch(`https://api.telegram.org/bot${bot.token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: bot.chatId, text: message }),
        });

        const data = await response.json();
        if (data.ok) {
          successCount++;
        } else {
          failureCount++;
        }
      } catch (error) {
        failureCount++;
      }
    }

    setIsLoading(false);
    if (failureCount === 0) {
      setStatus({ type: 'success', text: `Message sent to all ${successCount} bot(s)!` });
      setMessage('');
      autoExpandTextarea();
    } else {
      setStatus({ type: 'error', text: `Sent: ${successCount}, Failed: ${failureCount}` });
    }
    setTimeout(() => setStatus({ type: null, text: '' }), 3000);
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
        <main className="flex-1 py-8 px-4">
          <div className="w-full max-w-3xl mx-auto">
            <div className={`rounded-2xl shadow-xl backdrop-blur-sm p-8 border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white/90 border-blue-200'}`}>
              {/* Bot Configuration Section */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Manage Bots</h2>
                <div className={`p-4 rounded-lg border ${isDark ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="grid gap-3 md:grid-cols-3 md:gap-2 mb-3">
                    <input
                      type="text"
                      value={newBotName}
                      onChange={(e) => setNewBotName(e.target.value)}
                      placeholder="Bot name (e.g., 'News Bot')"
                      className={`px-3 py-2 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                        isDark
                          ? 'bg-slate-600 border-slate-500 focus:ring-blue-500 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                    <input
                      type="password"
                      value={newBotToken}
                      onChange={(e) => setNewBotToken(e.target.value)}
                      placeholder="Bot token"
                      className={`px-3 py-2 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                        isDark
                          ? 'bg-slate-600 border-slate-500 focus:ring-blue-500 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                    <input
                      type="text"
                      value={newChatId}
                      onChange={(e) => setNewChatId(e.target.value)}
                      placeholder="Chat ID"
                      className={`px-3 py-2 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                        isDark
                          ? 'bg-slate-600 border-slate-500 focus:ring-blue-500 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>
                  <button
                    onClick={addBot}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm ${
                      isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Add Bot
                  </button>
                </div>
              </div>

              {/* Saved Bots List */}
              {bots.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold mb-3">Connected Bots ({bots.length})</h3>
                  <div className="space-y-2">
                    {bots.map((bot) => (
                      <div
                        key={bot.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          isDark ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{bot.name}</p>
                          <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            ID: {bot.chatId}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-2">
                          <button
                            onClick={() => copyToClipboard(bot.chatId)}
                            className={`p-2 rounded transition-all ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
                            title="Copy Chat ID"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeBot(bot.id)}
                            className={`p-2 rounded transition-all ${isDark ? 'text-red-400 hover:bg-red-900/30' : 'text-red-600 hover:bg-red-100'}`}
                            title="Remove bot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                  onClick={sendMessageToAllBots}
                  disabled={isLoading || bots.length === 0}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={bots.length === 0 ? 'Add at least one bot first' : `Send to ${bots.length} bot(s)`}
                >
                  {isLoading ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                  {isLoading ? 'Sending...' : `Send to All (${bots.length})`}
                </button>
                <button
                  onClick={() => {
                    setMessage('');
                    autoExpandTextarea();
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                  title="Clear message"
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
