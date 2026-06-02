export interface ArticleDetail {
  title: string;
  shortDesc: string;
  introduction: string;
  originHistory: string;
  whenWhyHow: string;
  foundersContributors: string;
  technicalFoundations: string;
  popularityReasons: string;
  benefitsLimitations: {
    benefits: string[];
    limitations: string[];
  };
  realWorldCases: string[];
  beginnerGuide: string;
  advancedAnalysis: string;
}

export interface CategoryData {
  id: string;
  title: string;
  icon: string; // lucide icon name
  shortDesc: string;
  articles: { [key: string]: ArticleDetail };
}

export const CATEGORIES: CategoryData[] = [
  {
    id: "verse-ecosystem",
    title: "Verse Ecosystem",
    icon: "Layers",
    shortDesc: "Understand the DeFi powerhouse, rewards, staking, and the utility token powering Bitcoin.com.",
    articles: {
      "main": {
        title: "The Verse Ecosystem Deep-Dive",
        shortDesc: "An all-in-one guide to Verse Token, its decentralized finance (DeFi) components, utility, and long-term vision.",
        introduction: "The Verse Ecosystem is Bitcoin.com's decentralized application and utility framework. At its core, Verse serves as a gatekeeper and incentive engine for users transitioning from traditional banking to trustless decentralized finance (DeFi). The native utility or reward asset, VERSE token, integrates across multiple platforms—including the Bitcoin.com Wallet, the Verse decentralized exchange (DEX), and decentralized staking and farm portals.",
        originHistory: "Historically, Bitcoin.com was launched in 2015 as a premier gateway to Bitcoin, pioneered by early crypto proponents. As Ethereum and multi-chain DeFi grew, there arose a critical need to offer DeFi utilities safely to millions of wallet users. This led to the conception and development of the Verse Ecosystem, leading up to its official token generation event and launch in December 2022.",
        whenWhyHow: "Verse was launched to solve the 'DeFi entry barrier' problem. Most decentralized applications are intimidating for beginners. Verse bridges this gap by fully integrating a native DEX and yield opportunities directly into a mobile wallet used by over 40 million accounts, streamlining tasks like staking, liquidity provision, and low-fee swappings.",
        foundersContributors: "Developed and curated by standard Web3 innovators at Bitcoin.com—led by industry veterans, software architects, and DeFi researchers committed to democratization of finance.",
        technicalFoundations: "Verse relies heavily on the Ethereum blockchain (ERC-20 standard) and is deployed on Polygon for ultra-fast, cheap secondary transactions. It uses smart contracts audited by top firms (like CertiK) to run features like the Verse DEX (using an Automated Market Maker / AMM protocol similar to Uniswap), automated farming pools, and secure staking locks.",
        popularityReasons: "Its integration with Bitcoin.com's enormous user base catapulted it to popularity. Within weeks of launch, users globally started swapping on the Verse DEX and participating in staking pools, stimulated by real-world token buy-backs and burn programs that manage token supply dynamically.",
        benefitsLimitations: {
          benefits: [
            "Seamless wallet integration with simple UI.",
            "Rewards for learning and completing interactive on-chain quests.",
            "High transaction speeds and minimal fees on the Polygon network layer.",
            "Transparent smart contracts with community-led governance rules."
          ],
          limitations: [
            "Price subject to typical cryptocurrency market volatilities.",
            "Requires basic understanding of Web3 wallets to prevent loss of private credentials."
          ]
        },
        realWorldCases: [
          "Users stake VERSE on the platform to earn continuous APR/Yield in their wallets.",
          "Traders use the Verse DEX to exchange tokens peer-to-peer without centralized exchanges.",
          "Active community members vote on proposals affecting the ecosystem's future development paths."
        ],
        beginnerGuide: "Step 1: Download the Bitcoin.com Wallet. Step 2: Navigate to the 'Verse' or 'DeFi' tab. Step 3: Purchase or swap into VERSE. Step 4: Explore staking pools where you lock VERSE to earn compounding rewards safely without giving up custody of your keys.",
        advancedAnalysis: "From a tokenomics perspective, VERSE features a total supply caps of 210 billion, slowly unlocked over seven years via community distribution smart contracts. The continuous 'buyback & burn' model uses a portion of DEX swap fees to continuously purchase VERSE from open markets and burn them permanently, introducing a deflationary pressure design to balance token utility."
      }
    }
  },
  {
    id: "bitcoin-wallet",
    title: "Bitcoin.com Wallet",
    icon: "Wallet",
    shortDesc: "Master the self-custody wallet. Learn key management, buy/sell, backup, and top-tier security standards.",
    articles: {
      "main": {
        title: "Bitcoin.com Self-Custody Wallet Masterclass",
        shortDesc: "Demystifying non-custodial crypto storage, transaction protocols, backup secrets, and daily usage guide.",
        introduction: "The Bitcoin.com Wallet is a non-custodial software application available on iOS, Android, and web platforms. Non-custodial (or self-custody) means that you, and ONLY you, hold the private cryptographic keys that authorize your cryptocurrency funds. The company, Bitcoin.com, does not store or have access to your money, giving you absolute financial sovereignty.",
        originHistory: "The wallet was first introduced in 2017 to provide an exceptionally fast, reliable, and beginner-friendly home for Bitcoin (BTC) and Bitcoin Cash (BCH). Over time, it expanded multi-chain support to include Ethereum (ETH), Polygon (MATIC), and Avalanche (AVAX), serving as a crucial junction for general Web3 dApps.",
        whenWhyHow: "Created to replace confusing command-line or heavy-desktop crypto interfaces, it was built containing a premium mobile-first philosophy. This allowed users to generate wallets in one tap, send funds around the world globally via QR codes, and retain complete control over their funds without relying on centralized banks.",
        foundersContributors: "Created by developers at Bitcoin.com, with millions of updates continuously pushed by a world-class team of cryptography engineers, mobile specialists, and UI/UX designers globally.",
        technicalFoundations: "The wallet uses BIP-39 mnemonic phrases (seed phrases) consisting of 12 random words to generate your master private keys. It locally encrypts these files on your phone using hardware-level keys (Secure Enclave / KeyStore), meaning your passwords and keys never contact external servers.",
        popularityReasons: "Its simple, clean card layout, integrated swap services, and reliable transaction broadcasts made it one of the most popular crypto self-custody tools globally, exceeding 40 million created wallets as of standard metrics.",
        benefitsLimitations: {
          benefits: [
            "Absolute individual control: No third party can freeze or confiscate your wallet assets.",
            "Multi-chain ecosystem support (such as Bitcoin, Ethereum, and Polygon) in a single screen.",
            "Integrated bridge and token swap capabilities.",
            "Integrated Web3 browser to easily connect to decentralized exchanges and applications."
          ],
          limitations: [
            "If you lose your 12-word recovery phrase, no one can help you recover your digital funds.",
            "Direct user responsibility for securing their device from phishing and malware threats."
          ]
        },
        realWorldCases: [
          "Sending instant payments to suppliers or friends internationally without intermediate wire fees.",
          "Interacting with decentralized lending dApps directly from the in-app Web3 browser.",
          "Instantly buying crypto using credit/debit cards or local bank transfers through reliable checkout ramps."
        ],
        beginnerGuide: "Upon launching the application, tap 'Create New Wallet'. Immediately write down your 12-word backup phrase on clean paper and store it in an secure, hidden location. Never take a screenshot of your recovery phrase or type it anywhere digital to protect yourself from hacking.",
        advancedAnalysis: "The wallet operates on a Hierarchical Deterministic (HD) structure. Under the hood, a singular seed phrase dynamically derives different private-key addresses across distinct blockchain protocols. The application interacts with decentralized network nodes using optimized RPC endpoints to query balances and broadcast cryptographic signatures securely."
      }
    }
  },
  {
    id: "cryptocurrency",
    title: "Cryptocurrency Core",
    icon: "Coins",
    shortDesc: "Learn the fundamentals of digital currencies, from Satoshi Nakamoto's Bitcoin breakthrough to modern utility protocols.",
    articles: {
      "main": {
        title: "Cryptocurrency: The Future of Global Sovereign Value",
        shortDesc: "What cryptocurrency is, how global digital assets derive value, and safe investment strategies.",
        introduction: "A cryptocurrency is a digital, decentralized medium of exchange that utilizes cryptography to verify, execute, and secure transaction blocks on a shared ledger. Unlike paper fiat currencies (like Dollars, Euros, Taka), cryptocurrency lacks central banking backing. Its security and supply schedules are governed by mathematical algorithms, open-source code, and consensus mechanics.",
        originHistory: "Digital currency research began as early as the Cypherpunk movement in the 1980s. Early designs included DigiCash and Hashcash. The transformative breakthrough happened in October 2008 when Satoshi Nakamoto published the Bitcoin Whitepaper, solving the famous 'Double Spending' computer science problem without a third-party server.",
        whenWhyHow: "Bitcoin was launched on January 3, 2009, during a massive global financial crisis. It was built to establish a transparent, scarce, and mathematical currency system that cannot be manipulated, hyper-inflated, or artificially devalued by governments.",
        foundersContributors: "Satoshi Nakamoto (pseudonymous creator) inspired countless developers like Hal Finney, Vitalik Buterin (creator of Ethereum), and thousands of open-source network contributors worldwide.",
        technicalFoundations: "Cryptocurrencies operate on distributed peer-to-peer ledgers. They use asymmetric cryptography (private keys to sign payments, public keys to receive them) and math algorithms to govern coin generation schedules.",
        popularityReasons: "Its exponential price appreciation, trustless global accessibility, and hedge features against hyperinflation in volatile economies propelled cryptocurrency into a multi-trillion dollar asset class.",
        benefitsLimitations: {
          benefits: [
            "Borderless and inclusive—anyone with internet access can open a wallet.",
            "Programmatic scarcity (e.g. Bitcoin's hard cap of 21 million absolute coins).",
            "Extremely high security established by cryptographic principles.",
            "Lower transaction fees for global bulk money movements."
          ],
          limitations: [
            "High price fluctuations can lead to temporary capital risk.",
            "Regulatory uncertainty in various jurisdictions globally.",
            "Complex interfaces that can lead to beginner errors."
          ]
        },
        realWorldCases: [
          "Safe haven asset class in hyper-inflationary countries (such as Venezuela or Argentina).",
          "Decentralized smart payment applications (such as Ethereum stablecoins).",
          "A tool for global peer-to-peer micro-donations and immediate borderless support."
        ],
        beginnerGuide: "Never start by investing money you cannot afford to lose. Begin by learning. Focus on major assets like Bitcoin and Ethereum. Understand the differences between custodial and non-custodial wallets before executing your first transaction safely.",
        advancedAnalysis: "Cryptocurrencies transform money from a liability-based credit ledger into an asset-based utility registry. Proof of Work (such as Bitcoin) uses thermodynamics energy to lock transaction histories, while Proof of Stake uses capital locks to achieve identical decentralized consensus with significantly less energy overhead."
      }
    }
  },
  {
    id: "blockchain",
    title: "Blockchain Technology",
    icon: "GitFork",
    shortDesc: "Decapture the mechanics of trustless chains. Explore blocks, hashes, cryptography, and network consensus.",
    articles: {
      "main": {
        title: "How Blockchains Work: The Engineering of Trust",
        shortDesc: "Explore the internal architecture of distributed ledgers, blocks, cryptographic hashes, and decentralization.",
        introduction: "A blockchain is a shared, immutable database structure that stores chronological transaction records in linked 'blocks'. The database is maintained simultaneously across hundreds of thousands of independent computers globally. This decentralized duplication ensures that no single entity can forge data or alter history without the network immediately catching the fraud.",
        originHistory: "The blueprint of chain-structured cryptographically secured blocks was first proposed in 1991 by researchers Stuart Haber and W. Scott Stornetta. However, it lay mostly dormant until Satoshi Nakamoto integrated it with Proof-of-Work algorithms, creating the first live transaction blockchain in 2009.",
        whenWhyHow: "Traditional databases are centralized, meaning a single administrator can change records or get hacked. Blockchains were developed to provide a database where no single person has administrators power, thereby making records universally trusted, public, and incorruptible.",
        foundersContributors: "Stuart Haber, W. Scott Stornetta, Satoshi Nakamoto, and pioneers in decentralized computing networks continuously improving consensus paradigms.",
        technicalFoundations: "A block consists of a header and transaction data. The header contains its own cryptographic hash, a timestamp, and the unique hash of the previous block (forming the chain). Forging a single transaction would require recalculating all subsequent blocks, which is mathematically impossible under active network security.",
        popularityReasons: "Its revolutionary utility for digital scarcity, automated smart contracts, and decentralized governance became the foundation for everything from financial systems to global supply tracking databases.",
        benefitsLimitations: {
          benefits: [
            "High immutability—records cannot be manipulated retroactively.",
            "Perfect transparency: the entire public ledger can be audited 24/7.",
            "Total elimination of single points of failure.",
            "Provides an environment where counterparty trust is no longer required."
          ],
          limitations: [
            "Scalability: transaction throughput can be limited by decentralized consensus requirements.",
            "Storage overhead: every validator computer must keep a complete record copy of transaction history."
          ]
        },
        realWorldCases: [
          "Tracking agricultural or high-end retail supply lines from farm/origin to retail floor securely.",
          "Verifying digital credentials, collegiate diplomas, and properties deeds securely without central paper archives.",
          "Automating legal or financial actions through programmatic Ethereum smart contracts."
        ],
        beginnerGuide: "Think of a blockchain as a gigantic community Google Sheet. Everyone has a view-only copy of the spreadsheet, and anyone can write a new line to add. But once a line is added, the formula locks/hashes it, making it unchangeable forever.",
        advancedAnalysis: "Mechanistically, block integrity is proved through Cryptographic Hash Functions (like SHA-256). These are one-way math algorithms that convert any input data into a fixed-length string of 64 characters. A minor alteration in the inputs results in a drastically different, unmatching output hash, exposing any bad actor instantly."
      }
    }
  },
  {
    id: "crypto-networks",
    title: "Crypto Networks",
    icon: "Network",
    shortDesc: "Explore transaction validation pipelines, roles of miners vs. validators, nodes, and network scaling solutions.",
    articles: {
      "main": {
        title: "Crypto Networks: Nodes, Miners, and Scalability Protocols",
        shortDesc: "An industrial analysis of proof-of-work, proof-of-stake, validators, gas, and layer-2 scaling solutions.",
        introduction: "A cryptocurrency network is the physical and digital infrastructure of interconnected peer-to-peer computers ('nodes') that execute a blockchain protocol. If a blockchain is a digital ledger, the crypto network is the massive distributed computing community that runs, validates, and processes transactions on that ledger globally.",
        originHistory: "The earliest crypto networks were operated on personal computers in 2009. As mining difficulty increased, networks evolved from CPUs to specialized ASIC hardware, creating global computing networks that consume terawatts of raw energy to secure global assets.",
        whenWhyHow: "Networks exist to continuously achieve distributed consensus. Without a master server, thousands of independent computers must quickly agree on which transactions are valid and which are not. Crypto networks were built using consensus algorithms to resolve conflicts and record data in real-time.",
        foundersContributors: "Maintained by millions of anonymous node operators, validators, mining pools, protocol developers, and server administrators globally.",
        technicalFoundations: "Nodes communicate via TCP/IP protocols to transmit transaction blocks. Proof-of-Work (PoW) relies on computational hardware solving hash puzzles, while Proof-of-Stake (PoS) grants mining/validation rights to accounts holding locked platform tokens.",
        popularityReasons: "Their robust uptime (Bitcoin has maintained virtually 99.99% uptime since inception) and global scale have proved that decentralized networks are safer against hacks than the world's largest corporate mainframes.",
        benefitsLimitations: {
          benefits: [
            "Unmatched cybersecurity—impossible to shut down the system with single point hacks.",
            "Universal global uptime: network is operational 24 hours a day, 365 days a year.",
            "Open participation: anyone can set up a node to verify the ledger independently.",
            "Automated network adjustments through difficulty auto-scalings."
          ],
          limitations: [
            "Congestion issues: popular network activity can spike transaction gas fees.",
            "Latency: taking block times to finalize transaction consensus."
          ]
        },
        realWorldCases: [
          "Decentralized miners using solar fields to power validation servers greenly.",
          "Network validators locking millions of tokens to secure layer-1 networks like Ethereum, Solana, and Polygon.",
          "Layer-2 rollup networks processing thousands of transactions offline and batching them to Layer-1 for security scale."
        ],
        beginnerGuide: "A crypto network is like a democratic global mail system. When you send tokens, you shout your transfer out to the world. Nodes pick up your message, check if your signature matches your balance, pack it into a digital mailtruck (block), and drive it down the chain.",
        advancedAnalysis: "Scaling issues are typically resolved via advanced multi-tiered architectures. Layer-1 blockchains (like standard Ethereum) prioritize maximum decentralization and security, while Layer-2 scaling chains (like Polygon or Arbitrum) perform transactions in milliseconds using Rollup protocols, dramatically lowering transaction overhead."
      }
    }
  },
  {
    id: "web2-web3",
    title: "Web2 vs. Web3",
    icon: "Compass",
    shortDesc: "Understand the evolutionary timeline of the internet. Ownership, platform monopolies, and the rise of the read-write-own web.",
    articles: {
      "main": {
        title: "Web2 vs. Web3: The Decentralization of Internet Ownership",
        shortDesc: "The complete evolutionary comparison: Read-Only, Read-Write, and the new Read-Write-Own internet paradigms.",
        introduction: "Web3 represents the next generation of web technologies, moving from monopoly-dominated client-server architectures to decentralized cryptographic foundations. While Web2 turned the internet into a rich social network owned by centralized giants (Facebook, Google, Apple), Web3 restores digital asset ownership, privacy, and sovereignty directly to end-users via protocols.",
        originHistory: "The internet evolved through three major phases. Web1 (1990-2004) was static, read-only HTML pages. Web2 (2004-present) introduced interactive, user-generated content but concentrated data in centralized corporate silo services. In 2014, Ethereum co-founder Gavin Wood officially coined 'Web3' to describe a server-less, decentralized web based on cryptographic keys.",
        whenWhyHow: "Web3 emerged because Web2 platforms became monopolistic extraction systems. Users became the product, with their privacy constantly harvested for advertising profits. Web3 was built using blockchains to allow peer-to-peer data storage, direct value transfers, and decentralized identities.",
        foundersContributors: "Gavin Wood, Vitalik Buterin, Tim Berners-Lee (Web1 father), and countless open-source developers worldwide.",
        technicalFoundations: "Web3 uses decentralized file storage (IPFS), decentralized domains (.eth, .verse), cryptographic user keys (rather than username/password databases), and decentralized smart contracts to run application logic.",
        popularityReasons: "Its promises of internet freedom, financial democratization, tokenized community economies, and user control over confidential personal data attracted millions of next-generation internet creators.",
        benefitsLimitations: {
          benefits: [
            "True digital ownership: nobody can delete your items, domain names, or tokens.",
            "Censorship-resistant: no centralized platform can permanently ban a user address.",
            "Permissionless payment systems natively built in.",
            "Elimination of password data leaks—login happens securely via cryptographic signatures."
          ],
          limitations: [
            "Poorer user experiences currently compared to seamless Web2 platforms.",
            "Requires user education to prevent key theft and accidental asset losses."
          ]
        },
        realWorldCases: [
          "Signing into a social network platform using your private key directly, keeping complete control of your profile data.",
          "Earning token dividends from protocols based on your direct interaction and content creations.",
          "Forming a Decentralized Autonomous Organization (DAO) to collectively govern community protocol funds without a board of directors."
        ],
        beginnerGuide: "Web1 is Read (you go to a page and read information). Web2 is Read + Write (you go to a page, create an account, upload a photo). Web3 is Read + Write + Own (you log in with a wallet, own your content, and can trade it peer-to-peer).",
        advancedAnalysis: "Essentially, Web3 shifts trust from fallible human institutions to deterministic machine computation. Rather than relying on a company's terms of service agreement, Web3 applications rely on open-source smart contracts that execute exactly as programmed with zero option for unilateral modification."
      }
    }
  },
  {
    id: "digital-communities",
    title: "Digital Communities",
    icon: "Users",
    shortDesc: "Unlock the dynamics of Web3 community-led projects. Telegram management, global cooperation, and community incentive structures.",
    articles: {
      "main": {
        title: "Digital Communities: The Sovereign Wealth of Connected People",
        shortDesc: "Analysis of Web3 decentralized coordination, Telegram/Discord community building, and incentive distribution.",
        introduction: "Digital Communities in the Web3 era are no longer passive lists of social media followers; they are active, sovereign financial and cultural operational groups. Backed by token rewards, shared crypto keys, and decentralized governance tools, modern crypto communities collaborate across global borders to construct software, fund initiatives, and govern vast protocol treasures.",
        originHistory: "Early internet communities were simple email listservs or IRC chatrooms. In Web2, social systems grouped users on platforms that harvested their attention. With the rise of Bitcoin and subsequent protocols, chat apps like Telegram and Discord became the primary war-rooms for developer groups, leading directly to the birth of tokenized governance.",
        whenWhyHow: "Traditional organizations require legal structures, bank accounts, and geographic locations to coordinate capital. Web3 communities were formed to allow people from completely different continents to band together, build value, and coordinate millions of dollars within minutes through simple cryptographic rules.",
        foundersContributors: "Global internet citizens, community moderators, developers, open-source advocates, and DAO organizers.",
        technicalFoundations: "Communities utilize Telegram/Discord for communication, snapshot.org for zero-gas voting proposals, and multisig wallets (like Gnosis Safe) to co-manage community capital vaults securely.",
        popularityReasons: "The capability for anyone to participate in next-generation projects instantly, contribute their design, engineering, or writing skills, and earn liquid tokens directly has redefined modern global labor dynamics.",
        benefitsLimitations: {
          benefits: [
            "Limitless global talent accessibility.",
            "Strong collective alignment using shared token incentives.",
            "Democratic voting systems give every community contributor a real voice.",
            "Resilience—decentralized networks of contributors can keep protocols moving even if a core team leaves."
          ],
          limitations: [
            "Information overload and high noise-to-signal ratios in global chat channels.",
            "Governance execution can be slower due to democratic voting periods."
          ]
        },
        realWorldCases: [
          "The Verse Telegram Community collaborating to share resources and educate beginners on self-custody wallet setups.",
          "DAOs managing multi-million dollar grants proposals to fund open-source Web3 security audits.",
          "Meme-token communities collaborating on viral marketing campaigns that capture internet-scale attention."
        ],
        beginnerGuide: "To join, log into Telegram or Discord and search for vetted, official crypto community channels. Observe guidelines carefully, protect yourself from direct-messages claiming to be support staffs, and start contributing to earn community roles.",
        advancedAnalysis: "The critical innovation of Web3 communities is the alignment of incentives. In traditional companies, users compete with founders for value extraction. In cooperative tokenized web communities, users are also builders, owners, and direct financial beneficiaries, aligning incentives perfectly to drive geometric growth metrics."
      }
    }
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export interface QuizCategory {
  categoryId: string;
  title: string;
  questions: QuizQuestion[];
}

export const QUIZZES: QuizCategory[] = [
  {
    categoryId: "verse-scavenger-ecosystem",
    title: "Verse Ecosystem & Scavenger Hunt",
    questions: [
      {
        id: 1,
        question: "How often does the premier VERSE SCAVENGER HUNT event take place for community members?",
        options: ["Every 24 hours daily", "Every 7 days (সাত দিন পর পর)", "Once a year on anniversary", "In unpredictable interval cycles"],
        correctIdx: 1,
        explanation: "The VERSE Scavenger Hunt is a highly coordinated recurring community competition that takes place every 7 days (সাত দিন পর পর) to reward active users!"
      },
      {
        id: 2,
        question: "At exactly what UTC time does the VERSE Scavenger Hunt event start?",
        options: ["12:00 PM UTC", "6:00 AM UTC (৬:০০ AM UTC)", "11:59 PM UTC", "3:00 AM UTC"],
        correctIdx: 1,
        explanation: "The Verse Scavenger Hunt starts punctually at 6:00 AM UTC every week, allowing global participants to compete simultaneously."
      },
      {
        id: 3,
        question: "What is the maximum token supply cap established for the VERSE utility token?",
        options: ["21 Million tokens", "100 Billion tokens", "210 Billion tokens", "Unlimited dynamic minting"],
        correctIdx: 2,
        explanation: "VERSE features a hard cap of 210 billion tokens, which are distributed over a locked schedules to maintain robust long-term tokenomics."
      },
      {
        id: 4,
        question: "How are clues and updates for completing the VERSE Scavenger Hunt primarily shared?",
        options: ["Through newspapers", "In the official VERSE Telegram Community and Bitcoin.com social channels", "Via encrypted SMS messages", "Only on local TV broadcasts"],
        correctIdx: 1,
        explanation: "Our official Telegram community (t.me/GetVerse) is the primary engine where scavenger hunt clues, guidelines, and community answers are updated live."
      }
    ]
  },
  {
    categoryId: "bitcoin-market-cryptocurrency",
    title: "Bitcoin & Cryptocurrency Markets",
    questions: [
      {
        id: 1,
        question: "How is the market price of Bitcoin (BTC) or other crypto assets universally calculated?",
        options: ["By a fixed corporate bank committee mandate", "By matching real-time buy and sell orders (supply and demand) on global exchange platforms", "A dynamic system based on physical gold bars reserves", "Proprietary formulas kept secret by national treasuries"],
        correctIdx: 1,
        explanation: "Cryptocurrency prices are defined dynamically in real-time by pure peer-to-peer supply and demand forces interacting across open exchange orderbooks."
      },
      {
        id: 2,
        question: "What was Satoshi Nakamoto's core intent when presenting the Bitcoin whitepaper in October 2008?",
        options: ["To replace physical credit card machines", "To construct a scarce, trustless, peer-to-peer electronic cash system free of central server oversight", "To build a database for digital streaming sites", "To help traditional bank institutions raise transaction taxes"],
        correctIdx: 1,
        explanation: "Satoshi intended to provide an incorruptible peer-to-peer cash network governed by mathematical consensus algorithms rather than central bank policies."
      },
      {
        id: 3,
        question: "What happens to cryptocurrency prices when buying demand significantly surpasses available market supply?",
        options: ["The asset price automatically depreciates", "The asset price trends upwards (bullish pressure)", "The blockchain completely pauses all trades", "The ledger deletes existing transaction histories"],
        correctIdx: 1,
        explanation: "Under premium market mechanics, when demand is greater than supply, buy pressures boost the market price of the asset immediately."
      }
    ]
  },
  {
    categoryId: "verse-staking-network",
    title: "Verse Network & Staking Perks",
    questions: [
      {
        id: 1,
        question: "What are the primary benefits or rewards of Staking (ভাস বাস স্টপ / Locking) your VERSE tokens?",
        options: ["You hand complete ownership over to a bank for index funds", "You earn continuous compounding passive APR yields, custom reward bonuses, and lower fees across the DEX", "Your tokens are permanently burned and deleted without returns", "It requires constant high electrical energy consumption from your device"],
        correctIdx: 1,
        explanation: "VERSE Staking (ভাস বাস স্টপ করার উপকারিতা) grants compounding yield rewards dynamically to those who lock assets, reinforcing token stability and rewarding long-term participants!"
      },
      {
        id: 2,
        question: "Across which high-performance block network is VERSE natively deployed to bypass expensive congestion fees?",
        options: ["The Ethereum main chain solely", "The Polygon Network layer", "Litecoin blockchain", "Cardano standard nodes"],
        correctIdx: 1,
        explanation: "While VERSE is built as an Ethereum ERC-20 token, it is fully deployed across the Polygon layer-2 scaling network to guarantee lightning-fast swaps with fraction-of-a-cent gas charges."
      },
      {
        id: 3,
        question: "Which reputable blockchain auditing agency verified the safety of official Verse Decentralized Exchange smart contracts?",
        options: ["National Computing Security", "CertiK", "Federal Blockchain Registry", "None, they are un-audited private algorithms"],
        correctIdx: 1,
        explanation: "To provide absolute confidence and ensure 100% security, the Verse DEX smart contracts are meticulously audited by CertiK, a top-tier security firm."
      }
    ]
  },
  {
    categoryId: "blockchain-web3-pioneers",
    title: "Blockchain & Web2 vs Web3 Frontiers",
    questions: [
      {
        id: 1,
        question: "Which unique philosophy defines the critical shift from Web2 platform monopolies to Web3 networks?",
        options: ["The 'Read-Only' centralized static pages rule", "The 'Read-Write-Own' user-sovereign cryptographic key assets standard", "Requiring official corporate account registrations for simple browsing", "Total central server authority over user portfolios"],
        correctIdx: 1,
        explanation: "Web3 introduces peer-to-peer data storage and self-custody keys, transforming users from simple readers ('Web1') or product generators ('Web2') into sovereign asset owners ('Web3')."
      },
      {
        id: 2,
        question: "What cryptographic mathematically secure concept is used in blockchain to form bulletproof, tamper-proof block links?",
        options: ["Simple SQL password hashing", "One-way cryptographic hash functions (such as SHA-256)", "Multi-level email two-factor confirmations", "Digital watermark pictures"],
        correctIdx: 1,
        explanation: "One-way cryptographic hash functions (such as SHA-256) generate deterministic block link signatures. Altering any single transaction instantly changes the hash, exposing fraud network-wide."
      },
      {
        id: 3,
        question: "If a major Web3 dApp developer's private company website goes down, what happens to your tokens?",
        options: ["Your tokens are wiped out permanently", "Nothing, your assets are securely recorded on the public decentralized blockchain ledger, accessible via your self-custody wallet", "You must call a support hotline to transfer them manually", "Your identity keys are cancelled"],
        correctIdx: 1,
        explanation: "Because Web3 operates on distributed decentralized networks rather than central server databases, your funds are permanently secure on-chain as long as you guard your recovery phrase."
      }
    ]
  }
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "f1",
    category: "Wallet",
    question: "How do I secure my non-custodial Bitcoin.com wallet?",
    answer: "To secure your wallet: 1. Set up biometrics (FaceID/Fingerprint) and a strong PIN code. 2. Instantly backup your master seed phrase (12 words) on paper. 3. Lock that paper inside an offline safe. 4. Never share this seed phrase with anyone—no official from Bitcoin.com or support will ever ask for your keys."
  },
  {
    id: "f2",
    category: "Verse",
    question: "What can I do with VERSE Token in the ecosystem?",
    answer: "VERSE can be used to pay transaction gas under specific Polygon integrations, stake on farming pools to earn continuous rewards, participate in decentralized voting, unlock exclusive tier permissions, and use inside decentralized apps directly connected through the wallet browser."
  },
  {
    id: "f3",
    category: "Blockchain",
    question: "What is gas and why do blockchain transactions require it?",
    answer: "Gas refers to the computing unit fee paid to miners or validators on decentralize networks to process and book your transaction into the shared immutable blockchain database. It prevents spam campaigns and funds the global energy/infrastructure run by nodes."
  },
  {
    id: "f4",
    category: "Web3",
    question: "Is Web3 truly secure, or can standard accounts be easily modified?",
    answer: "The decentralized protocols themselves are virtually immutable due to widespread peer consensus networks. It cannot be altered unilaterally. However, user-level points (key management, phishing links, typing seed phrases) are where compromise occurs. Safe security habits are vital."
  }
];

export interface TermDefinition {
  term: string;
  category: string;
  definition: string;
  example: string;
}

export const GLOSSARY: TermDefinition[] = [
  {
    term: "Non-Custodial (Self-Custody)",
    category: "Wallet",
    definition: "A system type where keys and funds remain under absolute ownership of the individual user rather than an intermediate bank or cooperative trust exchange.",
    example: "The Bitcoin.com Wallet acts under non-custodial standards. You hold the seed, so no company can ever lock your capital."
  },
  {
    term: "DEX (Decentralized Exchange)",
    category: "DeFi",
    definition: "A peer-to-peer online marketplace where digital currency exchanges/swaps occur directly between traders without a central middleman broker.",
    example: "Verse DEX uses smart contracts and liquidity pools to let users swap Polygon and Ethereum assets immediately."
  },
  {
    term: "Smart Contract",
    category: "Blockchain",
    definition: "A self-executing computer algorithm with the terms of agreement between transactors written directly into line codes across the blockchain.",
    example: "Liquidity staking pools and agricultural farms are automatically distributed by public smart codes without human supervision."
  },
  {
    term: "Cryptographic Hash",
    category: "Security",
    definition: "A mathematical one-way function that maps any size data file into a fixed size string of alphanumeric characters, serving as an immutable signature.",
    example: "SHA-256 transforms a transaction info file into a distinct lock code. If a single comma is changed, the hash is invalidated, alerting validators."
  },
  {
    term: "DAO (Decentralized Autonomous Org)",
    category: "Communities",
    definition: "A community platform governed by decentralized smart contract algorithms, allowing members holding native protocol tokens to vote on projects pathways.",
    example: "Developing new incentives, distributing grants, or adding community pools can be voted on snapshot dashboards by VERSE holders."
  },
  {
    term: "Mnemonic Seed Phrase",
    category: "Wallet",
    definition: "A sequence of 12 or 24 random readable words that can reconstruct all security private keys bound to a crypto wallet address.",
    example: "Losing your hardware device is harmless if you can enter your 12-word mnemonic phrase in a brand-new Bitcoin.com Wallet."
  },
  {
    term: "Web3",
    category: "Internet",
    definition: "The next-generation protocol structure of internet technologies shifting power back to consumers through the Read-Write-Own philosophy.",
    example: "Sign-in portals using digital crypto wallets instead of inputting personal emails and passwords."
  }
];

export interface LearningPathNode {
  id: string;
  title: string;
  tier: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  description: string;
  status: "locked" | "available" | "completed";
  summaryText: string;
}

export const LEARNING_PATHWAYS: LearningPathNode[] = [
  {
    id: "lp-1",
    title: "1. The Digital Sovereign Genesis",
    tier: "Beginner",
    category: "Cryptocurrency",
    description: "Discover what money is, peer-to-peer transaction principles, and read how Satoshi Nakamoto introduced digital scarcity in 2009.",
    status: "available",
    summaryText: "You will discover that fiat money relies completely on debt systems. Cryptocurrency shifts focus to decentralized open-source programs that maintain finite supply limits, securing your ownership against infinite hyperinflation."
  },
  {
    id: "lp-2",
    title: "2. Setting Up Your Fortress",
    tier: "Beginner",
    category: "Wallet",
    description: "Learn safe wallet installation, secure seed phrase creation, block level backup standards, and complete safe peer payments.",
    status: "available",
    summaryText: "During this node, you master device-level encryption, writing down mnemonics under zero camera detection, executing public address checkups, and dispatching your first crypto asset and token blocks completely peer-to-peer."
  },
  {
    id: "lp-3",
    title: "3. Decentralized Consensus & Blocks",
    tier: "Intermediate",
    category: "Blockchain",
    description: "Discover how hashing secure block elements, miners or validators block consensus, and how decentralization operates legally and technically.",
    status: "available",
    summaryText: "You learn that consensus stops double-spend attacks. Independent global systems must mathematically compete or check each block integrity before booking transactions permanently onto an immutable public register."
  },
  {
    id: "lp-4",
    title: "4. Entering the DeFi Universe (Verse)",
    tier: "Intermediate",
    category: "Verse Ecosystem",
    description: "Step into yield-bearing protocol layers. Understand how Automated Market Makers allow swaps, and explore high APR staking protocols.",
    status: "available",
    summaryText: "Rather than paying high broker percentages, traders share liquidity pools directly. Lenders put collateral directly into verified open pool codes, harvesting passive yield from standard DEX volumes directly."
  },
  {
    id: "lp-5",
    title: "5. Transitioning from Web2 to Web3",
    tier: "Advanced",
    category: "Web2 & Web3",
    description: "Compare classic social engines with peer networks. Implement dApp sign-ins and explore file storage systems without third party companies.",
    status: "available",
    summaryText: "We analyze Gavin Wood's mastervision. Users no longer request databases to access their files. Decentralized names (.verse) and IPFS secure global publishing profiles where users hold complete ownership of content feeds."
  },
  {
    id: "lp-6",
    title: "6. Building and Running a Global DAO",
    tier: "Advanced",
    category: "Digital Communities",
    description: "Unveil Telegram governance architectures, token incentives, community reward quests, and digital democracy code structures.",
    status: "available",
    summaryText: "The pinnacle of decentralized coordination. Study how capital treasury vaults run via multisig protocols where every node and token-holder helps guide digital community initiatives using smart voting algorithms."
  }
];
