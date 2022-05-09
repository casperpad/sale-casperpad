/** Main net*/
const swprTokenAddress = '0x6FA23529476a1337EB5da8238b778e7122d79666';
const vestingContractAddress = '0xF379B56250CB63cCa6720AACC306Be1e7f69B537';
const busdTokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
const usdtTokenAddress = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
/** - end -*/

// const preSaleAmount = 87500000;
const preSaleAmount = 83299889;
const saleStartTime = 1646820000;
const saleEndTime = 1646858400;

let whitelistOfTiers = [];
whitelistOfTiers['0x638bd39d6b9FEbeD9C33A70667D2a459008B00e8'] = 125000;//
whitelistOfTiers['0x2373Bb8bF89A82C107D82Bd2d69AebEe4e468FE2'] = 6250000;
whitelistOfTiers['0xc2A0f4294Ee783fFd9b0fa92BB9Ec92Bf772bb9E'] = 6250000;
whitelistOfTiers['0xa0fF4e0bDde4FBf5b243474Fc28abB8be939EE61'] = 6250000;
whitelistOfTiers['0x3DEa38B48f6D40627cbf408423f5F426890586b7'] = 5117013;
whitelistOfTiers['0x03e0e7996Ca5BeB5893087fec1251a5052040DbD'] = 2500000;
whitelistOfTiers['0x715318B0eaCA77c92ae580b4F87c0197F55042b0'] = 12500000;
whitelistOfTiers['0x893275fE071e1b823697409E82C2fF68841B1A24'] = 6250000;
whitelistOfTiers['0x568f7802596BF77408C6450B23cbd24C23cfE2Fd'] = 6250000;
whitelistOfTiers['0x8C61A022f779C38f95D581a0CB73114f67ca686c'] = 6250000;
whitelistOfTiers['0x201071E30C18358103f33d0Bf6E4Bcd143f359Eb'] = 3750000;
whitelistOfTiers['0x97FF48855984F9f17aF2E63C1ba0eef11Cb35fA4'] = 8764125;
whitelistOfTiers['0x6F53877f2eFc388FA86bc35096e65070E2abB067'] = 1875000;
whitelistOfTiers['0xF8090e8B05B17BC6bC99B0495AefDAcff59aE95A'] = 1250000;
whitelistOfTiers['0xA5a5769320B777c3d312fdAAdC5399b8aCa6050d'] = 625000;
whitelistOfTiers['0x3100A282b39416500807C96EfD50b8648C7a96A9'] = 187500;
whitelistOfTiers['0xC68dE27a52Bf9dCEE914f340e456afcdfddA16eB'] = 625000;
whitelistOfTiers['0x2a54105Eb48Cf812e5d0E924EA6aE8Bd1268De9f'] = 375000;
whitelistOfTiers['0x6d4f5528cF4069A680ED28A9Fab656E1b6f486d7'] = 1250000;
whitelistOfTiers['0x6210a744c865b99a5D8f2a87B3bf5E4343103cd1'] = 43750;
whitelistOfTiers['0xA23B90b0218Edd4bE12308B7f95A3CE52FD9b917'] = 62500;
whitelistOfTiers['0xEf676997bd99261120c254896a79Fc7D154A08E0'] = 1250000;
whitelistOfTiers['0x5E9853e5aCb2F9617723f804c2e23DE0f04073F2'] = 1250000;
whitelistOfTiers['0x058389346192fC2B4549A597973E17D132C76E6C'] = 1250000;
whitelistOfTiers['0xC48Fc935B13Fc1891628Ed2568CC1D766D75E55C'] = 500000;
whitelistOfTiers['0x1c8038Ebb069313dD218E8b5C1e615f15d8229B0'] = 2500000;


const schedulePlain = [
    {
        percentage: 1,
        unlockTime: 1646858400, //2022-03-09 20:40  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1649462400, //2022-04-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1652054400, //2022-05-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1654732800, //2022-06-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1657324800, //2022-07-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1660003200, //2022-08-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1662681600, //2022-09-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1665273600, //2022-10-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1667952000, //2022-11-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1670544000, //2022-12-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1673222400, //2023-01-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1675900800, //2023-02-09 00:00  GMT-000
        isSent: false
    }, {
        percentage: 8.25,
        unlockTime: 1678320000, //2023-03-09 00:00  GMT-000
        isSent: false
    }
    
];

const whitelistOfTiersLength = 25;



export { swprTokenAddress, vestingContractAddress, busdTokenAddress, usdtTokenAddress, schedulePlain, preSaleAmount, whitelistOfTiersLength, saleStartTime, saleEndTime, whitelistOfTiers };