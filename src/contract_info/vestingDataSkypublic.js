/** Main net*/
const swprTokenAddress = '0xAd1f255571aC404d1213842Ad86658F8C6b3D717';
const vestingContractAddress = '0xf59fc79385A5372371b13A031FE7d254357B9957';
const busdTokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
const usdtTokenAddress = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
/** - end -*/

// const preSaleAmount = 11615019;
const preSaleAmount = 52129000;

// For Real
const saleStartTime = 1649590800;
const startFcfsTime = 1649678400;
const saleEndTime = 1649678400;


let whitelistOfTiers = [];

// Test
whitelistOfTiers['0xaa9120df5b80f425488bc7495a524c83646be4f5'] = 10;  
whitelistOfTiers['0x5e40e2eb6a1dfe8e8e590a3c1de44fb5c5d74bca'] = 100; 
whitelistOfTiers['0x337665b2e23f9ee9886159dbec5b51251c5c4b4e'] = 200; 

//Gold
whitelistOfTiers['0xff71f164f12b9def1cf20ef2bb7397b51662c876'] = 150000


whitelistOfTiers['0xfa500be50801301bc94c8c1e4eb001be35c281bc'] = 150000
whitelistOfTiers['0xf6c65c2deff86a74bd9a73a9813c8dd1ecdb7bbf'] = 150000


whitelistOfTiers['0xf13e1feccc9a6583ca92ab3edc65fcd1c721b69a'] = 150000
whitelistOfTiers['0xf04b9b3865bbe68d4f49770b30184ef7c8be7dcb'] = 150000


whitelistOfTiers['0xe7dc7ccee7ad7bf173d7c527d40ff1dc5abe94a7'] = 150000
whitelistOfTiers['0xe5646df0f507d1f547400cc3870ef6900b627bc5'] = 150000


whitelistOfTiers['0xd6b09684605e10bf1ec0db1882377b842a53f9c2'] = 150000




whitelistOfTiers['0xd0a317fcfd70ebc4515c40a6f67e2a31bae7bd0b'] = 150000
whitelistOfTiers['0xcec9c18a96ed5da076df5db5373b4ea90f0f0e80'] = 150000
whitelistOfTiers['0xc5abfc647f01a8bc8b92ad1990d689cd7bb0ef4b'] = 150000




whitelistOfTiers['0xbb2800e0ba6301d3b496e9032f54121c1b4c49c2'] = 150000


whitelistOfTiers['0xb53bde5f654b58ec27f47ca815254eea1a4513f4'] = 150000






whitelistOfTiers['0xac8ded96ba2b71565873f9b679bd7b55acaeabe2'] = 150000
whitelistOfTiers['0xa8362d8b65ff6aecdc96d8b22053e6efaaf39529'] = 150000
whitelistOfTiers['0xa6ed26749cb54591291b4550a82f15ff64ae98d9'] = 150000
whitelistOfTiers['0xa6b97f9881447b404670b789becb649695be0ac9'] = 150000


whitelistOfTiers['0x9ea5bf4cd3d73e297f77b5af61fc1712870a28d3'] = 150000


whitelistOfTiers['0x9aa85697322f2353c183e3b46f68b9c13bed5054'] = 150000
whitelistOfTiers['0x988eff64ac9604d9acc2e266f2fe6abe5680c506'] = 150000
whitelistOfTiers['0x8f30b11067892772edbe8a5ea5355c3cb59be0c4'] = 150000




whitelistOfTiers['0x8744eb6eabf6d22ef908b3c771e11a4eb0ed527e'] = 150000


whitelistOfTiers['0x7e7313e93c3ccf30c4d1e7772be1b3828fa41a99'] = 150000
whitelistOfTiers['0x7b057ac7e9471fd5420f02553ef38d7bc48b0321'] = 150000
whitelistOfTiers['0x7af33015b455e3e7a9228ed64b5d655c4da794df'] = 150000


whitelistOfTiers['0x6e0509bb39fa16609341dbcb2c7c5c4fec212445'] = 150000


whitelistOfTiers['0x62e219d5a8965e1ada920b578d743ce3507fe7f4'] = 150000


whitelistOfTiers['0x5e733ccef653f6919ae5412a33e2d0103a09fdb9'] = 150000




whitelistOfTiers['0x51622c71f422e823e4f43ab3bdf419b823ee7f8d'] = 150000


whitelistOfTiers['0x43075f64faf7d910bd4fc644c12f2fffbbb8c536'] = 150000


whitelistOfTiers['0x2e051754b4eeb871dcc3a5017efc1a2a74a41e71'] = 150000


whitelistOfTiers['0x28d3ed14c9d3cd6f4cafd76892c1f83b6acc9281'] = 150000
whitelistOfTiers['0x22ac9e1218863aacb5361039c7a8344b0baed5de'] = 150000
whitelistOfTiers['0x1ec6d696a9635dd34f76ec55bbccd6ba13625a0f'] = 150000
whitelistOfTiers['0x1e63d29cc93075f08504ffcbfb93b21d315beb0d'] = 150000
whitelistOfTiers['0x19a766715fba120c43afd228b4c06571e9b17141'] = 150000






whitelistOfTiers['0x091f92b8cff6216ff53533078a9293a5c14c44cc'] = 150000
whitelistOfTiers['0x068d4705940d69efe0bc12ea120da5815cf13ff0'] = 150000






whitelistOfTiers['0xf0db7790e1adeb5d8e47e5ee8d404ce7cf180648'] = 150000


whitelistOfTiers['0xe7b99a04ce01f15697b4c4cf710147027cc01ccf'] = 150000




whitelistOfTiers['0xdb5a3af91b4e04d1e7673f7b22aabb81b9fdcd3d'] = 150000














whitelistOfTiers['0xb9ada2dc6132a61c9d5e108d22172d7d73d42b99'] = 150000
whitelistOfTiers['0xb196fb247868276db8f2b378c4a9e5018648aa60'] = 150000














whitelistOfTiers['0x874814b01f003c7226ceff0d2303011a1e3148a0'] = 150000


whitelistOfTiers['0x78e2c4de212474d410456e9aa0c3acbc44f0643a'] = 150000




















whitelistOfTiers['0x2219e393932e6002f8701b2713ad753f009c258a'] = 150000
whitelistOfTiers['0x202fe0876f8195b6933cc94543d1c5e130664ee7'] = 150000












whitelistOfTiers['0x03d993595da3786914fea7982b83ba9c31b057d2'] = 150000


whitelistOfTiers['0xacaa477b3cb24e106c7ada4434a595bbbb5c25b4'] = 150000

// Premium


whitelistOfTiers['0xdfaa8804e48339f736fc44ce87d8e33604b551d4'] = 250000
whitelistOfTiers['0xdac3de9aa24d107dd5383df4a39044f1298ec49e'] = 250000






whitelistOfTiers['0xad7218b297633253b18be4b9e79c2363dc2fc680'] = 250000
whitelistOfTiers['0x911fdf387dc3b595f13ddba190cb777524aaa3dc'] = 250000


whitelistOfTiers['0x87be665941bbb22fbe29780794d1a74565729933'] = 250000
whitelistOfTiers['0x81213a21350f5d955a4aadf723fa79c0c2112a5a'] = 250000
whitelistOfTiers['0x6a8132667e330d3977e0701815bbde3dc86eb14d'] = 250000


whitelistOfTiers['0x62729e323a9dc2b9881c71e611afe4da79c413c0'] = 250000










whitelistOfTiers['0x1f8cedf1f51a66f0754ef5591f4d3f26dac2f1df'] = 250000
whitelistOfTiers['0x19a30e5f25bfb32fcf35d852f276c8ccb72db6ad'] = 250000


whitelistOfTiers['0x0a346265205adf4508cf7380b8786c163172a4be'] = 250000












whitelistOfTiers['0x8175732f812af3aff7cf5f73dfcf947c9eef279c'] = 250000


whitelistOfTiers['0x4f739157a29c102f099411e2d288cbff9e89d8f7'] = 250000











//Tier1 120

whitelistOfTiers['0xfc7e0e5f47da1c267a3c6d45cc2a023f230d3aff'] = 12000
whitelistOfTiers['0xf9959af7455037d494290f3f4e266f3eb1e4c44e'] = 12000






whitelistOfTiers['0xf71d7a2df7402c47470c34323ca9ebc7369cc6f6'] = 12000
whitelistOfTiers['0xf6be45421d4f7d4cb61a1073f74fc70c48791ca7'] = 12000


whitelistOfTiers['0xf5be935b4e37e51f2e2c8e7789e655224258b5e1'] = 12000




whitelistOfTiers['0xf35c902fe67b36f4bbc6e4c1e9caa7bc0665df6b'] = 12000
whitelistOfTiers['0xf2a443ccd7028166df8f0ce53b69ac54eba147cd'] = 12000


whitelistOfTiers['0xf0663454bb4cb9a872816dfeeadb1ea1bf7fba2d'] = 12000
whitelistOfTiers['0xef77235d3a902f3c7d27046cd1f9044cf5827f47'] = 12000


whitelistOfTiers['0xee8f31aa79932d0b513c8790011a8498bad4ee26'] = 12000


whitelistOfTiers['0xed4499baa7783dbeed7f73cd79a2c2e5493a3663'] = 12000


whitelistOfTiers['0xec7afd53b99f3e60f3d5c97b3eda5c1d32703d8c'] = 12000
whitelistOfTiers['0xebce73a3652973a50be43426d7fb526c76da3506'] = 12000




whitelistOfTiers['0xe98182c6b76be2c660f20d4ccd6e01dbf36154a5'] = 12000
whitelistOfTiers['0xe6d9e95dafb1b2183338eff71093076160ea5cd6'] = 12000






