export const casperProjects = {
  "casper-test": [
    {
      address:
        "54172ffe59ff8c2c1ae307f4672215522fe2608d252e197381ccbb8b88853038",
      isPublic: false,
    },
    {
      address:
        "4ab20dc9b5ec22663a04454009d8ceb45bd628d0bb242550b76a4234d974be78",
      isPublic: true,
    },
    {
      address:
        "ce9235335cfae339839d4c4dad8a62ec573e44cad9634eca8f20c67f0356ef27",
      isPublic: true,
    },
  ],
  casper: ["74764b918573d0572fe949c434c295204d4d4afa70e067b9bb21082306da8e87"],
};

export const CASPER_CHAIN =
  process.env.REACT_APP_CASPER_CHAIN_NAME || "casper-test";
