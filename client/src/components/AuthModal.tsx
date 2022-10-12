import React from "react";
import { Dialog, Tabs, Tab, Container } from "@mui/material";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

/**
 * Modal dialog for login/signup
 */
export default function AuthModal({ modalStates }: any) {
  const [authTab, setAuthTab] = React.useState<number>(0);
  const changeTab = (_event: React.SyntheticEvent, tabIndex: number) => {
    setAuthTab(tabIndex);
  };

  return (
    <Dialog open={modalStates.authOpen} onClose={modalStates.closeAuth}>
      <Tabs
        value={authTab}
        onChange={changeTab}
        indicatorColor="primary"
        centered
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      <Container sx={{ pb: 1 }}>
        {authTab === 0 ? (
          <LoginForm modalStates={modalStates} />
        ) : (
          <SignupForm modalStates={modalStates} />
        )}
      </Container>
    </Dialog>
  );
}