whitelistOfTiers['0xe1d855a5e0cc4f8fd1e367c4a07e315cbc34dbf4'] = 12000
whitelistOfTiers['0xe0ea3b4b25cc7d745e62a146c18cbfcda8c93c9e'] = 12000
whitelistOfTiers['0xe0a5b28d9aca75920bdc66c31cdd03ebb74f5a23'] = 12000


whitelistOfTiers['0xdf09fc75d5390c1e33b54119ca3d9d6f0bdc5ef3'] = 12000


whitelistOfTiers['0xdbe5d82131aea0c005fcf42d43228813f3537424'] = 12000


whitelistOfTiers['0xda7c75bb5965835729b073a2705b0b257e1e27a0'] = 12000


whitelistOfTiers['0xd6ac5e747ae2be6d7aa54d515a23c010fe2f78a7'] = 12000


whitelistOfTiers['0xd67654d62deb04a72a1f70813493b0d9fbed9d2d'] = 12000
whitelistOfTiers['0xd5528c7d624ac048d1e687b835815b643cf5ed39'] = 12000
whitelistOfTiers['0xd440dda56d532e41128de7a517493d7eaeaef59d'] = 12000


whitelistOfTiers['0xd20cc1610bb0d0cf0daacb159ab6cc4787d9e6d4'] = 12000


whitelistOfTiers['0xcfb6ee204715d97455fdcb829d73fefd1b4c2c6c'] = 12000
whitelistOfTiers['0xcf62a1e3f67b7c5ca5c12569e3b610c636fbd638'] = 12000


whitelistOfTiers['0xceb84a8021d42a821481ccac0e745a62271c258b'] = 12000
whitelistOfTiers['0xce8e926ea6546aeb58270ef3bceae84e453214de'] = 12000






whitelistOfTiers['0xca8059ced82f3286dea99b9aa28f22c1be99d83f'] = 12000
whitelistOfTiers['0xc980e91018349ffc9eaad76595ccdab24eca2f84'] = 12000
whitelistOfTiers['0xc976da847e20cccd3ae80a7628a6bcdfa4b7f123'] = 12000
whitelistOfTiers['0xc96e10f80f124c0c00a3e7564c5f3dbc2b6e38bc'] = 12000






whitelistOfTiers['0xc5bc4606d634da2708e9559523efefe46521f30b'] = 12000






whitelistOfTiers['0xc212838a1e2938d8987f2992aa25ff61c3fda510'] = 12000






whitelistOfTiers['0xbeef3d45e9121123abfc7d4660d9dd88d129a3f7'] = 12000




whitelistOfTiers['0xbd8c80eb68753e71f2c560bbee987b1fab492353'] = 12000
whitelistOfTiers['0xbd63506ed10718ad65d54bd3baf90bf869f00b45'] = 12000




whitelistOfTiers['0xbc2cb32e7ae7f090cf70254d31d0eaed6b739d2b'] = 12000
whitelistOfTiers['0xbbfdf0bb9cd80dd941eff46ad2b805f631962265'] = 12000
whitelistOfTiers['0xbb2dd67d0e3cebdc294c4f98c48afb4454933484'] = 12000
whitelistOfTiers['0xbb1f9af3578030060f61893eb8bda9edab06f440'] = 12000


whitelistOfTiers['0xba55e2df7b9bf2dbfab6e999b39c96bb04695679'] = 12000




whitelistOfTiers['0xb950cfe238792b1c5e7361615327304e6dd2c1a5'] = 12000
whitelistOfTiers['0xb8caadd577cd031ca774bc6d8378b48337822abc'] = 12000
whitelistOfTiers['0xb6776b0cef8c773832ca97832061c71a3a4c37cd'] = 12000
whitelistOfTiers['0xb5f59987d0c3195f1cf7c813c5a221b9e792eee1'] = 12000
whitelistOfTiers['0xb4c6bc91a75781b51783b55e9a229194383a8296'] = 12000
whitelistOfTiers['0xb344536408ea9c6b55f3af9d7d3ad275120407ca'] = 12000
whitelistOfTiers['0xb319e8ec6ddcf3df59af2dca518899328424ac8e'] = 12000
whitelistOfTiers['0xb24cffc4db3111fc0df67d7001a0a7cb00ac14f9'] = 12000




whitelistOfTiers['0xb07fa83bc728d856defc1086eb8a3d7a6ca8a812'] = 12000
whitelistOfTiers['0xae125228f0b19894927861074ecb92508bee5c13'] = 12000


whitelistOfTiers['0xace01df22bd3334aa5d2b6e5153ef8a9e03f823b'] = 12000






whitelistOfTiers['0xab2bd8536e763ccff0580904d789a86b8691bf0c'] = 12000








whitelistOfTiers['0xa7991e4befed828e0bf6fd73643a4ce5e082ce0f'] = 12000
whitelistOfTiers['0xa6bf60db9fa47e2df6524c66d4069d5e44370e5d'] = 12000
whitelistOfTiers['0xa6b5c8b9b5c8881ec153f28fa7c66033c5bbf599'] = 12000




whitelistOfTiers['0xa5a85e88f505fdc639f749492d79cca81b46f12c'] = 12000




whitelistOfTiers['0xa38d48a063b70693d557e88ff058d4e25897e790'] = 12000
whitelistOfTiers['0xa3320f745611cf004bf02b8186d89ab2304a9fa9'] = 12000


whitelistOfTiers['0xa2ba2e29d1cde1b40c510dd0c6d29f062942a83b'] = 12000




whitelistOfTiers['0x9e218c8006c8e068c0a3ee3f686c69e3a6c60bb1'] = 12000
whitelistOfTiers['0x9c54feb9780367da0e5640a2ad2d9394f6de9d00'] = 12000
whitelistOfTiers['0x9c37b1e0c2af0c5a8bc4ba129e82bff6681cfdeb'] = 12000
whitelistOfTiers['0x9bacaec9626e537072882077386d41a0c01fea25'] = 12000
whitelistOfTiers['0x9b62a7ed23e6e2822ee8045694ef0db9eb099cc7'] = 12000


whitelistOfTiers['0x9a085f2e54020d8666c74f7f3f26d8460a005654'] = 12000
whitelistOfTiers['0x99e2478a6d5ba3f6de8da9a3627828d29a5c9fdd'] = 12000
whitelistOfTiers['0x974ffac12d64023f6996980d9ed7e417bd5dfcd1'] = 12000
whitelistOfTiers['0x9720621a4950db9f6e116db8c4f6f7ebfa5ba65a'] = 12000
whitelistOfTiers['0x96e73af1357af120d3e14aae4a7754bb01c51856'] = 12000
whitelistOfTiers['0x93767283063ef6953746bdf0620a459c7c3a791d'] = 12000
whitelistOfTiers['0x9281506af775654aac4a6042c911cced055610db'] = 12000


whitelistOfTiers['0x915fc7846036812ac67185bf1f00a4f6a5950304'] = 12000


whitelistOfTiers['0x9126db24cd5a5b013071b6bf6691a5da74644e3d'] = 12000
whitelistOfTiers['0x90c1baf7329d403be8ed9e1f4965b09313994879'] = 12000
whitelistOfTiers['0x9096c76c40e3b8fd9bd1cabc97f52ed14c442b23'] = 12000


whitelistOfTiers['0x908c353e4e6fb2e2d02133fc2f476c1a44a45477'] = 12000
whitelistOfTiers['0x907991f4d72540defac10681e9582b5010253932'] = 12000
whitelistOfTiers['0x8f7dbfcd138bf1e8e1e86f84158f868973a7ae97'] = 12000






whitelistOfTiers['0x8d05e9ee6189f2d29b2636af95d53935c49d3490'] = 12000






whitelistOfTiers['0x8516e9326f2058b95ed9a6433d11dec9f3ea3c94'] = 12000
whitelistOfTiers['0x84c78a09528148315bd1c36437a23ee77236995d'] = 12000


whitelistOfTiers['0x83d8308e501764f1666a593ba8da90afa35d37e5'] = 12000
whitelistOfTiers['0x83461810681ada10378edba6534fd739d95b85cd'] = 12000
whitelistOfTiers['0x8340a6bdfde254eb3f5a858bf23d30e28e3b32d7'] = 12000
whitelistOfTiers['0x825d4d5db368ec8bff144737e6c74bdaea128270'] = 12000
whitelistOfTiers['0x824fe5b4423b6b12795dc87878a7e0a9d3c42336'] = 12000




whitelistOfTiers['0x8055d4602014737c027d3178929c569083601a8d'] = 12000
whitelistOfTiers['0x8018326b1b919fdc272ceca624aa56c6e49af00c'] = 12000






whitelistOfTiers['0x7bd0a08477f1c4b058a12ddfd47d486f6f042168'] = 12000
whitelistOfTiers['0x7bba1d555ef3faa2a9b4799f82b1d5171aff9c1a'] = 12000


whitelistOfTiers['0x7b520828d94780691c5f76026f23934a22b5e54d'] = 12000
whitelistOfTiers['0x7b0915188cd4a006d44406a97f2b69a8cf94c9e8'] = 12000






whitelistOfTiers['0x79b91f5438304fcb805c6df6d8e517ba25959062'] = 12000


whitelistOfTiers['0x75fc9e75e58ae70e7c65613d008e33ee4670dccf'] = 12000




whitelistOfTiers['0x72c2337a50e99b80599fe433aa05bfc4adaa0906'] = 12000


whitelistOfTiers['0x6fa31bd3c2d9f489d4d1586d5268d0577cc3bb57'] = 12000


whitelistOfTiers['0x6f18d619441aa268a72bcedcc7204d712ab8773d'] = 12000


