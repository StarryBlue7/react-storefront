import React from "react";
import { Dialog } from "@mui/material";

import AuthForm from "./AuthForm";

/**
 * Modal dialog for login/signup
 */
export default function AuthModal({ modalStates }: any) {
  return (
    <Dialog open={modalStates.authOpen} onClose={modalStates.closeAuth}>
      <AuthForm modalStates={modalStates} />
    </Dialog>
  );
}
