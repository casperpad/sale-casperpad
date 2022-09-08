export const casperProjects = {
  "casper-test": [
    {
      address:
        "c804df92bbd3301add71ab43e4506b62bd440c55a0eba6eccfd145d8feff71cd",
      isPublic: false,
    },
  ],
  casper: [
    {
      address:
        "6cc90635ccaf0fac5c08f0533ea85336f2975202f5d01a5a1894f6f6cb306827",
      isPublic: false,
    },
    // {
    //   address:
    //     "365eada56830d84afb71bce8385249873ac0a0e3105ddda4714427914b1280fb",
    //   isPublic: true,
    // },
  ],
};

export const CASPER_CHAIN =
  process.env.REACT_APP_CASPER_CHAIN_NAME || "casper-test";
