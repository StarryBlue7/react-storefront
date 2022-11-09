import React, { SyntheticEvent, useState } from "react";

import { Tabs, Tab, Container } from "@mui/material";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

type ModalStates = {
  authOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
};

type AuthHandler = {
  loggedIn: boolean;
  authRefresh: () => void;
  login: (token: string) => void;
  logout: () => void;
};

type AuthFormProps = {
  modalStates: ModalStates;
  authHandler: AuthHandler;
};

/**
 * Login/signup form
 */
export default function AuthForm({ modalStates, authHandler }: AuthFormProps) {
  const [authTab, setAuthTab] = useState<number>(0);
  const changeTab = (_event: SyntheticEvent, tabIndex: number) => {
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
          <LoginForm modalStates={modalStates} authHandler={authHandler} />
        ) : (
          <SignupForm modalStates={modalStates} authHandler={authHandler} />
        )}
      </Container>
    </>
  );
}
