import { Grid } from "@mui/material";
import React from "react";

function Layout({ top, left, middle, right }) {
  return (
    <Grid container sx={{ pb: 7 }}>
      <Grid component="nav" item xs={12}>
        {top}
      </Grid>
      <Grid container spacing={{ xs: 0, md: 2 }}>
        <Grid item xs={0} md={3}>
          {left}
        </Grid>
        <Grid item xs={12} md={6}>
          {middle}
        </Grid>
        <Grid item xs={0} md={3}>
          {right}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Layout;
