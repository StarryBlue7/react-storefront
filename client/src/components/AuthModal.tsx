import React from "react";
import { Dialog, Tabs, Tab } from "@mui/material";

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
      {authTab ? <>Login</> : <>Signup</>}
    </Dialog>
  );
}
