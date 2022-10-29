import React from "react";
import { Tabs, Tab, Container } from "@mui/material";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Auth from "../utils/auth";
import OrderForm from "./OrderForm";

/**
 * Order details panel
 */
export default function OrderDetails({ cartHandler }: any) {
  const [authTab, setAuthTab] = React.useState<number>(0);
  const changeTab = (_event: React.SyntheticEvent, tabIndex: number) => {
    setAuthTab(tabIndex);
  };

  const loggedIn = Auth.loggedIn();

  return (
    <>
      {loggedIn ? (
        <>
          <Container sx={{ py: 1 }}>
            <OrderForm cartHandler={cartHandler} />
          </Container>
        </>
      ) : (
        <>
          <Tabs
            value={authTab}
            onChange={changeTab}
            indicatorColor="primary"
            centered
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
            <Tab label="Checkout as Guest" />
          </Tabs>
          <Container sx={{ py: 1 }}>
            {authTab === 0 && <LoginForm />}
            {authTab === 1 && <SignupForm />}
            {authTab === 2 && <OrderForm cartHandler={cartHandler} />}
          </Container>
        </>
      )}
    </>
  );
}
