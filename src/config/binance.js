const binanceProjects = {
  56: [
    {
      address: "0x67E2E72c0B521eA2384b16fb739ab6f59A7AEe27",
      isBuyOnly: true,
      isPublic: false,
    },
  ],
  97: [
    {
      address: "0xD9A3DC054057007d39330E21C88780bc754B8c56",
      isBuyOnly: true,
      isPublic: false,
    },
    {
      address: "0x421DDEBDd73002E3163d84c01E798e02DE3B89b1",
      isBuyOnly: true,
      isPublic: true,
    },
  ],
};

export const CHAIN_ID = parseInt(process.env.REACT_APP_BSC_CHAIN_ID) || 97;

export default binanceProjects;
