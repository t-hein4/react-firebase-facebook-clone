import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import RoomIcon from "@mui/icons-material/Room";

const about = [
  { id: "Current City", name: "Current City", icon: <LocationCityIcon /> },
  { id: "Workplace", name: "Workplace", icon: <WorkIcon /> },
  { id: "School", name: "School", icon: <SchoolIcon /> },
  { id: "Hometown", name: "Hometown", icon: <RoomIcon /> },
  {
    id: "Relationship Status",
    name: "Relationship Status",
    icon: <FavoriteIcon />,
  },
  {
    id: "See Your About Info",
    name: "See Your About Info",
    icon: <MoreHorizIcon />,
  },
];

export default about;
