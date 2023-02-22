import { Input } from "@mui/material";
import { useState } from "react";
import useSearchUsers from "../../hooks/useSearchUsers";
import SearchDrawerResults from "../SearchDrawerResults";
import SearchIcon from "@mui/icons-material/Search";
import Back from "../Buttons/Back";
import BaseDrawer from "../Base/BaseDrawer";
import PropTypes from "prop-types";

const SearchDrawer = (props) => {
  const { toggleDrawer } = props;
  const [input, setInput] = useState("");
  const users = useSearchUsers(input);

  const handleInputSearch = (event) => {
    setInput(event.target.value);
  };

  return (
    <BaseDrawer
      header={
        <>
          <Back onClick={toggleDrawer} />
          <Input
            disableUnderline
            fullWidth
            placeholder="Search ..."
            startAdornment={<SearchIcon />}
            value={input}
            onChange={handleInputSearch}
          />
        </>
      }
      body={<SearchDrawerResults results={users} toggleDrawer={toggleDrawer} />}
    />
  );
};

SearchDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default SearchDrawer;
