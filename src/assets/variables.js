import member_0 from "./img/team_member_1.jpg";
import member_1 from "./img/team_member_2.jpg";
import member_2 from "./img/team_member_3.jpg";
import member_3 from "./img/team_member_4.jpg";
import tokenLogo from "./img/Swappery_Logo.png";
import tokenSkyLogo from "./img/Skybridge_Logo.png";

import card_0 from "./img/green_1.png";
import card_1 from "./img/green_2.png";

const casperProjects = [
  {
    contractAddress: "skybridge",
    tier: 6,
    picture: tokenLogo,
    name: "SkyBridge",
    swap_rate: "0.05",
    cap: "$50",
    access: "Public",
    message: "SkyBridge",
    webpackLink: "/",
    twitterLink: "/",
    outlineLink: "/",
    telegramLink: "/",
  },
  {
    contractAddress: "swappery",
    tier: 8,
    picture: tokenLogo,
    name: "Swappery",
    swap_rate: "0.01",
    cap: "$100,000",
    access: "Public",
    message:
      "The Swappery is the first cross-chain Decentralized Exchange (DEX), built for the Casper Network (https://casper.network/en/network). Their platform will give thousands of Casper holders the opportunity to make great use of their Casper tokens.",
    webpackLink: "/",
    twitterLink: "/",
    outlineLink: "/",
    telegramLink: "/",
  },
];

const projects = [
  {
    contractAddress: "swappery-private-sale",
    tier: 8,
    picture: tokenLogo,
    name: "Private Sale",
    status: "Closed",
    progress: 0,
    swap_rate: "$0.009",
    cap: "$330,301",
    access: "Private",
    message:
      "The Swappery is the first cross-chain Decentralized Exchange (DEX), built for the Casper Network (https://casper.network/en/network). Their platform will give thousands of Casper holders the opportunity to make great use of their Casper tokens.",
  },
  {
    contractAddress: "swappery-seed-round",
    tier: 8,
    picture: tokenLogo,
    name: "Seed Round",
    status: "Closed",
    progress: 0,
    swap_rate: "$0.008",
    cap: "$666,399.1107",
    access: "Private",
    message:
      "The Swappery is the first cross-chain Decentralized Exchange (DEX), built for the Casper Network (https://casper.network/en/network). Their platform will give thousands of Casper holders the opportunity to make great use of their Casper tokens.",
  },
  {
    contractAddress: "swappery-public-sale",
    tier: 8,
    picture: tokenLogo,
    name: "Public Sale",
    status: "Closed",
    progress: 0,
    swap_rate: "$0.01",
    cap: "$999480",
    access: "Public",
    message:
      "The Swappery is the first cross-chain Decentralized Exchange (DEX), built for the Casper Network (https://casper.network/en/network). Their platform will give thousands of Casper holders the opportunity to make great use of their Casper tokens.",
  },
  {
    contractAddress: "swappery-advisory-round",
    tier: 8,
    picture: tokenLogo,
    name: "Advisory Round",
    status: "Closed",
    progress: 0,
    swap_rate: "$0.008",
    cap: "$240000",
    access: "Private",
    message:
      "The Swappery is the first cross-chain Decentralized Exchange (DEX), built for the Casper Network (https://casper.network/en/network). Their platform will give thousands of Casper holders the opportunity to make great use of their Casper tokens.",
  },
  {
    contractAddress: "skybridger-private-sale",
    tier: 12,
    picture: tokenSkyLogo,
    name: "Private Sale",
    status: "Closed",
    progress: 0,
    swap_rate: "$0.0095",
    cap: "$190,000",
    access: "Private",
    message:
      "SkyBridger is a Bridge between Casper Network and other chains, starting with Binance Smart Chain. SkyBridger is made for the community to earn fees by holding its token, $SKBR. The Decentralized nature of SkyBridger makes it so that the project is owned by the community.",
  },
  {
    contractAddress: "skybridger-advisor-sale",
    tier: 24,
    picture: tokenSkyLogo,
    name: "Advisory Sale",
    status: "Closed",
    progress: 0,
    swap_rate: "$0.0095",
    cap: "$95,000",
    access: "Private",
    message:
      "SkyBridger is a Bridge between Casper Network and other chains, starting with Binance Smart Chain. SkyBridger is made for the community to earn fees by holding its token, $SKBR. The Decentralized nature of SkyBridger makes it so that the project is owned by the community.",
  },

  {
    contractAddress: "skybridger-public-sale",
    tier: 6,
    picture: tokenSkyLogo,
    name: "Public Sale",
    status: "Closed",
    progress: 0,
    swap_rate: "$0.01",
    cap: "$500,000",
    access: "Public",
    message:
      "SkyBridger is a Bridge between Casper Network and other chains, starting with Binance Smart Chain. SkyBridger is made for the community to earn fees by holding its token, $SKBR. The Decentralized nature of SkyBridger makes it so that the project is owned by the community.",
  },
];

