import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, BookOpen, Home } from 'lucide-react';

const PAGES = [
  {
    title: "Introduction",
    content: "What is cryptocurrency? And what is the relationship between Bitcoin and Verse Token? This chapter introduces the basic idea of digital money and how Bitcoin and Verse Token are connected in the crypto ecosystem."
  },
  {
    title: "Topics We Will Learn",
    content: "In this book we will learn in detail:<br/><br/>• What is Cryptocurrency?<br/>• What are Bitcoin and Verse Tokens?<br/>• Relationship between Bitcoin and Verse Token<br/>• What is Blockchain?<br/>• How Crypto is traded, deposited and stocked (held)<br/><br/>Each topic will be explained step by step in simple language."
  },
  {
    title: "What is Cryptocurrency?",
    content: "Cryptocurrency is a form of digital money that does not exist physically. You cannot touch it like paper money or coins, but it still has real market value.<br/><br/>Just like we use money to buy goods and services, we can also use cryptocurrency for transactions. The difference is that it exists only in digital form.<br/><br/>It is created using encryption algorithms which make it secure and hard to hack.<br/><br/>Cryptocurrency is decentralized, meaning no central bank or government controls it. Instead, it runs on a distributed network of computers.<br/><br/>The idea of digital currency started in 1983 by David Chaum, and later improved in 1995. In 2009, Satoshi Nakamoto launched Bitcoin, the first real cryptocurrency in the world.<br/><br/>Today Bitcoin is the most popular and valuable cryptocurrency in the world."
  },
  {
    title: "What are Bitcoin and Verse Tokens?",
    content: "Bitcoin is a virtual digital currency created by Satoshi Nakamoto in 2009. It is different from traditional money because it is not controlled by any bank or government.<br/><br/>Bitcoin transactions happen directly between users through a system called peer-to-peer network. No middleman like bank or credit card company is needed.<br/><br/>On the other hand, Verse Token is a reward token from the Bitcoin.com ecosystem. It was launched in December 2022.<br/><br/>Verse is designed to support decentralized finance (DeFi) and gives users rewards for participating in the ecosystem.<br/><br/>Users can earn Verse tokens through tasks, staking, and various activities inside the Bitcoin.com platform."
  },
  {
    title: "Relationship between Bitcoin and Verse Token",
    content: "Bitcoin and Verse Token are closely connected within the same ecosystem.<br/><br/>Bitcoin is the main cryptocurrency, while Verse Token supports the Bitcoin.com ecosystem by providing rewards and incentives.<br/><br/>Verse increases user engagement by allowing people to earn tokens through daily tasks, quests, and staking activities.<br/><br/>This reward system helps more people join the ecosystem and use Bitcoin.com wallet services.<br/><br/>So we can say Verse Token strengthens Bitcoin.com ecosystem and increases its popularity globally."
  },
  {
    title: "What is Blockchain?",
    content: "Blockchain is a digital technology used to store data securely in a chain of blocks.<br/><br/>Each block contains transaction information, and once added, it cannot be easily changed or deleted.<br/><br/>👍 Benefits of Blockchain:<br/>• Very secure and hard to hack<br/>• Transparent system where anyone can verify transactions<br/>• No need for middleman<br/>• Works globally without borders<br/><br/>👎 Limitations:<br/>• Hard for beginners to understand<br/>• Can be slow in some systems<br/>• Once a wrong transaction is made, it is difficult to reverse<br/>• Requires high energy in some networks<br/><br/>🎯 In short, blockchain is a powerful technology that ensures security and transparency in digital transactions."
  },
  {
    title: "How Crypto is Traded, Deposited and Held",
    content: "Cryptocurrency is traded using exchange platforms or wallet apps. First, a user creates an account, verifies identity, and then can buy crypto using money.<br/><br/>To sell crypto, users can exchange it back into local currency and withdraw it to bank or mobile wallet.<br/><br/>Depositing crypto means sending crypto into your wallet from another wallet or exchange.<br/><br/>Holding or staking crypto means keeping it for a long time instead of selling immediately.<br/><br/>People hold crypto because prices may increase in the future, creating profit opportunities.<br/><br/>Some platforms also offer rewards or interest for staking crypto.<br/><br/>⚠️ Important Warning:<br/>Crypto is risky and many scams exist. Never trust “double money” offers or unknown links. Always protect your private keys and OTP."
  },
  {
    title: "Final Summary",
    content: "Cryptocurrency is a modern financial system that works digitally and globally.<br/><br/>Bitcoin is the first and most popular cryptocurrency, while Verse Token supports the Bitcoin.com ecosystem.<br/><br/>Blockchain is the technology that makes crypto secure and transparent.<br/><br/>Trading, holding, and using crypto requires knowledge and safety awareness.<br/><br/>Always avoid scams and use trusted platforms only."
  }
];

export default function BitcoinGuide({ onBack }: { onBack: () => void }) {
  const [current, setCurrent] = useState(0);

  const nextPage = () => {
    if (current < PAGES.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevPage = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-4">
      <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors"
        >
          <Home className="w-4 h-4" /> Back
        </button>
        <div className="text-sm font-medium text-slate-400">
          Page {current + 1} of {PAGES.length}
        </div>
      </div>

      <motion.div 
        key={current}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl min-h-[400px] flex flex-col"
      >
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-green-500" />
            <h2 className="text-3xl font-bold text-green-500 tracking-tight">
              {PAGES[current].title}
            </h2>
          </div>
          
          <div 
            className="text-slate-300 text-lg leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: PAGES[current].content }}
          />
        </div>

        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={prevPage}
            disabled={current === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              current === 0 
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          
          <div className="flex gap-1">
            {PAGES.map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-green-500 w-4' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={current === PAGES.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              current === PAGES.length - 1 
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-slate-950'
            }`}
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <div className="mt-8 text-center text-slate-500 text-sm italic">
        Tip: Use the buttons above to navigate through the guide.
      </div>
    </div>
  );
}
