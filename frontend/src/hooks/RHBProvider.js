import React, { useState, useEffect, createContext, useContext } from "react";
import Web3 from "web3";
import { useMetamask } from "use-metamask";
import RHBChainMeta from "../RHBChain.json";

export const RHBContext = createContext();

export function RHBProvider({ children }) {
  const state = useProvideRHBChain();
  return <RHBContext.Provider value={state}>{children}</RHBContext.Provider>;
}

export function useRHBChain() {
  return useContext(RHBContext);
}

function useProvideRHBChain() {
  const [contract, setContract] = useState(null);
  const [user, setUser] = useState(undefined);
  const [account, setAccount] = useState(null);
  const [reportVars, setReportVars] = useState(null);
  const { connect, metaState } = useMetamask();

  useEffect(() => {
    if (!metaState.isConnected) return;
    if (metaState.account.length == 0) return;
    const contractAddress = "0x888A25AC09e48CbB29610c7327CABE36237940a8";
    const contractInstance = new metaState.web3.eth.Contract(
      RHBChainMeta.abi,
      contractAddress
    );

    setContract(contractInstance);
    setAccount(metaState.account[0]);

    contractInstance.methods
      .getOwnProfile()
      .call({ from: metaState.account[0] })
      .then((u) => {
        if (u == null) throw "BAD";
        setUser((user) => ({
          ...user,
          name: u?.[0],
          addr: u?.[1],
          phone: u?.[2],
          nric: u?.[3],
          dob: u?.[4],
          type: "Consumer",
        }));
      })
      .catch(() => {
        contractInstance.methods
          .getOwnFIProfile()
          .call({ from: metaState.account[0] })
          .then((u) => {
            if (u == null) throw "BAD";
            setUser((user) => ({
              ...user,
              name: u[0],
              addr: u[1],
              phone: u[2],
              type: "FI",
            }));
          })
          .catch(() => setUser(null));
      });
  }, [metaState.isConnected, metaState.account]);

  const refresh = () => {
    if (!contract) return;
    contract.methods
      .getCreditReportVariables(metaState.account[0])
      .call({ from: metaState.account[0] })
      .then((result) => setReportVars(result));
  };

  useEffect(() => refresh(), [user]);

  return {
    user,
    setUser,
    reportVars,
    refresh,
    contract,
    account,
  };
}