const rounds = [
  {
    name: "Tier1",
    requirement: 1000,
    length: "3 hours before Allocation Round opens",
    whitelist: "Like, Comment & Retweet",
    allocation: "Yes",
    pool_weight: "10",
  },
  {
    name: "Tier2",
    requirement: 2500,
    length: "3 hours before Allocation Round opens",
    whitelist: "Like, Comment & Retweet",
    allocation: "Yes",
    pool_weight: "30",
  },
  {
    name: "Tier3",
    requirement: 5000,
    length: "3 hours before Allocation Round opens",
    whitelist: "None",
    allocation: "Yes",
    pool_weight: "65",
  },
  {
    name: "Tier4",
    requirement: 10000,
    length: "3 hours before Allocation Round opens",
    whitelist: "None",
    allocation: "Yes",
    pool_weight: "145",
  },
  {
    name: "Tier5",
    requirement: 25000,
    length: "3 hours before Allocation Round opens",
    whitelist: "None",
    allocation: "Yes",
    pool_weight: "400",
  },
  {
    name: "Tier6",
    requirement: 75000,
    length: "3 hours before Allocation Round opens",
    whitelist: "None",
    allocation: "Yes",
    pool_weight: "500+ Private allocations",
  },
];

const advisors = [
  {
    picture: member_0,
    name: "Jasper Byun",
    position: "Founder",
    company: "Blocksync Ventures",
  },
  {
    picture: member_1,
    name: "Lester Lim",
    position: "Founder",
    company: "X21 Digital",
  },
  {
    picture: member_2,
    name: "Ian Friend",
    position: "Co-Founder and COO",
    company: "Ferrum Network",
  },
  {
    picture: member_3,
    name: "Danish Chaudhry",
    position: "CEO",
    company:
      "Bitcoin.com Exchange – Entrepreneur, Startup Advisor, Mentor and Investor",
  },
  {
    picture: member_0,
    name: "EXNETWORK CAPITAL",
    position: "",
    company:
      "Exnetwork Capital is an investment firm focused on funding and incubating blockchain projects.",
  },
  {
    picture: member_1,
    name: "Tim Frost",
    position: "CEO and co-founder",
    company: "IELD App",
  },
  {
    picture: member_2,
    name: "INNOVION",
    position: "",
    company:
      "Innovion has built a prestigious reputation with a unique approach to guerilla marketing, collaborating with over 200 blockchain projects.",
  },
];

const stakings = [
  {
    name: "Number of Stakers",
    value: "5133",
  },
  {
    name: "Total CasperPad Stacked",
    value: "31957734.60",
  },
  {
    name: "APY",
    value: "0.00",
  },
  {
    name: "Stacked",
    value: "0.0000",
  },
  {
    name: "Unstacked",
    value: "0.0000",
  },
  {
    name: "Rewards",
    value: "0.0000",
  },
  {
    name: "Connected with MetaMask",
    value:
      'If not connected, click the "Connect Wallet" button in the top right corner',
  },
  {
    name: "CasperPad available to deposit",
    value: "Current Balance: 0.0000",
  },
  {
    name: "BNB available in wallet",
    value:
      "BNB is required to pay transaction fees on the Binance Smart Chain network. BNB Balance: 0.0000",
  },
  {
    name: "Eligible to stake",
    value:
      "You cannot stake if you have an active CasperPad unstake/withdrawal request",
  },
];

const cards = [
  {
    name: "Greenpeace",
    picture: card_0,
    env: 0,
    progress: 50,
    stake: true,
    type: "project",
  },
  {
    name: "OceanCleanup",
    picture: card_1,
    env: 6513,
    progress: 90,
    stake: false,
    type: "project",
  },
  {
    name: "OceanCleanup",
    picture: card_1,
    env: 6513,
    progress: 90,
    stake: false,
    type: "organisation",
  },
  {
    name: "Greenpeace",
    picture: card_0,
    env: 0,
    progress: 50,
    stake: true,
    type: "organisation",
  },
  {
    name: "Greenpeace",
    picture: card_0,
    env: 0,
    progress: 50,
    stake: true,
    type: "project",
  },
  {
    name: "OceanCleanup",
    picture: card_1,
    env: 6513,
    progress: 90,
    stake: false,
    type: "project",
  },
  {
    name: "OceanCleanup",
    picture: card_1,
    env: 6513,
    progress: 90,
    stake: false,
    type: "organisation",
  },
  {
    name: "Greenpeace",
    picture: card_0,
    env: 0,
    progress: 50,
    stake: true,
    type: "organisation",
  },
];

export { projects, casperProjects, rounds, advisors, stakings, cards };
