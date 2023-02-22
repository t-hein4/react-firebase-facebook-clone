import { useState, useRef } from "react";
import Collapse from "@mui/material/Collapse";
import SeeMore from "../Buttons/SeeMore";
import { Stack } from "@mui/material";

export default function SimpleCollapse({ children, collapsedSize }) {
  const [checked, setChecked] = useState(false);
  const btmRef = useRef(null);
  const handleClick = () => {
    setChecked((prev) => !prev);
    btmRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Stack spacing={1}>
      <Collapse in={checked} collapsedSize={collapsedSize}>
        {children}
      </Collapse>
      <SeeMore checked={checked} onClick={handleClick} />
      <div ref={btmRef} />
    </Stack>
  );
}
