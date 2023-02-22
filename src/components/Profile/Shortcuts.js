import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import shortcuts from "../../data/shortcuts";

const Shortcuts = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable buttons"
      value={value}
      onChange={handleChange}
      sx={{
        bgcolor: "white",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        "& .Mui-selected": {
          border: "none",
          color: "#00000099",
        },
        "& .MuiTabs-indicator": {
          display: "none",
        },
      }}
    >
      {shortcuts.map(({ id, name, icon }) => (
        <Tab
          disableRipple
          disableTouchRipple
          icon={icon}
          iconPosition="start"
          label={name}
          key={id}
          sx={{
            margin: "0 5px",
            textTransform: "capitalize",
            bgcolor: "#f1f3f4",
            borderRadius: "9999px",
            padding: "0 15px",
            minHeight: "fit-content",
            height: "30px",
          }}
        />
      ))}
    </Tabs>
  );
};

export default Shortcuts;