whitelistOfTiers['0x6de3d49cad8f357df6dcba0f8e319227b5999eaa'] = 12000


whitelistOfTiers['0x6c75153de1b59cdc85796d846e5f612a4faac187'] = 12000
whitelistOfTiers['0x6adab465ddd85a3aa7ce7b56b17623527b8c8318'] = 12000
whitelistOfTiers['0x692dd3ea0b69055842d5a8e8988a3c555906a0d4'] = 12000






whitelistOfTiers['0x66287efd9b87e531e30007a29b4345cacdcd6f6e'] = 12000
whitelistOfTiers['0x660bd9860ca0934521bd289a12a3ce6df12246fd'] = 12000


whitelistOfTiers['0x65382c6dcad251ecea9000497c683f7aa3850af1'] = 12000
whitelistOfTiers['0x6469ff9377555e90ead70943dd0ff7d34e3a1f53'] = 12000
whitelistOfTiers['0x63ddd546337a69d9eff524931d5ea19a55301c83'] = 12000
whitelistOfTiers['0x63db8b27f01e42f8bd2d471083aec50af17b9e76'] = 12000










whitelistOfTiers['0x5fc29c8e2fc2c79faa506e33a9b0de5f46ec4496'] = 12000
whitelistOfTiers['0x5f7a8cc019efddeddecdd9cda7e1e9afad1fbf01'] = 12000




whitelistOfTiers['0x5b2c8dc5764db8364445e9c2b577f4e00fefb8e7'] = 12000
whitelistOfTiers['0x5acd91f7c4cb874a4b13bd0ef85e99644f0a898b'] = 12000
whitelistOfTiers['0x5aa520eef055d564e466bbab358c7d00769e6e37'] = 12000
whitelistOfTiers['0x5a5dd041df0f00f5e423dd2fa04a82e51caed02a'] = 12000


whitelistOfTiers['0x58b61d71a801beffe49ed1a8e01a908be965ca1b'] = 12000
whitelistOfTiers['0x58a7a82292be5e0fbd92c8c22091a72713f12389'] = 12000


whitelistOfTiers['0x5844a7b841e53487f218f265530e1117e7a57e76'] = 12000




whitelistOfTiers['0x563b7929fa614271a2c3a2f1cbd1dca4617973b8'] = 12000
whitelistOfTiers['0x55d5bbe8e9532f18426af58f9adee674c21ffaf2'] = 12000
whitelistOfTiers['0x559dd2af5161155d2bb5c15fda719be8961aac2a'] = 12000




whitelistOfTiers['0x5478047b6d834fbae8b5837b0c62e93d3da9ad75'] = 12000
whitelistOfTiers['0x541e7fadc7caec5f916075bac8159e8179385746'] = 12000


whitelistOfTiers['0x5199e8745f0f447d2f3de6aae4a243581c59d9f7'] = 12000
whitelistOfTiers['0x5025ab6d4b86c2d4e4c27220f8fcf58dff846297'] = 12000
whitelistOfTiers['0x5003569a54d00e436f02b08f04ec8554dd933d39'] = 12000
whitelistOfTiers['0x4e1894cb5c7f530a7eb1579a297a39276ba233dd'] = 12000


whitelistOfTiers['0x4d3a8ae88bcd6f84e1b252d4cfa985816a764ad6'] = 12000
whitelistOfTiers['0x4d19d1a0c63a6b3a7a4f94e387213cfd45806905'] = 12000


whitelistOfTiers['0x4ca954163d30013cd16aa6a257853bbad8bf892b'] = 12000
whitelistOfTiers['0x4c838d2dfef66c999427e06b4170e9434f3f292c'] = 12000




whitelistOfTiers['0x4aa60ec42f6289f57cd8c318f64726d64f72bf86'] = 12000


whitelistOfTiers['0x4a13786b88616b08248b20741aee9d330fd1e81e'] = 12000
whitelistOfTiers['0x4a11c0a4b308f422e5f596df695daa45578dfead'] = 12000
whitelistOfTiers['0x49ca6ec6dc09e590a1b59080a7e982a8fe0a19be'] = 12000
whitelistOfTiers['0x46e5665ec798c34a467ea4ba632603a5ac58c0ff'] = 12000


whitelistOfTiers['0x458dce2d71947cf90f5cfd6e29af6b338d99b962'] = 12000
whitelistOfTiers['0x452c09da8f2037472558b47c8753ca6ff0d6d153'] = 12000


whitelistOfTiers['0x4418cf48d7b399181548569864bae1709f10d3a4'] = 12000


whitelistOfTiers['0x432f6ff36efbbfae063bb8b5e32b607ba10b52f9'] = 12000
whitelistOfTiers['0x4229e2ed47e9562f25a3633018d4d1a97ba8ea5a'] = 12000
whitelistOfTiers['0x4227b44748450561e79e90f9225b6fb74889b610'] = 12000




whitelistOfTiers['0x4121157dbe6b13d437af74482b77d8fed29a6a26'] = 12000
whitelistOfTiers['0x3f219e3f1a061a09ab755d7330b481e2ab5a5ad9'] = 12000


whitelistOfTiers['0x3e5042380f3275d1495bfb83cbd5055a5365712b'] = 12000
whitelistOfTiers['0x3d9b1924567e8a7fd91556e128345315ca22a3bd'] = 12000
whitelistOfTiers['0x3d120e03cb6d2730a4b11071b4fe454f0f7a475c'] = 12000
whitelistOfTiers['0x39b8d115be7ab3d3e3119bb7360a36a1a1590788'] = 12000
whitelistOfTiers['0x386eaf0ba0bd3feb039c5536598f1b10b6205568'] = 12000
whitelistOfTiers['0x3838375eb0b5a57c8ef8e0cfc509f84c1c5ddc5f'] = 12000
whitelistOfTiers['0x36cd74d9262b45aa15c5bc597912ae4b68ac0d63'] = 12000
whitelistOfTiers['0x3533b0b2f5e079cae7669ea25eaf30457e2ed0b3'] = 12000
whitelistOfTiers['0x34ce401afb4298a999662fe4cd54fad48b26428c'] = 12000
whitelistOfTiers['0x34a0a160089f4578170f8b2a517d0c114e1bbcff'] = 12000


whitelistOfTiers['0x33a869786e3328d4473a5db310af6cf5562456cb'] = 12000


whitelistOfTiers['0x32fa4c9ec4c70ef1287474d4332e24c35a6dae30'] = 12000




whitelistOfTiers['0x3100a282b39416500807c96efd50b8648c7a96a9'] = 12000






whitelistOfTiers['0x2f9e9a7a3e0fe9e916dc5db4d0e6db90f5cf21b9'] = 12000
whitelistOfTiers['0x2f0970dbb18731dbf2240274e6353a8bc6f50a8c'] = 12000


whitelistOfTiers['0x2ae728b18fda47a143dc5230fec8aee39d281353'] = 12000




whitelistOfTiers['0x29ab376570ba8e4d56c852c35b172e8e96de3906'] = 12000


whitelistOfTiers['0x2894e645e46a26dcb93f592fff993c8a5cf9424e'] = 12000
whitelistOfTiers['0x27cc451c91375182a9737b7d7e567543a51a4a23'] = 12000




whitelistOfTiers['0x2685028ad00c4d3c267884e514c64faf8872782c'] = 12000
whitelistOfTiers['0x2571dcc7d882c474773a9e43121437244638913d'] = 12000
whitelistOfTiers['0x25594d159e5a6af651aaaf012a678211c01cd1ae'] = 12000


whitelistOfTiers['0x24c29b771fbb80bd3f0ab5183f143a15433869bb'] = 12000


whitelistOfTiers['0x23ae3c8dffe54f78ecd90857dfe1b20b7ce4104b'] = 12000
whitelistOfTiers['0x23765edebd610d5d3f66ba0a980679fe5d4b8a83'] = 12000
whitelistOfTiers['0x223fef6dc695d50e8997bb7a8cd3881339592c9f'] = 12000
whitelistOfTiers['0x21d6f0533becc607a40e7dd5e63403083ef85649'] = 12000
whitelistOfTiers['0x21a13927506594d206ca03726c9277e0fed0fe19'] = 12000
whitelistOfTiers['0x20fb480b3276be4e2534beef383a7e907b37b4b4'] = 12000
whitelistOfTiers['0x2036d5417e963825de1299d88cf8a7b5d61b5c8b'] = 12000
whitelistOfTiers['0x1e11e8640487881096df8c35c3a8acb5da164bc7'] = 12000
whitelistOfTiers['0x1df278f12db26036b26ad7938e018dc17dc1af8d'] = 12000
whitelistOfTiers['0x1c77d8be02c34c054202ce8b6db678a20a90fbcd'] = 12000
whitelistOfTiers['0x1c718d051560b330c36aadb5880b91af2e58af89'] = 12000
whitelistOfTiers['0x19e30e77d41af80bd5777889962e198f8ff11685'] = 12000


whitelistOfTiers['0x192da6815fd737a825582a154d37bf0db1f7a6c6'] = 12000
whitelistOfTiers['0x17fa501800f428a0ce60dde1839a19b04994d5c7'] = 12000




whitelistOfTiers['0x178040d84289dd8338e02eb7d9799c8a32b4d3e5'] = 12000


whitelistOfTiers['0x1678c1c9e6ee8b492a71b60a54686273421b0fa7'] = 12000


whitelistOfTiers['0x150080736bf3bcd671f5b42759d5bb46ac16305a'] = 12000
whitelistOfTiers['0x14943fedd08aed0dc76a04e2ee3f2f3c1abdfedc'] = 12000
whitelistOfTiers['0x137988d16774380983a755aa9a394ecbf88d5c70'] = 12000


