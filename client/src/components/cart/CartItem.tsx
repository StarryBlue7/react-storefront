import React, {
  ChangeEvent,
  CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Button,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Clear } from "@mui/icons-material";

import { Link } from "react-router-dom";

import { urlString } from "../../utils/url";

type Tag = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  fullName: string;
  shortName: string;
  modelNumber: string;
  imgURL: string;
  description: string;
  rating?: number;
  tags: Tag[];
  price: number;
};

type Item = {
  product: Product;
  quantity: number;
};

type Totals = {
  totalPrice: number;
  totalQty: number;
};

type CartHandler = {
  cartLoading: boolean;
  cart: Item[];
  totals: Totals;
  addToCart: (product: Product, quantity?: number) => () => void;
  updateQty: (productId: string, quantity: number) => () => void;
  deleteItem: (productId: string) => () => void;
  updateCart: (cart: Item[]) => () => void;
  clearAll: () => () => void;
};

type CartItemProps = {
  item: Item;
  cartHandler: CartHandler;
  maxQty?: number;
  disable?: boolean;
};

const styles = {
  cartImg: {
    height: 50,
    width: 50,
    objectFit: "cover",
  },
} as CSSProperties | any;

export default function CartItem({
  item,
  cartHandler,
  maxQty = 9,
  disable = false,
}: CartItemProps) {
  // Show/hide cart item options
  const [options, setOptions] = useState<boolean>(false);
  const showOptions = () => setOptions(true);
  const hideOptions = () => {
    if (qtyInput !== item.quantity) {
      handleUpdate();
    }
    setOptions(false);
  };

  // On selection change, update quantity & hide options
  const handleSelect = (event: SelectChangeEvent): void => {
    cartHandler.updateQty(item.product._id, parseInt(event.target.value))();
    setOptions(false);
  };

  // List of possible quantities
  const qtyOptions = useMemo(() => {
    const options = [];
    for (let i = 0; i <= maxQty; i++) {
      options.push(i);
      // Limit quantity to stock attribute to be added (TODO)
      // if (i === item.product?.stock) {
      //   break;
      // }
    }
    return options;
  }, [maxQty]);

  const [qtyInput, setQtyInput] = useState<number>(item.quantity);
  useEffect(() => {
    setQtyInput(item.quantity);
  }, [item.quantity]);
  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const quantity = parseInt(event.target.value);
    // Update qty input only if input is a number
    if (!Number.isNaN(quantity)) {
      setQtyInput(quantity);
    }
  };
  const handleUpdate = (): void => {
    cartHandler.updateQty(item.product._id, qtyInput)();
  };

  return (
    <>
      <ListItem key={item.product._id} disablePadding>
        {/* Show quantity select, delete button on mouseover */}
        <ListItemButton
          onMouseOver={disable ? () => {} : showOptions}
          onMouseOut={hideOptions}
        >
          <Link
            to={
              disable
                ? ""
                : `/product/${item.product._id}/${urlString(
                    item.product.shortName
                  )}`
            }
            style={{
              display: "flex",
              flexFlow: "row",
              flexGrow: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <ListItemIcon sx={{ flexGrow: { xs: options ? 1 : 0, sm: 0 } }}>
              <img
                src={item.product.imgURL}
                alt={item.product.shortName}
                style={styles.cartImg}
              />
            </ListItemIcon>
            <ListItemText
              primary={item.product.shortName}
              primaryTypographyProps={{ color: "text.primary" }}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: {
                  sm: "-webkit-box",
                  xs: options ? "none" : "-webkit-box",
                },
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                flexGrow: 1,
                pl: 1,
              }}
            />
          </Link>
          <ListItemText
            primary={"$" + item.product.price}
            sx={{
              mx: 1,
              flexGrow: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}
          />
          {/* Display quantity or quantity select/delete on mouseover */}
          {options ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                {item.quantity < maxQty ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Select
                      value={item.quantity.toString()}
                      onChange={handleSelect}
                      id="select"
                      size="small"
                      startAdornment={
                        <InputAdornment position="start">Qty.</InputAdornment>
                      }
                    >
                      {qtyOptions.map((option: number) => (
                        <MenuItem value={option} key={option.toString()}>
                          {option === maxQty ? option + "+" : option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                ) : (
                  <TextField
                    value={qtyInput}
                    onChange={handleInput}
                    onBlur={handleUpdate}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Qty.</InputAdornment>
                      ),
                    }}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    size="small"
                    sx={{ width: 90 }}
                  />
                )}
                <Button
                  onClick={cartHandler.deleteItem(item.product._id)}
                  variant="outlined"
                  sx={{ minWidth: 0, px: 0.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <Clear />
                  </ListItemIcon>
                </Button>
              </Box>
            </>
          ) : (
            <>
              <ListItemText
                primary={"x" + item.quantity}
                sx={{
                  mx: 1,
                  flexGrow: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              />
            </>
          )}
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}
