import PhotoPickerContainer from "../PhotoPickerContainer";
import BaseDrawer from "../Base/BaseDrawer";
import PropTypes from "prop-types";
import Back from "../Buttons/Back";
import DrawerTitle from "../DrawerTitle";

const SelectPhotoDrawer = (props) => {
  const { toggleDrawer } = props;
  return (
    <>
      <BaseDrawer
        header={
          <>
            <Back onClick={toggleDrawer} />
            <DrawerTitle title="Select Profile Picture" />
          </>
        }
        body={
          <PhotoPickerContainer
            toggleDrawer={toggleDrawer}
            id={"profile-pic-picker"}
          />
        }
      />
    </>
  );
};

SelectPhotoDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default SelectPhotoDrawer;
