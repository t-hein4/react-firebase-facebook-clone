import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MenuButtonCard from "./MenuButtonCard";
import SimpleCollapse from "./SimpleCollapse";
import { menuBtnList } from "../../menuBntList";

function MenuButtons() {
  const [collapseSize, setCollapseSize] = useState();
  const collapseRef = useRef(null);

  useEffect(() => {
    setCollapseSize(() => collapseRef.current.clientHeight * 7 - 14);
  }, []);

  return (
    <SimpleCollapse collapsedSize={collapseSize}>
      <Grid container spacing={1}>
        {menuBtnList.map(({ name, id }) => (
          <Grid key={id} item ref={collapseRef} xs={6}>
            <MenuButtonCard name={name} />
          </Grid>
        ))}
      </Grid>
    </SimpleCollapse>
  );
}

export default MenuButtons;
