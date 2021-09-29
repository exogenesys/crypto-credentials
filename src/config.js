import { CLUSTER_ENUMS } from "./constants";

const config = {
  [CLUSTER_ENUMS.localnet]: {
    clursterUrl: "http://localhost:8899",
    programId: "5VJPthEqtpkRQoXV4FWMazSo3sfeMd8Pr6edYxgDHtUy",
    idlId: "2QdcyhpS4iPyD7ibdMHfCBF9Ym99SGo19KYU8XGjcLq2",
  },
  [CLUSTER_ENUMS.devnet]: {
    clursterUrl: "https://api.devnet.solana.com",
    programId: "CVWTQV1CyHDTgAyoCk9iLjZxvPJavaHxbBTXxQvecBwC",
    idlId: "2QdcyhpS4iPyD7ibdMHfCBF9Ym99SGo19KYU8XGjcLq2",
  },
  [CLUSTER_ENUMS.testnet]: {
    clursterUrl: "https://api.testnet.solana.com",
    programId: "2QdcyhpS4iPyD7ibdMHfCBF9Ym99SGo19KYU8XGjcLq2",
    idlId: "2QdcyhpS4iPyD7ibdMHfCBF9Ym99SGo19KYU8XGjcLq2",
  },
  [CLUSTER_ENUMS.mainnet]: {
    clursterUrl: "https://api.mainnet.solana.com",
    programId: "2QdcyhpS4iPyD7ibdMHfCBF9Ym99SGo19KYU8XGjcLq2",
    idlId: "2QdcyhpS4iPyD7ibdMHfCBF9Ym99SGo19KYU8XGjcLq2",
  },
};

export default config;
