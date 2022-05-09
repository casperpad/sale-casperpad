/** Main net*/
const swprTokenAddress = '0x6FA23529476a1337EB5da8238b778e7122d79666';
const vestingContractAddress = '0xE416D499BB7dD4D7B70396761b220d591DcE72a3';
const busdTokenAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const usdtTokenAddress = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
/** - end -*/

// const preSaleAmount = 87500000;
const preSaleAmount = 36700111;
const saleStartTime = 1646820000;
const saleEndTime = 1646858400;

let whitelistOfTiers = [];

whitelistOfTiers['0xEbcb236aa54D01484d8759C146dab14F6E792398'] = 17222222;
whitelistOfTiers['0x6ACbab3166e7b6779F171bED3F3885525Bfc9F20'] = 5555556;
whitelistOfTiers['0xAb54Ac1a31609e5Ef43e3FaFb8aE9e56303980E0'] = 5555556;
whitelistOfTiers['0xC4739e4F4f3c2D288C061a51d519BB7dE0B51a51'] = 555556;
whitelistOfTiers['0x378AFd5848aD9f0baF69c58B8D1E52875962C060'] = 588889;
whitelistOfTiers['0x682013228a28E63f3D85137e6ec92A4973a6f5Df'] = 2777889;
whitelistOfTiers['0x4BDe1Ae1FCD828b5316C8DB858C818E2099C0CDc'] = 1111111;
whitelistOfTiers['0x34443f55BBC1f484331A4abe0586b233d0A75b17'] = 3333333;



const schedulePlain = [
    {
        percentage: 1,
        unlockTime: 1646858400, //2022-03-09 20:40  GMT-000
        isSent: false
    }, {
        percentage: 9.9,
        unlockTime: 1649462400, //2022-04-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 9.9,
        unlockTime: 1652054400, //2022-05-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 9.9,
        unlockTime: 1654732800, //2022-06-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 9.9,
        unlockTime: 1657324800, //2022-07-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 9.9,
        unlockTime: 1660003200, //2022-08-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 9.9,
        unlockTime: 1662681600, //2022-09-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 9.9,
        unlockTime: 1665273600, //2022-10-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 9.9,
        unlockTime: 1667952000, //2022-11-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 9.9,
        unlockTime: 1670544000, //2022-12-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 9.9,
        unlockTime: 1673222400, //2023-01-01 00:00  GMT-000
        isSent: false
    }
    
];

const whitelistOfTiersLength = 8;



export { swprTokenAddress, vestingContractAddress, busdTokenAddress, usdtTokenAddress, schedulePlain, preSaleAmount, whitelistOfTiersLength, saleStartTime, saleEndTime, whitelistOfTiers };