import { Box, Typography } from "@mui/material";
import React from "react";

const CartPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight:"100vh",
        bgcolor: "background.default",
        color: "text.primary",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: 1,
            gap:4
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection:"column",
            bgcolor: "background.black",
            color: "text.primary",
            borderRadius: 2,
            p: 3,
            gap:2
          }}
        >
          <Typography variant="h5">Your Shopping Cart is empty</Typography>
          <Box>
            Your Shopping Cart lives to serve. Give it purpose — fill it with
            groceries, clothing, household supplies, electronics, and more.
            Continue shopping on the Amazon.com homepage, learn about today's
            deals, or visit your Wish List.
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection:"column",
            bgcolor: "background.black",
            color: "text.primary",
            borderRadius: 2,
            p: 3,
            gap:2
          }}
        >
          <Typography variant="h5">International Top picks for Your</Typography>
          <Box>
            Your Shopping Cart lives to serve. Give it purpose — fill it with
            groceries, clothing, household supplies,
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