whitelistOfTiers['0x108882e66bd8cfbcf629096dc833eb50cb5702a6'] = 12000








whitelistOfTiers['0x0cc86f4ef981a13fc31c8405a68f2380916fa411'] = 12000




whitelistOfTiers['0x0ae4673323499ad5ad3b7c7b07bb1d2542df31ee'] = 12000


whitelistOfTiers['0x09fcd46996efe1805c9699bff28b48e920f98ec5'] = 12000
whitelistOfTiers['0x08fb8a6aca134f475d9e5dad90e9144ff31e7d27'] = 12000
whitelistOfTiers['0x08e0f95e99324d0b210e29a08d0a5cba191d3f22'] = 12000
whitelistOfTiers['0x08636f95c594ae53080eb78462454bbbacdf37ed'] = 12000
whitelistOfTiers['0x07e86e5bc9d3284cd74108fa97043c5c236a3a09'] = 12000
whitelistOfTiers['0x078a930a8f0d40d3825309d507da0d6d88d31f43'] = 12000
whitelistOfTiers['0x07266611a9000c0225cf1501020ff0b058f0e6cb'] = 12000
whitelistOfTiers['0x06422e3d92065ae8f7b544b8f3ebc350d94775bf'] = 12000


whitelistOfTiers['0x0587d87d03c11e3956f5003ddeee3b1b1fa0001d'] = 12000
whitelistOfTiers['0x053c1e1131e5b1b7fe59c8b99ad2fd317e1756ab'] = 12000
whitelistOfTiers['0x04789ab8fc41276893b43afa1ae1ecc81b3198a3'] = 12000


whitelistOfTiers['0x02820082574b0a022ba3192b8f99b25f7cc03a96'] = 12000


whitelistOfTiers['0x00e8bcdabe2f77f483008bc0a54a86caa423bef9'] = 12000
whitelistOfTiers['0x00caeef8a05f182d3197014db85b706875fc263a'] = 12000

// Tier 2
whitelistOfTiers['0xff02e651a6667a4954c74861c4eeb616d2142826'] = 16000


whitelistOfTiers['0xfc9adce991e0d07e1924729e20ffbd0c2e26021d'] = 16000
whitelistOfTiers['0xfb199c068346df357c300c9cfce9d16c8a89a496'] = 16000
whitelistOfTiers['0xf6880bfb03491308f38238d2dcbab323fde44d80'] = 16000
whitelistOfTiers['0xf646d2959f6070b3c85bc4e500ea61b9d22f494b'] = 16000
whitelistOfTiers['0xf5ad2e6916bae566d61f247debf7495570497516'] = 16000
whitelistOfTiers['0xf47711741e20e6e86265631790e42e85b81a0607'] = 16000
whitelistOfTiers['0xef9e97190eae03c8557315739ff79d837c056272'] = 16000






whitelistOfTiers['0xeb5e788f485ce94185675ee12c0c202623229f12'] = 16000
whitelistOfTiers['0xeafad57e62faf6fd9673b7e135988356ddcb89dd'] = 16000


whitelistOfTiers['0xe93086375044d0ac07acb498bf6d8b25bd53fcb1'] = 16000
whitelistOfTiers['0xe72bf2d276b8fa6dcb083d59b6daa927c8e03708'] = 16000
whitelistOfTiers['0xe5348acca3061a742af08be6b6d102879e06b8c9'] = 16000




whitelistOfTiers['0xe09ea7a85da161ec1b44febf8ebc48d2bb9b7a8c'] = 16000
whitelistOfTiers['0xdf72106a04e691750bd27b3a0593033199111696'] = 16000
whitelistOfTiers['0xdd1ae861dfa578a25d203d60fd4d6974a8bfbc5f'] = 16000
whitelistOfTiers['0xdc8c1628be76e0733cc9a13777f0f991ee00fadf'] = 16000
whitelistOfTiers['0xda947fada43b8741e94bf7b624996c07d2e4787e'] = 16000


whitelistOfTiers['0xd835a25d165e89d0a1b9b9f4869551ceabb3f67b'] = 16000


whitelistOfTiers['0xd593be7d470ba396c180229308edab4e60b98479'] = 16000




whitelistOfTiers['0xceb93ba06a37ce3b56f3db3baa92cfeda9e552a3'] = 16000
whitelistOfTiers['0xc918f087ca920eaa200621736a2e01ab3aadd551'] = 16000


whitelistOfTiers['0xc69562dacc399d4a8772e4f384dd88ca2ac0a2f0'] = 16000
whitelistOfTiers['0xc5bcba92f684a4575422c72451175f2d2552bb3f'] = 16000
whitelistOfTiers['0xc4bcb71f79d3d864f1f4bf6521cce5b55980a64f'] = 16000
whitelistOfTiers['0xc332ca20c689cb769650890b14d26a648e7d7f18'] = 16000


whitelistOfTiers['0xc1a1853a7d15fdbc8ac73d199b7e7b785a56c6d6'] = 16000
whitelistOfTiers['0xc0a8f60baa29260560a6297fa7a196bf0ed7ea9d'] = 16000
whitelistOfTiers['0xbf23500d21f2ac732272a5465f03e5b8c1b19177'] = 16000


whitelistOfTiers['0xb9dfa2815d4e0c0376e70d25acd9860972a3f1de'] = 16000


whitelistOfTiers['0xb82c2fe4c4c04391bcd1c99d3d55dd78d749e459'] = 16000
whitelistOfTiers['0xb82530dcdc404ae5f265a387fa0467f38f60d3c7'] = 16000
whitelistOfTiers['0xb768f4ca02e1278da8018d7845c4d815b853b759'] = 16000




whitelistOfTiers['0xb1ddb29e5029ec752ad531a8e0052cd690fcd1e9'] = 16000
whitelistOfTiers['0xb1d7b2dd5f2f5087191d58bed290283be049721f'] = 16000


whitelistOfTiers['0xb085f6ddfe001bbae8326e97f5c33afe4bab80e2'] = 16000


whitelistOfTiers['0xae9a3f6740d92fe65a616995fac66ac6fd117f0d'] = 16000
whitelistOfTiers['0xae27fff3dc99ee143a39a59609d56b7654b87385'] = 16000


whitelistOfTiers['0xac0f84ef290353f238a4e9642b6a0308954a433f'] = 16000
whitelistOfTiers['0xab68c6505b37d786e0696bcd45bae2c71b1731d4'] = 16000
whitelistOfTiers['0xaac36c087f4310344966ef9234f99aa88e92a16f'] = 16000
whitelistOfTiers['0xa8865ad1cdcac7fb682a6178fd4246ff19f87b8a'] = 16000
whitelistOfTiers['0xa8042917e7c7164371ba72f3c2204cb21810e5c5'] = 16000
whitelistOfTiers['0xa73806a87f747161e6055fe8a62a212f71c17cdc'] = 16000
whitelistOfTiers['0xa5b84d994793b16a48e8d0295cd0ee932edf88bd'] = 16000
whitelistOfTiers['0x9ef386ad9044d38d8272f591d4e4c154b3b11fc3'] = 16000


whitelistOfTiers['0x9e1adea4febade82822001a62e28248308110e05'] = 16000


whitelistOfTiers['0x995ef753e42afd7bea8a546fdcd2154feed34ecd'] = 16000




whitelistOfTiers['0x961bd96cfe73760ef3f9bb65a6af212cbe41a66d'] = 16000


whitelistOfTiers['0x952580d41f10db41d97fcd6b1984bc2538eefc2c'] = 16000


whitelistOfTiers['0x930cacebf20c0083fc77ddb27ae49bc7466b444f'] = 16000




whitelistOfTiers['0x848c31c476f2a33dcd44a35486fba93ec47ebf64'] = 16000
whitelistOfTiers['0x843cd307b3374162c1ca3c996af15adca1f91c51'] = 16000




whitelistOfTiers['0x7fe8e1fc90f6a49e0528574feeeeeeed5ccb3168'] = 16000


whitelistOfTiers['0x7e28936b626a4def0b593948af9f2f2e2898dc6b'] = 16000
whitelistOfTiers['0x7c50e6689e57422979e21858cf7ff5bde1ff3637'] = 16000




whitelistOfTiers['0x794966456b36d362666f3b6f604cadd70bab8c76'] = 16000


whitelistOfTiers['0x72e8b27a710120cc6e087eb8e883b590b12775a6'] = 16000
whitelistOfTiers['0x72be0aee75afeb770ae7565838fdda70222713a6'] = 16000
whitelistOfTiers['0x727fd056226001f2f13056472144835206e49a8c'] = 16000
whitelistOfTiers['0x6e72ac91d8503ff128f6884b944f85a685f3333c'] = 16000


whitelistOfTiers['0x6bed7bbb6c7a8c64072c78ccf2ea255ecc55e25d'] = 16000
whitelistOfTiers['0x6b51121cbea3ab7b7f1d5465afa98200b8e88364'] = 16000






whitelistOfTiers['0x653850fe5d334ed6aadef2a1f85504d9d8ad5ed8'] = 16000




whitelistOfTiers['0x5ef28cc910438dc5b97bb2fff3c396b745bfea67'] = 16000
whitelistOfTiers['0x5e022bc6069e794b3ace133456147cdae7f63a70'] = 16000
whitelistOfTiers['0x5dad3c6766fdee4418c823b942e8a020ad8a8697'] = 16000




whitelistOfTiers['0x5a57c3c12d4a9dc9c3c9fa76983f1bb1346cbc47'] = 16000




whitelistOfTiers['0x567beae1a922c70fd0918b40267978aa385260f7'] = 16000


whitelistOfTiers['0x539b8447cbe9f759b39d551c928b3cad424f9c74'] = 16000
whitelistOfTiers['0x5269bd8a209f8088cafe5840e538d2aba8c80424'] = 16000






