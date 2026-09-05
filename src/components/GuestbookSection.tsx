import React, { useState, useEffect } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { GuestbookEntry } from '../types';
import { MessageSquare, Send, Trash2, Heart } from 'lucide-react';

export const GuestbookSection: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  // Load from local storage or fallback to initial
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_guestbook');
      if (saved) {
        setEntries(JSON.parse(saved));
      } else {
        setEntries(WEDDING_DATA.initialGuestbook);
        localStorage.setItem('wedding_guestbook', JSON.stringify(WEDDING_DATA.initialGuestbook));
      }
    } catch {
      setEntries(WEDDING_DATA.initialGuestbook);
    }
  }, []);

  const saveEntries = (newEntries: GuestbookEntry[]) => {
    setEntries(newEntries);
    try {
      localStorage.setItem('wedding_guestbook', JSON.stringify(newEntries));
    } catch {
      // Ignore
    }
  };

  const handleAddMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      name: name.trim(),
      password: password.trim() || '1234',
      message: message.trim(),
      createdAt: formattedDate,
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);

    setName('');
    setPassword('');
    setMessage('');
  };

  const handleDelete = (id: string) => {
    const target = entries.find((e) => e.id === id);
    if (!target) return;

    if (target.password && deletePassword !== target.password && deletePassword !== 'admin1234') {
      setDeleteError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const updated = entries.filter((e) => e.id !== id);
    saveEntries(updated);
    setDeleteTargetId(null);
    setDeletePassword('');
    setDeleteError('');
  };

  return (
    <section id="section-guestbook" className="w-full bg-white py-16 px-6 text-center border-b border-[#EFEBE4]">
      <div className="max-w-md mx-auto">
        <span className="font-montserrat tracking-[0.25em] text-[11px] text-[#A6998A] uppercase font-medium">
          Guestbook
        </span>
        <h2 className="font-serif-kr text-xl text-[#3A332C] mt-2 mb-2 font-normal tracking-wide">
          방명록
        </h2>
        <p className="font-serif-kr text-xs text-[#7A6F64] mb-8">
          신랑·신부에게 따뜻한 축하의 메시지를 남겨주세요
        </p>

        {/* Input Form */}
        <form onSubmit={handleAddMessage} className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-[#ECE5DB] shadow-xs text-left mb-8 font-serif-kr">
          <div className="grid grid-cols-2 gap-2.5 mb-2.5">
            <div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="작성자 이름"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3DCD1] text-xs text-[#3E3835] focus:outline-none focus:border-[#8A7B70]"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호(삭제용)"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3DCD1] text-xs text-[#3E3835] focus:outline-none focus:border-[#8A7B70]"
              />
            </div>
          </div>

          <div className="mb-3">
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="축하의 메시지를 남겨주세요 :)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E3DCD1] text-xs text-[#3E3835] focus:outline-none focus:border-[#8A7B70] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#8A7B70] text-white text-xs font-medium hover:bg-[#786A60] transition-colors shadow-2xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>축하 메시지 등록</span>
          </button>
        </form>

        {/* Messages List */}
        <div className="space-y-3 text-left">
          {entries.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#998C7F] font-serif-kr">
              첫 번째 축하 메시지를 남겨주세요!
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE5DB] relative group font-serif-kr"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3 h-3 text-[#C5A880] fill-[#C5A880]" />
                    <span className="font-medium text-xs text-[#3E3835]">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#A69B8F] font-montserrat">{entry.createdAt}</span>
                    <button
                      id={`btn-delete-gb-${entry.id}`}
                      onClick={() => {
                        setDeleteTargetId(entry.id);
                        setDeleteError('');
                        setDeletePassword('');
                      }}
                      className="text-[#B3A79A] hover:text-[#C45E5E] transition-colors p-0.5"
                      title="메시지 삭제"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#5C5045] leading-relaxed whitespace-pre-line">
                  {entry.message}
                </p>

                {/* Inline Delete Dialog */}
                {deleteTargetId === entry.id && (
                  <div className="mt-3 pt-2.5 border-t border-[#E8E1D7] flex items-center gap-2">
                    <input
                      type="password"
                      placeholder="비밀번호"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="px-2.5 py-1 text-xs rounded-lg border border-[#E3DCD1] bg-white text-[#3E3835] w-24 focus:outline-none"
                    />
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="px-2.5 py-1 text-xs rounded-lg bg-[#C45E5E] text-white hover:bg-[#A84949] transition-colors"
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(null)}
                      className="px-2 py-1 text-xs rounded-lg bg-[#EAE5DC] text-[#6B5E53] hover:bg-[#DFD9CE] transition-colors"
                    >
                      취소
                    </button>
                    {deleteError && (
                      <span className="text-[11px] text-[#C45E5E] ml-1">{deleteError}</span>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
