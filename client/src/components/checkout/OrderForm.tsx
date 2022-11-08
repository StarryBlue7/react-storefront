import React from "react";
import { Tabs, Tab, Container } from "@mui/material";

import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import CheckoutForm from "./CheckoutForm";

/**
 * Order details panel
 */
export default function OrderForm({ cartHandler, authHandler, shipping }: any) {
  const [authTab, setAuthTab] = React.useState<number>(0);
  const changeTab = (_event: React.SyntheticEvent, tabIndex: number) => {
    setAuthTab(tabIndex);
  };

  return (
    <>
      {authHandler.loggedIn ? (
        <>
          <Container sx={{ py: 1 }}>
            <CheckoutForm cartHandler={cartHandler} shipping={shipping} />
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
            {authTab === 0 && <LoginForm authHandler={authHandler} />}
            {authTab === 1 && <SignupForm authHandler={authHandler} />}
            {authTab === 2 && (
              <CheckoutForm cartHandler={cartHandler} shipping={shipping} />
            )}
          </Container>
        </>
      )}
    </>
  );
}
