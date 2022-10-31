import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_ORDER } from "../utils/queries";
import Cart from "../components/Cart";

// http://localhost:3000/success?payment_intent=pi_3Lz0qZG2F40Ds5140l3exg1V&payment_intent_client_secret=pi_3Lz0qZG2F40Ds5140l3exg1V_secret_9ksyGA29WjoVSWPKkFrvFLYsp&redirect_status=succeeded

/**
 * Individual product page
 */
export default function SuccessPage({ cartHandler }: any) {
  // const { productId } = useParams();

  const [searchParams] = useSearchParams();

  const stripeId = searchParams.get("payment_intent");

  const { loading, data } = useQuery(QUERY_ORDER, {
    variables: { stripeId },
    fetchPolicy: "no-cache",
  });

  const order = data?.order || {};

  // React.useEffect(() => {
  //   console.log(data);
  // }, [data, loading]);

  return loading || !data ? (
    <Typography variant="h3">Loading...</Typography>
  ) : (
    <>
      <Grid container flexDirection="column" width="100%" rowGap={2}>
        <Grid container flexDirection="row">
          <Grid item md={6} flexGrow={1} p={2}>
            <Typography variant="h5" sx={{ p: 2 }}>
              Order Complete!
            </Typography>
            <List>
              <ListItem>
                <ListItemText>Order Number: {order.orderNum}</ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={6} flexGrow={1} p={2}>
            <Cart cartHandler={cartHandler} label="Items" disable />
          </Grid>
        </Grid>
        <Divider />
      </Grid>
    </>
  );
}