whitelistOfTiers['0x495edde127a15608cc9787313a4b63723fdabddc'] = 16000


whitelistOfTiers['0x4819f971a55ac31f8917f63988cbec9f14ebeb02'] = 16000
whitelistOfTiers['0x46f653c254b445a9a17f565cc729f118365c4058'] = 16000






whitelistOfTiers['0x3fdc2814ca7a6aa4a54cd896c93574ae06d3c467'] = 16000




whitelistOfTiers['0x39b3f091f9335b7ccd85812b0a587bc3a43b0926'] = 16000
whitelistOfTiers['0x33822df32268e7befb00775cb808278e53eb4341'] = 16000
whitelistOfTiers['0x3263e446fcfb1f29133afe408dc52062890ed6af'] = 16000
whitelistOfTiers['0x30a34e2a7d300a9b4da5430076c08c93623f6fcb'] = 16000
whitelistOfTiers['0x2e4de8ec0395038065bfceb2df6794b0ef26a304'] = 16000


whitelistOfTiers['0x2a86b2b85a305fcbd878c3f58999a63fe6f63c5d'] = 16000
whitelistOfTiers['0x29a2765e67d13e734890f9e9bfa19c1a67164b35'] = 16000




whitelistOfTiers['0x2793487d45b8f5bf4183eefbad6351660d8cf80f'] = 16000


whitelistOfTiers['0x25252e08d3990ce1a2080f394abf9340bc64c870'] = 16000


whitelistOfTiers['0x22b54499938baf2c52e0136c0008d420f1453d2f'] = 16000
whitelistOfTiers['0x2143caa1473210811e4129de81ad95e7eace68b2'] = 16000
whitelistOfTiers['0x208a113951103f8b46bae97a9c660130539c9ab9'] = 16000




whitelistOfTiers['0x1a63dd0ad8d940209113336dae0f8db16b28daf6'] = 16000


whitelistOfTiers['0x192f06ff5843dad37dacf196a9e52c2373cf070b'] = 16000




whitelistOfTiers['0x16f160179af00f7533dfad2f2ec03de4234d787f'] = 16000


whitelistOfTiers['0x14f8ee32beef2b9483a5bc551dc12b8403bc7f15'] = 16000
whitelistOfTiers['0x12fc866efce4bf61719a2ac761ae85ff4741223b'] = 16000


whitelistOfTiers['0x11985427103bc10e0df07c724ffd04e7c2601dbc'] = 16000
whitelistOfTiers['0x1007336ddb520de5e02ecdbcec519e1a8677a642'] = 16000
whitelistOfTiers['0x0d49b835b11865c85ff0b1293144fefad82ad961'] = 16000
whitelistOfTiers['0x0cc35cc16bd34454c834acee22e632592931415c'] = 16000






whitelistOfTiers['0x0bc198730a51da28a75ac0abf008c29e36c6f777'] = 16000
whitelistOfTiers['0x09e44ae707c8999dd7cc886679a528cdd7ddbb0f'] = 16000


whitelistOfTiers['0x099c89b5ed0e0d03e21db6e96818de36341f9605'] = 16000


whitelistOfTiers['0x096d04263c6e5beeb92e9a3378c01eeaa5db3c70'] = 16000
whitelistOfTiers['0x084da796de1f3116093a3466fdec560c5a2a837a'] = 16000
whitelistOfTiers['0x07a39677e6664f08f6763b82489b8a0ea52b277c'] = 16000


whitelistOfTiers['0x057d68194366c4497e826fc5095261474a41f2c2'] = 16000
whitelistOfTiers['0x02c97a7cf58fc7ee824c46f021799346361e212c'] = 16000
whitelistOfTiers['0x023a31e9d129ca1ff106e207b1107883d137ac7e'] = 16000


// Tier 3


whitelistOfTiers['0xf950acfa3a2a68a06fe076f91dcb9e63539b7044'] = 22000
whitelistOfTiers['0xf73be1ba17b40b4f26f07896fb0e6a32b0bb393a'] = 22000




whitelistOfTiers['0xf6a2147fcf86ddc23e503c673cc1da2ccd0b5183'] = 22000
whitelistOfTiers['0xf1bf99e81391860655d67c6482b838ed8f8be06e'] = 22000
whitelistOfTiers['0xf186aea61d620fce715f78ef83691dafc2a33c8c'] = 22000
whitelistOfTiers['0xf180880b28ab5b35ef07617e2f6450f72549f7dd'] = 22000
whitelistOfTiers['0xeee062d91e4570b64c653f8e4a0a5a5ccb523520'] = 22000


whitelistOfTiers['0xee2772a147a1b96e71675542e1e71341118e3424'] = 22000
whitelistOfTiers['0xecac3e269fb7a9d6bb6914c3b207ba1e63cb695d'] = 22000
whitelistOfTiers['0xec0edabcb6461f21d2127c9c23b7203788917a60'] = 22000
whitelistOfTiers['0xe91b25dda3467de8149a92419bc23e72c229985d'] = 22000


whitelistOfTiers['0xe73048a492e37c9f5f46b0c893a1bad4452674ea'] = 22000


whitelistOfTiers['0xe59831c9fff6234ba58dada0652b79bc61e1031c'] = 22000
whitelistOfTiers['0xe3d5763d4acb39142b212600797edb3ed02bb47b'] = 22000


whitelistOfTiers['0xddfbe6c4f9fa0bea28358b6e2c2f5773f0b59f9a'] = 22000
whitelistOfTiers['0xdd3b505a492f82b27d80d3f7a1646bb75d0e0f9f'] = 22000


whitelistOfTiers['0xdab1e387e421b95e1e2ad444cc4d024a22339c17'] = 22000




whitelistOfTiers['0xd903eec9f83e5429c2a5092d53416cefc49a9b54'] = 22000




whitelistOfTiers['0xd5c443aa9caca6d63496087da38b99d2b4b7e5f2'] = 22000


whitelistOfTiers['0xd2b969696570c46b17e764f5e2edd0cea43135f7'] = 22000
whitelistOfTiers['0xd11836ccd43461dfabb4728adddfbd21335c04bc'] = 22000
whitelistOfTiers['0xd00312b261061b6ccba99c069cd3a4e89006c32d'] = 22000


whitelistOfTiers['0xc986d549e2e4349e275d560798e0e97399b39ea5'] = 22000


whitelistOfTiers['0xc765cc3d0d04739921db5bef233f75e35c315450'] = 22000


whitelistOfTiers['0xc65584fec4cee6f6e0411f278a61352886e501a8'] = 22000
whitelistOfTiers['0xc5dd2bbc5ac7b89240c965e548e45e5a56f70e13'] = 22000


whitelistOfTiers['0xc21a818e977a5a15315263bec8ef06360ec275b8'] = 22000
whitelistOfTiers['0xc1b8178a3c71a022abf17bf4f35ce74158c0b17c'] = 22000










whitelistOfTiers['0xbdb63e2b7543909355405a4778a76d848e44a624'] = 22000




whitelistOfTiers['0xbc8ba21e6f888faa539e8e8690af2b722e7f376f'] = 22000
whitelistOfTiers['0xbb30b2ee3dfa7db460d91769239e358c3a55abae'] = 22000


whitelistOfTiers['0xb88f946db00f558da29c56bda454c657c2372908'] = 22000
whitelistOfTiers['0xb81a47e2199c8163076211825c6c71ba15ebbf8f'] = 22000
whitelistOfTiers['0xb6400d26ab09ee3f9988453c46ff16a179bed4ed'] = 22000
whitelistOfTiers['0xb62a4295bf3fe3d50c259c2d9537cdbc66483458'] = 22000
whitelistOfTiers['0xb5f4aa1b752c4017787bafd16219f4105e2d6602'] = 22000
whitelistOfTiers['0xb2f6290ee8089d5b7147c7e92f1efa01b4b25be0'] = 22000
whitelistOfTiers['0xb25e844b1b8c2de204bb39e173fa1d6f205ec5fa'] = 22000
whitelistOfTiers['0xaee2b529d29aa9cd4a56d9778ce088837c4b2e0a'] = 22000


whitelistOfTiers['0xa8bbe616a51a2b1c2f4bf47ebabf12cfcc4a2eed'] = 22000








whitelistOfTiers['0xa3e6fd8a3c9a0b413b963d5bd1a6f1360cbeaef5'] = 22000
whitelistOfTiers['0xa25207bb8f8ec2423e2ddf2686a0cd2048352f3e'] = 22000
whitelistOfTiers['0xa1ded99613ff4cb3a5450d3ebcaaed31cf42e8bb'] = 22000
whitelistOfTiers['0xa06e1abceaca0e9530937849779d272ef27cee77'] = 22000
whitelistOfTiers['0x9fdc583b6a873fd28c0a72aaad9389250110804d'] = 22000




whitelistOfTiers['0x9a10b8faeea84c2aca3036370243bb43ffafa1a2'] = 22000
whitelistOfTiers['0x973c11c671c002bb6aea2aa0f695e98fa8d9f8ad'] = 22000




whitelistOfTiers['0x925f44a1d9cff9451d512de15125a5a899cce3d1'] = 22000




whitelistOfTiers['0x904d749c251fad66f0aa4faecd71b4f034d73e1b'] = 22000
whitelistOfTiers['0x8f697f7a3c5e6ff422237b2edd5d4779a0cadca3'] = 22000
whitelistOfTiers['0x8ea57c6a0ec7f0b45f5c357009a817faae1d811b'] = 22000


whitelistOfTiers['0x8e72a4ecc36a4d9221e1522809f7cedb79069e88'] = 22000




