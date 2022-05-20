import create from "zustand";

const useNetworkStatus = create((set) => ({
  casperConnected: false,
  binanceConnected: false,
  casperAddress: "",
  binanceAddress: "",
  showCasperProjects: true,
  showBinanceProjects: true,
  loading: [false, false],
  projectLoading: false,
  loaded: [false, false],
  projectLoaded: false,
  setShowCasperProjects: (showCasperProjects) =>
    set(() => ({ showCasperProjects })),
  setShowBinanceProjects: (showBinanceProjects) =>
    set(() => ({ showBinanceProjects })),
  setCasperAddress: (address) =>
    set(() => {
      const casperAddress = address ?? "";
      const casperConnected = address ? true : false;
      return { casperAddress, casperConnected };
    }),
  setBinanceAddress: (address) =>
    set(() => {
      const binanceAddress = address ?? "";
      const binanceConnected = address ? true : false;
      return { binanceAddress, binanceConnected };
    }),
  setProjectLoading: (status, index) =>
    set((state) => {
      let loading = state.loading;
      loading[index] = status;
      return { loading, projectLoading: loading[0] || loading[1] };
    }),
  setProjectLoaded: (status, index) =>
    set((state) => {
      let loaded = state.loaded;
      loaded[index] = status;
      return { loaded, projectLoaded: loaded[0] && loaded[1] };
    }),
}));

export default useNetworkStatus;
