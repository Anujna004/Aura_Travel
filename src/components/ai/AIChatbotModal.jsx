import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Bot, User, Trash2, Lightbulb, RefreshCw, MapPin } from 'lucide-react';
import { useTravel } from '../../context/TravelContext';
import { askGeminiChatbot } from '../../services/geminiService';

export const AIChatbotModal = () => {
  const {
    isChatbotOpen,
    setIsChatbotOpen,
    chatbotTargetDestination,
    setChatbotTargetDestination,
    destinations
  } = useTravel();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const activeDest = chatbotTargetDestination || 'Kashmir Valley';

  // Update conversation when destination context changes
  useEffect(() => {
    if (isChatbotOpen) {
      setMessages([
        {
          id: `welcome-${activeDest}`,
          sender: 'ai',
          text: `Namaste! I am **AURA**, your AI Travel Concierge for Incredible India. \n\nHow can I help you explore **${activeDest}** today? Ask me about top heritage forts, scenic viewpoints, authentic regional delicacies, optimal visiting seasons, or packing tips!`
        }
      ]);
    }
  }, [isChatbotOpen, activeDest]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isChatbotOpen) return null;

  const handleSendMessage = async (customQuery) => {
    const query = customQuery || inputText.trim();
    if (!query || loading) return;

    // Detect if user mentions another destination in their text
    let targetContext = activeDest;
    if (destinations) {
      const mentioned = destinations.find(d => 
        query.toLowerCase().includes(d.name.toLowerCase()) ||
        (d.state && query.toLowerCase().includes(d.state.toLowerCase()))
      );
      if (mentioned) {
        targetContext = mentioned.name;
        if (setChatbotTargetDestination) {
          setChatbotTargetDestination(mentioned.name);
        }
      }
    }

    const userMsg = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const responseText = await askGeminiChatbot(query, targetContext, messages);
      const aiMsg = { id: (Date.now() + 1).toString(), sender: 'ai', text: responseText };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `Here are key travel recommendations for **${targetContext}**: \n\n* **Top Sights**: Visit early in the morning for photography and minimal crowds.\n* **Local Cuisine**: Try regional specialty thalis and street food markets.\n* **Travel Tip**: Pre-book authorized transport for comfortable transfers.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: 'welcome-cleared',
        sender: 'ai',
        text: `Chat history refreshed! Ask me anything about exploring **${activeDest}** or any destination in India.`
      }
    ]);
  };

  const starterPrompts = [
    `Top 3 must-see spots in ${activeDest}?`,
    `Best authentic dishes to eat in ${activeDest}?`,
    `How many days are recommended for ${activeDest}?`,
    `What are the best sunrise viewpoints in ${activeDest}?`
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Floating Drawer Container */}
      <div className="relative w-full max-w-lg h-[92vh] bg-[#0B0F17] rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 glass-nav border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20 shrink-0">
              <Sparkles className="w-5 h-5 fill-slate-950" />
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-white text-base font-heading flex items-center gap-2">
                <span>AURA AI Concierge</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold border border-amber-500/30 shrink-0">
                  Gemini
                </span>
              </h3>
              
              {/* Destination Selector Dropdown inside Chat Header */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <select
                  value={activeDest}
                  onChange={(e) => setChatbotTargetDestination && setChatbotTargetDestination(e.target.value)}
                  className="bg-transparent text-amber-300 text-xs font-semibold border-none outline-none cursor-pointer hover:underline p-0"
                >
                  {(destinations || []).map((d) => (
                    <option key={d.id} value={d.name} className="bg-slate-900 text-white">
                      {d.name} ({d.state || d.continent})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clearChatHistory}
              title="Clear Chat History"
              className="p-2 rounded-xl glass-panel text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsChatbotOpen(false)}
              className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {/* Starter Chips */}
          <div className="space-y-2 mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Suggested Prompts for {activeDest}</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {starterPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-left text-xs px-3 py-1.5 rounded-xl glass-panel-light text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-amber-400 border border-amber-500/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                    : 'glass-panel text-slate-100 border border-white/10 rounded-tl-none shadow-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loading state */}
          {loading && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl glass-panel text-xs text-amber-300 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Consulting Gemini AI travel database...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 glass-nav border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Ask about ${activeDest} or any Indian place...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-900 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="w-11 h-11 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 flex items-center justify-center font-bold transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
