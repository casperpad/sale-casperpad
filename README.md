# CasperPad Binance Smart Chain Network
**BCasperPadSCPad Binance Smart Chain Network** is a frontend with no backend written in React.js.

### Prerequisites

 * We assume that you have up-to-date Node.js version installed.
 
### Installing
#### Manual

 * yarn install
 * yarn start
 If you make changes to code, your pages will automatically reload.
 
## Live URL
Demo: https://bscpad-react-frontend-blockchain.vercel.app/

## License

This project is licensed under the GIT License.


## WhiteList


* src/contract/info/whitelis.js, please add wallet addresses to be whitelisted
```
    let whitelist = [
        '0x8B97225E980a2E6C6d6aff18fCB26Cd435906089',
        '0xEbcb236aa54D01484d8759C146dab14F6E792398',
        '0x6ACbab3166e7b6779F171bED3F3885525Bfc9F20',
        '0xAb54Ac1a31609e5Ef43e3FaFb8aE9e56303980E0',
        '0xC4739e4F4f3c2D288C061a51d519BB7dE0B51a51',
        '0x378AFd5848aD9f0baF69c58B8D1E52875962C060',
        '0x682013228a28E63f3D85137e6ec92A4973a6f5Df',
        '0x4BDe1Ae1FCD828b5316C8DB858C818E2099C0CDc',
        '0xAa9120df5B80f425488Bc7495a524c83646BE4F5'
    ]
    export {whitelist}
```
* src/contract/vestingData.js, please add wallet addresses with the amounts.
```
    whitelistOfTiers['0xef40dc06810ff05ebb993b7f1b2cc17c2f97c82a'] = 10500;
    whitelistOfTiers['0xedad8e0856d3023dd2715cf5e4e09e3dadfe759f'] = 10500;
    whitelistOfTiers['0xe9122c6957bc0788ea4eeda84cbb20c19e3ea0bf'] = 10500;
    whitelistOfTiers['0xcc906c7ac1645289176c2c5915b190e69832b5f6'] = 10500;
    whitelistOfTiers['0xc96e10f80f124c0c00a3e7564c5f3dbc2b6e38bc'] = 10500;
    whitelistOfTiers['0xb823decba39f5eb71116b3f8831a06f302e3ed16'] = 10500;

```

* On the smart contract, please call setMerkleRoot function with the root hash. (we can extract merkle root from the UI)

please check ./screenshots/...


