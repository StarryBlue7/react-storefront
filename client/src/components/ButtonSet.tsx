import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { StarBorder } from "@mui/icons-material";

import { Link } from "react-router-dom";

type ButtonSetProps = {
  buttons: ButtonConfig[];
};

type ButtonConfig = {
  icon?: React.ReactElement;
  label: string;
  path?: string;
  disabled?: boolean;
  function?: Function;
  variant?: string;
};

const styles = {
  totals: { textAlign: "right", width: "50%" },
  links: { textDecoration: "none", flexGrow: 1 },
  cartButton: { width: "100%" },
  cartButtonIcon: { minWidth: 0, mr: 1 },
};

export default function ButtonSet({ buttons }: ButtonSetProps) {
  return (
    <>
      <List>
        <ListItem
          key={"cart-options"}
          sx={{ display: "flex", flexFlow: "row wrap", gap: 1 }}
        >
          {buttons.map((button: any) => (
            <Link
              to={!button.disabled && button.path}
              key={button.label}
              style={styles.links}
            >
              <Button
                onClick={button.function}
                disabled={button.disabled}
                variant={button.variant}
                sx={styles.cartButton}
              >
                <ListItemIcon sx={styles.cartButtonIcon}>
                  {button.icon || <StarBorder />}
                </ListItemIcon>
                <ListItemText primary={button.label} />
              </Button>
            </Link>
          ))}
        </ListItem>
      </List>
    </>
  );
}
