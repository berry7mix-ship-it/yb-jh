import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { BankAccount } from '../types';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export const AccountSection: React.FC = () => {
  const { bankAccounts } = WEDDING_DATA;
  const [openGroom, setOpenGroom] = useState(false);
  const [openBride, setOpenBride] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = async (account: BankAccount) => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopiedAccount(account.accountNumber);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = account.accountNumber;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedAccount(account.accountNumber);
      setTimeout(() => setCopiedAccount(null), 2000);
    }
  };

  const renderAccountList = (accounts: BankAccount[]) => (
    <div className="divide-y divide-[#EFE9DF] bg-white rounded-xl border border-[#ECE5DB] overflow-hidden mt-3">
      {accounts.map((acc, index) => {
        const isCopied = copiedAccount === acc.accountNumber;
        return (
          <div key={index} className="p-4 text-left">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] px-1.5 py-0.5 rounded-sm bg-[#FAF6F0] text-[#8C7D70] font-serif-kr">
                    {acc.relationship}
                  </span>
                  <span className="font-serif-kr font-medium text-sm text-[#3E3835]">
                    {acc.holder}
                  </span>
                </div>
                <p className="font-montserrat text-xs text-[#6B5E53] mt-1 tracking-tight">
                  {acc.bank} <span className="font-medium text-[#2E2824]">{acc.accountNumber}</span>
                </p>
              </div>

              <button
                id={`btn-copy-${acc.relationship}-${index}`}
                onClick={() => copyToClipboard(acc)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-serif-kr transition-colors ${
                  isCopied
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-[#F9F7F2] text-[#6B5E53] border border-[#E3DCD1] hover:bg-[#EFECE5]'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>복사됨</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#8A7B70]" />
                    <span>복사</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="section-account" className="w-full bg-[#FAF8F5] py-16 px-6 text-center border-b border-[#EFEBE4]">
      <div className="max-w-md mx-auto">
        <span className="font-montserrat tracking-[0.25em] text-[11px] text-[#A6998A] uppercase font-medium">
          Account
        </span>
        <h2 className="font-serif-kr text-xl text-[#3A332C] mt-2 mb-2 font-normal tracking-wide">
          마음 전하실 곳
        </h2>
        <p className="font-serif-kr text-xs text-[#7A6F64] leading-relaxed mb-8 px-4 text-center">
          참석이 어려워 직접 축하를 전하지 못하시는 분들을 위해<br />
          계좌번호를 기재하였습니다.<br />
          너그러운 마음으로 양해 부탁드립니다.
        </p>

        {/* Groom Side Accordion */}
        <div className="mb-3.5">
          <button
            id="btn-accordion-groom"
            onClick={() => setOpenGroom((prev) => !prev)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-white border border-[#E6DFD4] shadow-xs text-left transition-colors hover:bg-[#FCFAF7]"
          >
            <span className="font-serif-kr text-sm font-medium text-[#3E3835]">
              신랑측 계좌번호 보기
            </span>
            {openGroom ? (
              <ChevronUp className="w-4 h-4 text-[#8A7B70]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#8A7B70]" />
            )}
          </button>
          {openGroom && renderAccountList(bankAccounts.groom)}
        </div>

        {/* Bride Side Accordion */}
        <div className="mb-6">
          <button
            id="btn-accordion-bride"
            onClick={() => setOpenBride((prev) => !prev)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-white border border-[#E6DFD4] shadow-xs text-left transition-colors hover:bg-[#FCFAF7]"
          >
            <span className="font-serif-kr text-sm font-medium text-[#3E3835]">
              신부측 계좌번호 보기
            </span>
            {openBride ? (
              <ChevronUp className="w-4 h-4 text-[#8A7B70]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#8A7B70]" />
            )}
          </button>
          {openBride && renderAccountList(bankAccounts.bride)}
        </div>
      </div>
    </section>
  );
};
