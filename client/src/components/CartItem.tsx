import React from "react";
import {
  Box,
  Button,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Clear } from "@mui/icons-material";

type Product = {
  _id: string;
  imgURL: string;
  fullName: string;
  shortName: string;
  price: number;
};
type Item = {
  product: Product;
  quantity: number;
};
type CartState = Item[];
type CartHandler = {
  cartLoading: boolean;
  cart: CartState;
  addToCart: Function;
  updateQty: Function;
  deleteItem: Function;
  clearAll: Function;
  updateCart: Function;
};
type CartItemProps = {
  item: Item;
  cartHandler: CartHandler;
  maxQty?: number;
};

const styles = {
  cartImg: {
    height: 50,
    width: 50,
    objectFit: "cover",
  },
} as React.CSSProperties | any;

export default function CartItem({
  item,
  cartHandler,
  maxQty = 9,
}: CartItemProps) {
  const handleChange = (event: SelectChangeEvent): void => {
    cartHandler.updateQty(item.product._id, parseInt(event.target.value))();
  };

  const [options, setOptions] = React.useState<boolean>(false);
  const showOptions = () => setOptions(true);
  const hideOptions = () => setOptions(false);

  const qtyOptions = React.useMemo(() => {
    const options = [];
    for (let i = 0; i <= maxQty; i++) {
      options.push(i);
      // Limit quantity to stock attribute to be added
      // if (i === item.product?.stock) {
      //   break;
      // }
    }
    return options;
  }, [maxQty]);

  return (
    <>
      <ListItem key={item.product._id} disablePadding>
        <ListItemButton onMouseOver={showOptions} onMouseOut={hideOptions}>
          <ListItemIcon>
            <img
              src={item.product.imgURL}
              alt={item.product.shortName}
              style={styles.cartImg}
            />
          </ListItemIcon>
          <ListItemText
            primary={item.product.shortName}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              flexGrow: 0,
              pl: 1,
            }}
          />
          <ListItemText
            primary={"$" + item.product.price}
            sx={{
              mx: 1,
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          />
          {options ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <InputLabel htmlFor="select">Qty.</InputLabel>
                  <Select
                    value={item.quantity.toString()}
                    onChange={handleChange}
                    id="select"
                    size="small"
                  >
                    {qtyOptions.map((option: number) => (
                      <MenuItem value={option} key={option.toString()}>
                        {option === maxQty ? option + "+" : option}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
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
            <ListItemText
              primary={"x" + item.quantity}
              sx={{
                mx: 1,
                flexGrow: 0,
                display: "flex",
                justifyContent: "flex-end",
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}
