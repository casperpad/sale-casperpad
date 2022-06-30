export const casperProjects = {
  "casper-test": [
    {
      address:
        "54172ffe59ff8c2c1ae307f4672215522fe2608d252e197381ccbb8b88853038",
      isPublic: false,
    },
    {
      address:
        "6fe3d97d5b5fcfb3890f470f6da71439eaf0bd3ba0e3cb4ab043cee414b6de11",
      isPublic: true,
    },
  ],
  casper: [
    {
      address:
        "74764b918573d0572fe949c434c295204d4d4afa70e067b9bb21082306da8e87",
      isPublic: false,
    },
  ],
};

export const CASPER_CHAIN =
  process.env.REACT_APP_CASPER_CHAIN_NAME || "casper-test";