whitelistOfTiers['0x8d184554460c7b49283195e56b79d0ac18e18db5'] = 22000






whitelistOfTiers['0x8a398a5d720e5e3fd85634ed7ce8d865916f5ec1'] = 22000
whitelistOfTiers['0x89df5704832da21d634dbe50f42bbe9e61835a08'] = 22000
whitelistOfTiers['0x858e4672885ba3a28b2dd7c77b24efe90c1b467f'] = 22000
whitelistOfTiers['0x843b749807f8517f2c4ee51eb12b9b02bd974c7c'] = 22000


whitelistOfTiers['0x7e274b869a4bc911afae8fe58f62a2af950a905b'] = 22000






whitelistOfTiers['0x77b17a82a244179ebb700357a39d10156aeb67ae'] = 22000
whitelistOfTiers['0x75dc4697f6404c7d69aff8a13ede0b9284831597'] = 22000
whitelistOfTiers['0x739e21f0598cc7598a3ec565a9f72c79e439197d'] = 22000


whitelistOfTiers['0x7189ae5e0c7b48e173a8d006264c5fb6b411fee2'] = 22000
whitelistOfTiers['0x70a119f88dfbfda4d8ae55cf9fa1c19ebb84d88d'] = 22000
whitelistOfTiers['0x6ffbca4259dfcec4b72bed5008704468208e7635'] = 22000
whitelistOfTiers['0x6faad1da4c1d08e082faa46d1bddb865ec21a89d'] = 22000


whitelistOfTiers['0x68db64a8cc0aea50b479bdd5bc3b3dd5e5821ed4'] = 22000


whitelistOfTiers['0x66dff43bdb17c8fe74bcbd0f1312fde6846758b6'] = 22000
whitelistOfTiers['0x6692df0d97cbb783c02992326b70eebb52eb4add'] = 22000
whitelistOfTiers['0x65597228764670cbeed238756954beb94316a080'] = 22000




whitelistOfTiers['0x626cc9d0e93606b41774d350df0a26b276c880ef'] = 22000


whitelistOfTiers['0x613c15d6bfebfcfca30f601330e05f94c3872fde'] = 22000


whitelistOfTiers['0x5f82374a3d7cea30fae4b3d1b0c0a007690c39c1'] = 22000
whitelistOfTiers['0x5a91bdbefcb6087c277b35e4e1a0805815c2ed97'] = 22000
whitelistOfTiers['0x59b6379b82da1f6f744379b71d3820e2c94c83d1'] = 22000
whitelistOfTiers['0x53d09055e5b96b676816b1bcbbc20ff00df6f8ab'] = 22000
whitelistOfTiers['0x531aef5951bb48d5a1df224c5a9585203aec8479'] = 22000
whitelistOfTiers['0x520a32f9ae2679868741f2d76fab13ae60863fcb'] = 22000


whitelistOfTiers['0x5117f34763afb68f494753f976cd1b4ab7d9bfba'] = 22000
whitelistOfTiers['0x50b544eea9297b65e578af269e5d4d6d747721d9'] = 22000
whitelistOfTiers['0x4ec7f4bbc09d76b3e06a80c065fa3206e4a085c7'] = 22000
whitelistOfTiers['0x4e084e1c070c4750d4f078df855652c56f1e67d9'] = 22000


whitelistOfTiers['0x4ac8e173a3278254030f2329614abfef3cef6149'] = 22000
whitelistOfTiers['0x4a9f17f0ff0ad6b9d787529242451b6a234a57ef'] = 22000
whitelistOfTiers['0x4a391976a086ced392372ae29800ac276b2598d8'] = 22000
whitelistOfTiers['0x492efea3e874692e9d986369830bf3e2d9a21f9e'] = 22000
whitelistOfTiers['0x48712b981a43ea810fdea2b915651efb0ca79d5a'] = 22000
whitelistOfTiers['0x482d8e2a22915c891d1810b77e40071d90b1cd32'] = 22000


whitelistOfTiers['0x4341b08219cc559da79ec173bc30ab383ef6e63f'] = 22000
whitelistOfTiers['0x40d36354e34db1c515fd71b5c42dc3f6d877825f'] = 22000
whitelistOfTiers['0x3f947633c9a8fcd9a90318b84aa5c7ed2b2eb941'] = 22000
whitelistOfTiers['0x3e0159c06e12f8322b2958d289efc08be2ca9705'] = 22000
whitelistOfTiers['0x3db5e4513d83e5755e7562dc4dd2e23d9d4efd48'] = 22000




whitelistOfTiers['0x3320495a78798b918d986a73a7620682fd71a035'] = 22000
whitelistOfTiers['0x3312a5d4f53020fb4b436f85b4b9054f0dee510d'] = 22000
whitelistOfTiers['0x3288ad9b8e7d32f698ac35de51ccc18373e33a85'] = 22000
whitelistOfTiers['0x3266aa89cc083d1d42d2a83199f60594b95a9b86'] = 22000


whitelistOfTiers['0x304218ddbb32d34048d80b05da3dd11fec81550a'] = 22000




whitelistOfTiers['0x29776a47d6480030ca860479ed3000c4de8cc89b'] = 22000
whitelistOfTiers['0x2964bca45cff481731cfa0c18a1e52fed6a4f249'] = 22000
whitelistOfTiers['0x248c1ef2e908a5c6bc09c8c19ba8c33dde5bb56b'] = 22000
whitelistOfTiers['0x24527d5977b3ca805855133fbf29380aa5c81baf'] = 22000




whitelistOfTiers['0x21338b44fa41e326022976bcbb80ef6775c395d5'] = 22000
whitelistOfTiers['0x1bee307511e297aa874a07e4425ca2ea96230326'] = 22000


whitelistOfTiers['0x185ec22fecc8f657325fff16b911a76749a08ffb'] = 22000




whitelistOfTiers['0x12f7f6116ab6fabd8fa36025701db3c93e80c8f7'] = 22000
whitelistOfTiers['0x0f118152ac9056fb1d8ea12c872f201ef2a3db1e'] = 22000




whitelistOfTiers['0x0b5694d0654452f412ec4bb4845765521ffab94b'] = 22000


whitelistOfTiers['0x05c69702b01b263b74a169f976e3eabb417d7946'] = 22000








// Tier 4


whitelistOfTiers['0xfcf6b927d630f4410470593f2dc8268eeaf2e93c'] = 45000








whitelistOfTiers['0xf230cf06d83aceffefd139f93992d34075588612'] = 45000
whitelistOfTiers['0xef22b9e05cea09b96f6150e1487f61e7d17ca78a'] = 45000


whitelistOfTiers['0xee40391c90788108a2a068f61189ec7044a87f5b'] = 45000
whitelistOfTiers['0xedd26d4b0a613f00d20ac64ed6d9bf9a41f7c7db'] = 45000
whitelistOfTiers['0xec5ec06495d6d41301d0d9ac81f2b923dbcb7df1'] = 45000






whitelistOfTiers['0xe4d82444f0eb435be6be34e1ad6adbfec04b5a9c'] = 45000
whitelistOfTiers['0xe2361a381779fb3fb7e1384d650bee4e70f60e76'] = 45000
whitelistOfTiers['0xe1b273d52bfd8cf45a2ed2a2f1bccb6c85b8058d'] = 45000


whitelistOfTiers['0xde98541c16829250a62ee0d23499ada0c94f75f1'] = 45000




whitelistOfTiers['0xd917948437aa86b76f92bd3b4c6b7684b63f52e5'] = 45000


whitelistOfTiers['0xd48d664965286ddea41e97784d079de981d099b6'] = 45000


whitelistOfTiers['0xd2bff128cdaa2c81c5e2e8de7201595f44819858'] = 45000
whitelistOfTiers['0xd1f2405d32e8029dbfe123c66cc2177980b505df'] = 45000
whitelistOfTiers['0xd0cc03a2a865f362509246309b53d98860d32189'] = 45000


whitelistOfTiers['0xcdf230076b0d02c18e10b42beb974b0c4213f5f6'] = 45000




whitelistOfTiers['0xcc0d8f409b149b92c089b5a9177331338671501c'] = 45000
whitelistOfTiers['0xcb2bd06eb0d46270ee8de36c9cc336b6c111d9db'] = 45000
whitelistOfTiers['0xc8c5ae8818422cc4cd30cd0b053f7586837a39b7'] = 45000
whitelistOfTiers['0xc4ae5bf3b8c765ec8d33672be27e29cd9f51ab78'] = 45000
whitelistOfTiers['0xc01e72a83d6d20b6606e54c110907f3d403c8db2'] = 45000
whitelistOfTiers['0xbfeaed35a2e08cac0bcdbdfcdbdfd454ebeb54e2'] = 45000


whitelistOfTiers['0xb4daf6e909123986457b25bca639cf9c9f8365b8'] = 45000
whitelistOfTiers['0xb4ae4070a56624a7c99b438664853d0f454be116'] = 45000


whitelistOfTiers['0xaeb8b4550048a4b818fb17167607a8373e5a03f3'] = 45000
whitelistOfTiers['0xac10e96be2b2f8ddb168716de8379db01e8887c7'] = 45000
whitelistOfTiers['0xab7c2f960b09a8da05e8928a433aa3f14c4664be'] = 45000
whitelistOfTiers['0xa8a5aef67ae47babf6804c5a31a88b5a87f15bac'] = 45000


whitelistOfTiers['0xa5eb380d092f529db25c66f9af883d13bd09eaec'] = 45000
whitelistOfTiers['0xa42bced9c903701d89e100813c54ed11d7bad3c9'] = 45000
whitelistOfTiers['0xa3b42b76843ac3f74ca87d3776ae6c6f6afe0bf8'] = 45000


