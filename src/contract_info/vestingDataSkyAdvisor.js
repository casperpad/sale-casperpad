/** Main net*/
const swprTokenAddress = '0xAd1f255571aC404d1213842Ad86658F8C6b3D717';
const vestingContractAddress = '0x193866d107e887179dE6d57942d32B3c2c034de9';
const busdTokenAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const usdtTokenAddress = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
/** - end -*/

// const preSaleAmount = 87500000;
const preSaleAmount = 10000000;
const saleStartTime = 1649590800;
const saleEndTime = 1649678400;

let whitelistOfTiers = [];

// Test

whitelistOfTiers['0xFF29240a1769086f4FeEE8ba8b900DA724226ed1'] = 2660000;
whitelistOfTiers['0x5c793415276ebD4E4c13B82e0C9DBf7234904131'] = 2660000;
whitelistOfTiers['0x75A363A4f0f7961f749dCaAEbcB8E2a73bc66820'] = 2680000;
whitelistOfTiers['0xB7654f2d268ba12751d48B9Ca318C26d09E693c6'] = 2000000;
whitelistOfTiers['0x5E40E2eB6A1Dfe8E8E590a3c1DE44FB5c5D74bca'] = 10;

const schedulePlain = [
    {
        percentage: 0,
        unlockTime: 1649685600, //2022-04-11 14:00  GMT-000
        isSent: false
    }, {
        percentage: 4.16,
        unlockTime: 1652184000, //2022-05-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 4.16,
        unlockTime: 1654862400, //2022-06-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 4.16,
        unlockTime: 1657454400, //2022-07-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 4.16,
        unlockTime: 1660132800, //2022-08-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 4.16,
        unlockTime: 1662811200, //2022-09-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 4.16,
        unlockTime: 1665403200, //2022-10-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 4.16,
        unlockTime: 1668081600, //2022-11-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 4.16,
        unlockTime: 1670673600, //2022-12-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 4.16,
        unlockTime: 1673352000, //2023-01-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 4.16,
        unlockTime: 1676030400, //2023-02-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1678449600, //2023-03-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1681128000, //2023-04-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1683720000, //2023-05-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1686398400, //2023-06-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1688990400, //2023-07-10 12:00  GMT-000
        isSent: false
    },
    
    {
        percentage: 4.16,
        unlockTime: 1691668800, //2023-08-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1694347200, //2023-09-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1696939200, //2023-10-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1699617600, //2023-11-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1702209600, //2023-12-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1704888000, //2024-01-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1707566400, //2024-02-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1710072000, //2024-03-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 4.16,
        unlockTime: 1712750400, //2024-04-10 12:00  GMT-000
        isSent: false
    },
];

const whitelistOfTiersLength = 4;



export { swprTokenAddress, vestingContractAddress, busdTokenAddress, usdtTokenAddress, schedulePlain, preSaleAmount, whitelistOfTiersLength, saleStartTime, saleEndTime, whitelistOfTiers };