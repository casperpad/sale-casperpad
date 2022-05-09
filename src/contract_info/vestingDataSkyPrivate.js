/** Main net*/
const swprTokenAddress = '0xAd1f255571aC404d1213842Ad86658F8C6b3D717';
const vestingContractAddress = '0xE8C45F8C60363a2B6DeE690EE69C5c1a4ee64143';
const busdTokenAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const usdtTokenAddress = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
/** - end -*/

// const preSaleAmount = 87500000;
const preSaleAmount = 20000000;
const saleStartTime = 1649590800;
const saleEndTime = 1649678400;

let whitelistOfTiers = [];

// Test

whitelistOfTiers['0x5E40E2eB6A1Dfe8E8E590a3c1DE44FB5c5D74bca'] = 10;


whitelistOfTiers['0xc2A0f4294Ee783fFd9b0fa92BB9Ec92Bf772bb9E'] = 5263158;
whitelistOfTiers['0xC387e85C213b1109fE1450ae26D67c63A4c619e5'] = 5263158;
whitelistOfTiers['0x4F63B8bdd580fd6A6B3a62310B25bB889c9d3256'] = 5263158;
whitelistOfTiers['0x8cbA5dF6a0Fa4d82231364d8890f268732b40df3'] = 3421053;
whitelistOfTiers['0xf24548Ef3D37974Bdb5FAeBe75c5976F574B6828'] = 526316;
whitelistOfTiers['0x5BD62e5eae253C3839B4c821Bc323af9d763E047'] = 526316;


const schedulePlain = [
    {
        percentage: 5,
        unlockTime: 1649685600, //2022-04-11 14:00  GMT-000
        isSent: false
    }, {
        percentage: 7.91,
        unlockTime: 1652184000, //2022-05-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 7.91,
        unlockTime: 1654862400, //2022-06-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 7.91,
        unlockTime: 1657454400, //2022-07-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 7.91,
        unlockTime: 1660132800, //2022-08-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 7.91,
        unlockTime: 1662811200, //2022-09-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 7.91,
        unlockTime: 1665403200, //2022-10-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 7.91,
        unlockTime: 1668081600, //2022-11-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 7.91,
        unlockTime: 1670673600, //2022-12-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 7.91,
        unlockTime: 1673352000, //2023-01-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 7.91,
        unlockTime: 1676030400, //2023-02-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 7.91,
        unlockTime: 1678449600, //2023-03-10 12:00  GMT-000
        isSent: false
    },
    {
        percentage: 7.91,
        unlockTime: 1681128000, //2023-04-10 12:00  GMT-000
        isSent: false
    }
    
];

const whitelistOfTiersLength = 6;



export { swprTokenAddress, vestingContractAddress, busdTokenAddress, usdtTokenAddress, schedulePlain, preSaleAmount, whitelistOfTiersLength, saleStartTime, saleEndTime, whitelistOfTiers };