whitelistOfTiers['0xa1a94663bb107e3af44baf7b34fbfabed3e17853'] = 45000
whitelistOfTiers['0xa106854dc109434ae1af6740c49c1cab1eaacb05'] = 45000
whitelistOfTiers['0xa0cdc81804c4d25d12746df5eb4c9cf51b107e78'] = 45000
whitelistOfTiers['0x9fdec305d5abe9abea39e73780a631f20944204d'] = 45000
whitelistOfTiers['0x9fb21bfed742c924fdc9068df7e117a132e2ad6b'] = 45000
whitelistOfTiers['0x9f735989432e0c0d6ebe4c03d2bc7706b544214e'] = 45000
whitelistOfTiers['0x9e34d8674ec1245efc4af7df29be2338001919fa'] = 45000


whitelistOfTiers['0x9acc84d06a209550848c2570c8ee86b578ab64c0'] = 45000




whitelistOfTiers['0x8de5c9970c5bd4bec41d450e13961088c97af34d'] = 45000








whitelistOfTiers['0x837ed29de4cab664c550b721bf26dfc028ef6689'] = 45000
whitelistOfTiers['0x8336ba7fc644072599396794cd6e7a4d15e3c32c'] = 45000


whitelistOfTiers['0x7d32af414155581cdde7b42d4eccd39d896a24a4'] = 45000
whitelistOfTiers['0x77f21f808615a970eda1e645184ca50581078de7'] = 45000


whitelistOfTiers['0x753e6bc3ff324d4a2f5b9fab4c74cadc8617dff9'] = 45000


whitelistOfTiers['0x741a7091bd01aa044bba414a8f397fd44f94eda6'] = 45000


whitelistOfTiers['0x6cc344638c345764e9d671ec0422163355e7c3ed'] = 45000
whitelistOfTiers['0x6c7a2b0ac3825be515540636ba800b8911a2128c'] = 45000
whitelistOfTiers['0x6bd4fade966e0e542299e315ff2cc9d3b663a132'] = 45000
whitelistOfTiers['0x69019b2e53b3520c085d7167556e0dd088a94323'] = 45000


whitelistOfTiers['0x66a9aab5d48e7581007513145a27fe56eff65c12'] = 45000
whitelistOfTiers['0x668d90c09a8e7759b886c3d9f832bec0f65f852e'] = 45000




whitelistOfTiers['0x625339b91b9261487b75b7a5ca40e6752bf3d4e9'] = 45000






whitelistOfTiers['0x5b989997ac34abb92b566001a349aae8a9280897'] = 45000




whitelistOfTiers['0x54b92c745db373a61af89a65ac8725acaa134412'] = 45000
whitelistOfTiers['0x5382ecce6f6f9ff05c2ae49cb103f65eee930c7a'] = 45000
whitelistOfTiers['0x52b180dc11428638a2df77980a538375f5e10303'] = 45000




whitelistOfTiers['0x4d2e039feecc8d8e004a65867003db5ca25d2f9c'] = 45000
whitelistOfTiers['0x4b22d96749b0c3089172b6c4924c1be0e9243001'] = 45000


whitelistOfTiers['0x4981a2c4655b9653ad084620b888ab204b06212f'] = 45000
whitelistOfTiers['0x48f49527383670be666ec2a3a01efd6826ba8a8f'] = 45000
whitelistOfTiers['0x47c3dcebc43b378f6a296e7b504b7cbe287546be'] = 45000


whitelistOfTiers['0x45c26f877035450c90357ba18cf5ee20f56c36ea'] = 45000
whitelistOfTiers['0x43cf5cf10f193dc8a5497beb1f2f176a7f0d6294'] = 45000
whitelistOfTiers['0x41fd0d32fca8624ab177e82bec1b663ff737d824'] = 45000
whitelistOfTiers['0x41c270a67af952a0ce16ce740df2a4eca3eed817'] = 45000
whitelistOfTiers['0x40e6614f1beb7e968d4d03de4072ea4688b09638'] = 45000


whitelistOfTiers['0x3b37db61005959fbd6f7158b39698761e125c6bc'] = 45000
whitelistOfTiers['0x3986b0c37ecb67561d1d938ed71602b5cbc44057'] = 45000
whitelistOfTiers['0x3717a5a2f138757ef82be6819d3bec11f8804045'] = 45000
whitelistOfTiers['0x3671f1ec7f149c8a5261134e44147921798cb55c'] = 45000
whitelistOfTiers['0x364e5923dfb6b33c7e452e655df38d0651463f0a'] = 45000


whitelistOfTiers['0x33a0151c1b64414869c59d220b2b5e90852d6ec6'] = 45000


whitelistOfTiers['0x2bf2d25b217ff69906216d569f8fd2c2c05deeaf'] = 45000


whitelistOfTiers['0x2802baeeefc4efc71c0d2b42a772b6efd23ead91'] = 45000


whitelistOfTiers['0x2640e31f560cdcb23969eeb70061416c8fcb82ab'] = 45000
whitelistOfTiers['0x253d520b8f0a03068afa8974b9528cccc167e1c3'] = 45000


whitelistOfTiers['0x2373812e8a9b47b0d530cb065a930b9eebae4e3f'] = 45000
whitelistOfTiers['0x23486ea838bd03ddbc941fa02ed3d67d903159ad'] = 45000


whitelistOfTiers['0x21faea821ccb09274e500b135c23221eb1c956d7'] = 45000


whitelistOfTiers['0x210af0273b0e5efcbb421dee28d13cb3bb7a9d1a'] = 45000
whitelistOfTiers['0x204089c88aef6e44abb0aade1e3469dea7d0c766'] = 45000
whitelistOfTiers['0x1fe578c4004998118076d43f9dd0f62e0a7096ad'] = 45000
whitelistOfTiers['0x1f4fed50f77b6b161acb401b6b1b785850d3c44e'] = 45000
whitelistOfTiers['0x1e3263de6d9474a5b1bc88e0775546405d7bd1ba'] = 45000
whitelistOfTiers['0x1c3d6bbd7f0cf2860b25ddbb8b1e59242fd5c99d'] = 45000


whitelistOfTiers['0x196e3672ca8faed73f409f9cb5ec3170ac8cce30'] = 45000
whitelistOfTiers['0x185303f4d9501a0dbb8d7fb8d67962a485d33e8a'] = 45000


whitelistOfTiers['0x17244a80a908d6efd9d74dcc4cf540753ceb3e85'] = 45000
whitelistOfTiers['0x144f901f77e8ff52cd5d5d46961663b08370bfd1'] = 45000
whitelistOfTiers['0x142b09e05e3ddeef22dd7ca711b6ae6e724407af'] = 45000


whitelistOfTiers['0x0d665d5fd0c8da80f9b040cab1a805ee6041e4fd'] = 45000


whitelistOfTiers['0x0cbd39d4c5d3b72f126a94c9a5990779973cdaff'] = 45000
whitelistOfTiers['0x0a90bd10e0ec11fb2d58c5cd0d95bb9472348b3e'] = 45000
whitelistOfTiers['0x0a4c23582fe96aaaa3d281c66009edc5599f203f'] = 45000
whitelistOfTiers['0x093f2107a9dac9042d39a4593fee5a053435e7e2'] = 45000




whitelistOfTiers['0x04e358fe6c6236723fb71e9860286e0cef059575'] = 45000


whitelistOfTiers['0x0279964dd1f2b3feac977a523e2f67e2a048aebf'] = 45000


// Tier5 700
whitelistOfTiers['0xfb8f733881b89bec61a75db90759f14adf5b0114'] = 70000
whitelistOfTiers['0xf9cae48e58e1ac1dbac141fc82e6581a4d99fcfd'] = 70000




whitelistOfTiers['0xf56c7ebf73203b89a107eb8ae951d5433e3dc307'] = 70000
whitelistOfTiers['0xf309aa9ae4dd03ef5ed3ca07502cf09aaa5da582'] = 70000
whitelistOfTiers['0xf2f77468353ff5b39c0e8d9543b6bdaf67eea15d'] = 70000
whitelistOfTiers['0xf26c479051f954c237ca05967192a010ba989074'] = 70000


whitelistOfTiers['0xea46896ed125e93f75838479d6424aa705d5ca5f'] = 70000




whitelistOfTiers['0xdfe26255182441906b39ae674e233bd2117311a7'] = 70000




whitelistOfTiers['0xd0ddbeb4af76855b3d42b304a96473d2bc673da5'] = 70000
whitelistOfTiers['0xcee71b95b6277454c5ed1ee57e86dbf0be3735b3'] = 70000


whitelistOfTiers['0xc29c04022f7fefd19ddbe596b9ff29a16491ad52'] = 70000
whitelistOfTiers['0xc00d1ae14bcddce66d8c60482c4a61794a9b45b8'] = 70000








whitelistOfTiers['0xb0f161160e2766f6d042a47521e5b95a249f2293'] = 70000
whitelistOfTiers['0xaadb673714f7a7a813ed4a1f2b91148274754a6e'] = 70000
whitelistOfTiers['0xa0f329f754e3ce1130a07b4794c4671ee5250782'] = 70000
whitelistOfTiers['0x9d1c35bc2b442d64d38a2e18553e5926f60b1b09'] = 70000








whitelistOfTiers['0x8c51a26d95ed3a25561ae5e55611a4c736e84ec4'] = 70000
whitelistOfTiers['0x8ac4578839382d74b6df86fa07f509975ffaf7d6'] = 70000
whitelistOfTiers['0x84390738e072ac47ebc85171663ce76608553abc'] = 70000
whitelistOfTiers['0x841ad152c54ce5029134fb04b8fbd9f85b4890e1'] = 70000
whitelistOfTiers['0x8069d5b58b0c4b309d3b1d2373411bbfefe9cadd'] = 70000
whitelistOfTiers['0x76b6996894b9cf5e8fc338eb5ba6bda4ba96261b'] = 70000




