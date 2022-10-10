import { Dialog } from "@mui/material";

/**
 * Modal dialog for login/signup
 */
export default function AuthModal({ modalStates }: any) {
  return (
    <Dialog open={modalStates.authOpen} onClose={modalStates.closeAuth}>
      Text text text
    </Dialog>
  );
}
