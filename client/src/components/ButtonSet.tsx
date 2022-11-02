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

type Align = "left" | "center" | "right";

type ButtonSetProps = {
  buttons: ButtonConfig[];
  span?: boolean;
  align?: Align;
};

type ButtonConfig = {
  icon?: React.ReactElement | "none";
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

export default function ButtonSet({
  buttons,
  span = false,
  align,
}: ButtonSetProps) {
  let justification = "center";
  switch (align) {
    case "left":
      justification = "flex-start";
      break;
    case "right":
      justification = "flex-end";
  }
  return (
    <>
      <List>
        <ListItem
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            gap: 1,
            justifyContent: justification,
          }}
        >
          {buttons.map((button: any) => (
            <Link
              to={!button.disabled && button.path}
              key={button.label}
              style={{ ...styles.links, flexGrow: span ? 1 : 0 }}
            >
              <Button
                onClick={button.function}
                disabled={button.disabled}
                variant={button.variant || "contained"}
                sx={styles.cartButton}
              >
                <ListItemIcon sx={styles.cartButtonIcon}>
                  {button.icon || (
                    <StarBorder
                      sx={{
                        color: !(button.variant === "contained")
                          ? "white"
                          : "gray",
                      }}
                    />
                  )}
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