whitelistOfTiers['0x63119db512826c3f8001859db1cb8dab5ce4ebd1'] = 70000
whitelistOfTiers['0x623c82db908e138e22974a10feb593f5268ed570'] = 70000
whitelistOfTiers['0x6170d25e1029a023703e767923cb903cf7bc6e5f'] = 70000
whitelistOfTiers['0x60a1b61c840b1d67fe795e1aafaf33d766243f36'] = 70000
whitelistOfTiers['0x5f244e8a4aef69ffa993d70a79b61c59e849c7a8'] = 70000
whitelistOfTiers['0x5d7c19659c548a1459a86a380e59cfdf123c9e2a'] = 70000


whitelistOfTiers['0x5739c96553b16863643c08f3bdb2e81efc00b935'] = 70000






whitelistOfTiers['0x4de51afa292cce1853f6a515a1e5519a99aa0b09'] = 70000




whitelistOfTiers['0x404225d25b0ee44b13d67d1afedc325c7f50c2f9'] = 70000
whitelistOfTiers['0x3f083de41c18742304307e3d20de33e4f4564562'] = 70000
whitelistOfTiers['0x3bba4cdf631d6951d8387461812272afede21932'] = 70000




whitelistOfTiers['0x296dd46b0ca8ddf2af63053c59dd6104e8f3d2cf'] = 70000
whitelistOfTiers['0x29530da206209aa0484114310e6009f7160d9051'] = 70000




whitelistOfTiers['0x23274713b301a9717ac5d4bbe6e0fd33ccd8bd1b'] = 70000
whitelistOfTiers['0x2102dd8c955b31f3e1fd7e687bcbc1bc46ce8099'] = 70000
whitelistOfTiers['0x1f1108c1a8ac0feb8050c13e22b2692a5d0d3043'] = 70000
whitelistOfTiers['0x13e86bab59952d4b8c4d9ba99030b2f5d519f719'] = 70000





//Tier6 900900










whitelistOfTiers['0xcf02ac4b2a7949497db161a8c3c345bbf0ac55c8'] = 90000
whitelistOfTiers['0xcdf48e837ae0ca521a7e58e1f418a99bac589d44'] = 90000


whitelistOfTiers['0xc2ee64e79e5a07ce0cc48bf0a121bf7557a44259'] = 90000


whitelistOfTiers['0xad799d7228c4b5aaf8bd398d08f3d94ec3a081f4'] = 90000


whitelistOfTiers['0xa2234bb950774349c42f5febc6ef780eb0515c7f'] = 90000
whitelistOfTiers['0x9f2b6583bce4e026d75919eb61077c03ca903dac'] = 90000




whitelistOfTiers['0x92db7a28c7e44517c0d0f9f0a2d42be7e63d46de'] = 90000
whitelistOfTiers['0x8f4d31682230083ce44e10e59d1b6461a5073487'] = 90000
whitelistOfTiers['0x8f3b4b84b76919e0513b4cf93c90c295920d0705'] = 90000
whitelistOfTiers['0x810f9cab9cca9d77effb65e2e297530e331593bb'] = 90000


whitelistOfTiers['0x7a07abb5b1ec532543eec393b2bdf9137a03e154'] = 90000
whitelistOfTiers['0x76d0c55304b84c9afd3c26205aba35aa7a1c9e5a'] = 90000


whitelistOfTiers['0x6919c4b67e9656c784b46f7b941cf639a66ccd66'] = 90000
whitelistOfTiers['0x615632476ee4b74c344f1ef988149d6693f3426b'] = 90000
whitelistOfTiers['0x5f4f60658567f380f3aa4c6323ebaaf52d27c3a0'] = 90000
whitelistOfTiers['0x3fdc974ef87025102125cefcc89484ee8de7339c'] = 90000
whitelistOfTiers['0x38df5eab959095f4589686f4d725c7d0a7ba8f75'] = 90000
whitelistOfTiers['0x3802cf86137c2d187c636e714bbaa7360384ccce'] = 90000


whitelistOfTiers['0x06ff983b28e28a7ea61b07d3621f2f5708eee0fd'] = 90000

//Platinum 2500
whitelistOfTiers['0xbcaf97c94a88edb826057b93af6e94c88e97cb8c'] = 250000
whitelistOfTiers['0xad3a5f73154344ef269c64ff612a0e9c8eb84d06'] = 250000
whitelistOfTiers['0x9a94c75766182724ed6bea2e2a38e757668818fd'] = 250000
whitelistOfTiers['0x6eba0d3ea3e9c78a772626bbc1de28a36d2ea2b2'] = 250000
whitelistOfTiers['0xa29d6440549a5d42c9b0cc9570ca76726bbe0935'] = 250000
whitelistOfTiers['0x380e4adf2443bcdc77a077ffacf947fcbcf06430'] = 250000
whitelistOfTiers['0xa2944eb5fe2777885149e9eb94d4f7bd3598ac91'] = 250000
whitelistOfTiers['0xd14b3bd8866728d18cff983fc6eac2b38056a43b'] = 250000
whitelistOfTiers['0x90a5feac7be2cf1816e6e0619c46f925ab789f60'] = 250000
whitelistOfTiers['0xf3069a7ddedf87fdfb48f4f9f9deecde7393696e'] = 250000
whitelistOfTiers['0x22e435d9668195f09b3025c1c8c565b7eefb7881'] = 250000
whitelistOfTiers['0xf6de1ea1a9a9477a99494c39f96b29c79439bcfd'] = 250000
whitelistOfTiers['0xef8ec3fe5a373eed6c4b34d1437d6233fbf146b2'] = 250000
whitelistOfTiers['0x907da4070f2c14954974c878f94db1fb14b2528d'] = 250000
whitelistOfTiers['0x5ce59ae2633f41d70f030913db7bce22b9396bc6'] = 250000
whitelistOfTiers['0x3d4f3713bdab9956ab92fb6aa185c12df75b041f'] = 250000
whitelistOfTiers['0xfa7fc40f90dd70320aeca121257f46e36bf7e87b'] = 250000
whitelistOfTiers['0x8609dbe64f42093465c5ad303b7c08e043d6e87d'] = 250000
whitelistOfTiers['0x8c80ef848bb79e2dc75c06c5918394aa900dedf2'] = 250000

whitelistOfTiers['0xb44326125ef69d99fd0252a02bd6ea221c252927'] = 250000
whitelistOfTiers['0x81055eb88764492ffad8cd0ef04a70016f98a913'] = 250000
whitelistOfTiers['0x04e24647aa100a6e0fc72aec7f30c798d1c6fba0'] = 250000
whitelistOfTiers['0xa9bd229fb331e533248706010201d34d3e470a21'] = 250000
whitelistOfTiers['0x53d22f83d009318d4cf6525abf7ce4455e227b00'] = 250000
whitelistOfTiers['0x1cf862826f2b0c0c7e927f33076b6fdf114b83d4'] = 250000
whitelistOfTiers['0x020b8170859d58ac7420ae3f57dc06b14f0e6de7'] = 250000
whitelistOfTiers['0x0882d49b2d0c62083415290ada72acb6864123b5'] = 250000
whitelistOfTiers['0x7e1772030d2c499770b2c836d87643d41cfd448a'] = 250000
whitelistOfTiers['0xefb6965be1b02825d63544dd76c4500f67c2539e'] = 250000
whitelistOfTiers['0xa99f7f68d8a5a2f723e9107b65e12a57cc25742c'] = 250000
whitelistOfTiers['0x0ce7b6a7de770af891ebf3e67d7c6db3dbfb33c4'] = 250000
whitelistOfTiers['0x05fac0f9bc84ce8129288bea5231a3a394bcb2a7'] = 250000
whitelistOfTiers['0x9c0d2792845cb8755bd6064d9ea5d84cf6c55dd6'] = 250000
whitelistOfTiers['0x4d4def9765c8c499e3bc80ba95917d0825125436'] = 250000
whitelistOfTiers['0x418da8c25cba3c552ac3e301eb590cc01ecce922'] = 250000
whitelistOfTiers['0x15ee857b27b08f72d4c28a9f19ee455192477bea'] = 250000
whitelistOfTiers['0xdaa99bd713f36dc96ca1a418eaa364c96643b685'] = 250000
whitelistOfTiers['0xca27ec3c4d60711e65f3b048f3f1d1218098c688'] = 250000
whitelistOfTiers['0xfc78684fa2e2ea290ea4cd8088000d06d61e8c42'] = 250000








whitelistOfTiers['0x9933ef770375461689408c1f22c63b26cc62d071'] = 12000



const schedulePlain = [
    {
        percentage: 5,
        unlockTime: 1649685600, //2022-04-11 14:00  GMT-000
        isSent: false
    }, {
        percentage: 15.83,
        unlockTime: 1652184000, //2022-05-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 15.83,
        unlockTime: 1654862400, //2022-06-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 15.83,
        unlockTime: 1657454400, //2022-07-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 15.83,
        unlockTime: 1660132800, //2022-08-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 15.83,
        unlockTime: 1662811200, //2022-09-10 12:00  GMT-000
        isSent: false
    }, {
        percentage: 15.83,
        unlockTime: 1665403200, //2022-10-10 12:00  GMT-000
        isSent: false
    }    
];

const whitelistOfTiersLength = 1137;



export { swprTokenAddress, vestingContractAddress, busdTokenAddress, usdtTokenAddress, schedulePlain, preSaleAmount, whitelistOfTiersLength, saleStartTime, saleEndTime, whitelistOfTiers, startFcfsTime };
