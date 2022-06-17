const binanceProjects = {
  56: [],
  97: [{ address: "0x1234", isBuyOnly: true }],
  3: [
    { address: "0x56025BEA110Ac4283ecef59dB7279758F36e74C2", isBuyOnly: true },
  ],
};

export const CHAIN_ID = parseInt(process.env.REACT_APP_BSC_CHAIN_ID) || 97;

export default binanceProjects;
