import React, { useEffect, useState } from "react";
import InstallMetamask from "./InstallMetamask";
import ConnectMetamask from "../pages/ConnectMetamask";
import Register from "../pages/Register";
import CustomerDashboard from "../pages/Customer/Dashboard";
import FIDashboard from "../pages/Financialnstitution/Dashboard";
import { MetaMaskStateProvider, useMetamask } from "use-metamask";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreditScore from "../pages/Customer/CreditScore";
import Web3 from "web3";
import { useRHBChain } from "../hooks/RHBProvider";

export default function Routes() {
  const { connect, metaState } = useMetamask();
  const { user, setUser, contract } = useRHBChain();

  if (typeof window.ethereum == "undefined") {
    return <InstallMetamask />;
  } else if (!metaState.isConnected) {
    return <ConnectMetamask />;
  } else {
    return user ? (
      <Router>
        <Switch>
          <Route path="/creditscore" component={CreditScore} />
          <Route
            path="/"
            component={user.type == "FI" ? FIDashboard : CustomerDashboard}
          />
        </Switch>
      </Router>
    ) : user !== undefined ? (
      <Register />
    ) : (
      null
    );
  }
}
