const binanceProjects = {
  56: [
    { address: "0x67E2E72c0B521eA2384b16fb739ab6f59A7AEe27", isBuyOnly: true },
  ],
  97: [
    { address: "0xD9A3DC054057007d39330E21C88780bc754B8c56", isBuyOnly: true },
  ],
};

export const CHAIN_ID = parseInt(process.env.REACT_APP_BSC_CHAIN_ID) || 97;

export default binanceProjects;
