const binanceProjects = {
  56: [],
  97: [
    { address: "0xD9A3DC054057007d39330E21C88780bc754B8c56", isBuyOnly: true },
  ],
  3: [
    { address: "0x56025BEA110Ac4283ecef59dB7279758F36e74C2", isBuyOnly: true },
  ],
};

export const CHAIN_ID = parseInt(process.env.REACT_APP_BSC_CHAIN_ID) || 97;

export default binanceProjects;
