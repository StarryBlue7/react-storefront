import React from "react";

import { Dialog } from "@mui/material";

import AuthForm from "./AuthForm";

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

type AuthModalProps = {
  modalStates: ModalStates;
  authHandler: AuthHandler;
};

/**
 * Modal dialog for login/signup
 */
export default function AuthModal({
  modalStates,
  authHandler,
}: AuthModalProps) {
  return (
    <Dialog open={modalStates.authOpen} onClose={modalStates.closeAuth}>
      <AuthForm modalStates={modalStates} authHandler={authHandler} />
    </Dialog>
  );
}
