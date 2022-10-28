import React from "react";
import { Tabs, Tab, Container } from "@mui/material";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

/**
 * Login/signup form
 */
export default function AuthForm({ modalStates }: any) {
  const [authTab, setAuthTab] = React.useState<number>(0);
  const changeTab = (_event: React.SyntheticEvent, tabIndex: number) => {
    setAuthTab(tabIndex);
  };

  return (
    <>
      <Tabs
        value={authTab}
        onChange={changeTab}
        indicatorColor="primary"
        centered
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      <Container sx={{ py: 1 }}>
        {authTab === 0 ? (
          <LoginForm modalStates={modalStates} />
        ) : (
          <SignupForm modalStates={modalStates} />
        )}
      </Container>
    </>
  );
}
