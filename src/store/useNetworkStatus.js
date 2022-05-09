import create from 'zustand';

const useNetworkStatus = create((set) => ({
  casperConnected: false,
  binanceConnected: false,
  casperAddress: "",
  binanceAddress: "",
  showCasperProjects: true,
  showBinanceProjects: true,
  setShowCasperProjects: (showCasperProjects) => set(() => ({ showCasperProjects })),
  setShowBinanceProjects: (showBinanceProjects) => set(() => ({ showBinanceProjects })),
  setCasperAddress: (address) => set(() => {
    const casperAddress = address ?? "";
    const casperConnected = address ? true : false;
    return { casperAddress, casperConnected };
  }),
  setBinanceAddress: (address) => set(() => {
    const binanceAddress = address ?? "";
    const binanceConnected = address ? true : false;
    return { binanceAddress, binanceConnected };
  }),
}));

export default useNetworkStatus;