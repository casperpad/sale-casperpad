/** Main net*/
const swprTokenAddress = '0x6FA23529476a1337EB5da8238b778e7122d79666';
const vestingContractAddress = '0x3426E8c9e536e9CCB1650340a92560782b04Dce6';
const busdTokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
const usdtTokenAddress = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
/** - end -*/

// const preSaleAmount = 87500000;
const preSaleAmount = 30000000;
const saleStartTime = 1646955000;
const saleEndTime = 1646858400;

let whitelistOfTiers = [];
whitelistOfTiers['0xA5664dC01BB8369EDc6116d3B267d6014681dD2F'] = 10500000;
whitelistOfTiers['0xFF29240a1769086f4FeEE8ba8b900DA724226ed1'] = 4500000;
whitelistOfTiers['0x5c793415276ebD4E4c13B82e0C9DBf7234904131'] = 6000000;
whitelistOfTiers['0x0a2b4C3bB0EA2b23A99cFCe712fb0a0F2D8Dd55C'] = 4500000;
whitelistOfTiers['0xA420FD9e0eB8c5EB6F062a0FC2Df8327e892faC6'] = 1500000;
whitelistOfTiers['0xF6b3F22eF8DDC92ABA7AaFDD9D20dAeb06e3e110'] = 1500000;
whitelistOfTiers['0x0294d1e3B369683263BD18f33ED6f234a591cEF0'] = 1500000;



const schedulePlain = [
    {
        percentage: 1,
        unlockTime: 1646956800, // Mar 10 2022 00:40
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1649462400, // Apr 9 2022 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1652054400, // May 9 2022 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1654732800, // Jun 9 2022 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1657324800, // Jul 9 2022 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1660003200, // Aug 9 2022 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1662681600, // Sep 9 2022 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1665273600, // Oct 9 2021 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1667952000, // Nov 9 2022 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1670544000, // Dec 9 2022 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1673222400, // Jan 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1675900800, // Feb 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1678320000, // Mar 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1680998400, // Apr 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1683590400, // May 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1686268800, // Jun 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1688860800, // Jul 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1691539200, // Aug 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1694217600, // Sep 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1696809600, // Oct 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1699488000, // Nov 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1702080000, // Dec 9 2023 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1704758400, // Jan 9 2024 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1707436800, // Feb 9 2024 00:00
        isSent: false
    }, {
        percentage: 4.125,
        unlockTime: 1709942400, // Mar 9 2024 00:00
        isSent: false
    }
];

const whitelistOfTiersLength = 7;



export { swprTokenAddress, vestingContractAddress, busdTokenAddress, usdtTokenAddress, schedulePlain, preSaleAmount, whitelistOfTiersLength, saleStartTime, saleEndTime, whitelistOfTiers };