import React, { useEffect, useState } from "react";
import InstallMetamask from "./InstallMetamask";
import ConnectMetamask from "../pages/ConnectMetamask";
import Register from "../pages/Register";
import CustomerDashboard from "../pages/Customer/Dashboard";
import FIDashboard from "../pages/Financialnstitution/Dashboard";
import { MetaMaskStateProvider, useMetamask } from "use-metamask";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CreditScore from "../pages/Customer/CreditScore";
import Web3 from "web3";
import { useRHBChain } from "../hooks/RHBProvider";
import Tasks from '../pages/Customer/Tasks'
import Rewards from '../pages/Customer/Rewards'
import OpenCreditAccount from "../pages/Financialnstitution/OpenCreditAccount";
import CreditInquiry from "../pages/Financialnstitution/CreditInquiry";
import UpdateCreditAccount from "../pages/Financialnstitution/UpdateCreditAccount";
import CloseCreditAccount from "../pages/Financialnstitution/CloseCreditAccount";
import Applied from '../pages/Financialnstitution/Applied'
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
          <Route path="/rewards">
            <Rewards />
          </Route>
          <Route path="/creditscore">
            {user.type == "FI" ? <Redirect to="/" /> : <CreditScore />}
          </Route>
          <Route path="/closecreditaccount">
            {user.type == "FI" ? <CloseCreditAccount /> : <Redirect to="/" />}
          </Route>
          <Route path="/updatecreditaccount">
            {user.type == "FI" ? <UpdateCreditAccount /> : <Redirect to="/" />}
          </Route>
          <Route path="/creditaccount">
            {user.type == "FI" ? <OpenCreditAccount /> : <Redirect to="/" />}
          </Route>
          <Route path="/creditinquiry">
            {user.type == "FI" ? <CreditInquiry /> : <Redirect to="/" />}
          </Route>
          <Route path="/applied">
           <Applied />
          </Route>
          <Route path="/tasks">
          <Tasks user={user} />
          </Route>
          <Route
            path="/"
            component={user.type == "FI" ? FIDashboard : CustomerDashboard}
          />
        </Switch>
      </Router>
    ) : user !== undefined ? (
      <Register />
    ) : null;
  }
}
