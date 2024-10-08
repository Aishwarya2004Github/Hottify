import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, TextField, IconButton } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState({ location: false, occupation: false });
  const [tempLocation, setTempLocation] = useState("");
  const [tempOccupation, setTempOccupation] = useState("");
  const [socialProfiles, setSocialProfiles] = useState([
    { name: "Twitter", url: "https://twitter.com", src: "/assets/twitter.png", desc: "Social Network", editing: false, tempUrl: "" },
    { name: "LinkedIn", url: "https://linkedin.com", src: "/assets/linkedin.png", desc: "Network Platform", editing: false, tempUrl: "" },
    { name: "Instagram", url: "https://instagram.com", src: "/assets/instagram.png", desc: "Social Platform", editing: false, tempUrl: "" },
    { name: "Telegram", url: "https://telegram.org", src: "/assets/telegram.png", desc: "Social Platform", editing: false, tempUrl: "" },
    { name: "Facebook", url: "https://facebook.com", src: "/assets/facebook.png", desc: "Social Platform", editing: false, tempUrl: "" },
  ]);
  const { palette, mode } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const darkText = mode === 'light' ? palette.text.primary : palette.text.secondary;
  const mediumText = mode === 'light' ? palette.text.secondary : palette.text.primary;
  const mainText = mode === 'light' ? palette.text.primary : palette.text.secondary;
  const primary = palette.primary.main;
  const background = palette.background.default;

  const getUser = async () => {
    try {
      const response = await fetch(`https://hottify.onrender.com/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    friends,
  } = user;

  const handleEdit = (field) => {
    if (field === "location") {
      setTempLocation(location);
      setEditMode({ ...editMode, location: true });
    } else if (field === "occupation") {
      setTempOccupation(occupation);
      setEditMode({ ...editMode, occupation: true });
    }
  };

  const handleSave = async (field) => {
    let updatedData;
    if (field === "location") {
      updatedData = { location: tempLocation };
    } else if (field === "occupation") {
      updatedData = { occupation: tempOccupation };
    }

    try {
      const response = await fetch(`https://hottify.onrender.com/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditMode({ ...editMode, [field]: false });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleSocialEdit = (index) => {
    const newProfiles = [...socialProfiles];
    newProfiles[index].tempUrl = newProfiles[index].url;
    newProfiles[index].editing = true;
    setSocialProfiles(newProfiles);
  };

  const handleSocialSave = async (index) => {
    const newProfiles = [...socialProfiles];
    newProfiles[index].url = newProfiles[index].tempUrl;
    newProfiles[index].editing = false;
    setSocialProfiles(newProfiles);
    // TODO: Implement API call to save the updated social profile URL if needed
  };

  return (
    <WidgetWrapper
      sx={{
        backgroundColor: background,
        borderRadius: "12px",
        padding: "1.5rem",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: mode === 'dark' ? palette.background.paper : background,
      }}
    >
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={darkText}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: primary,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={mediumText}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined sx={{ color: primary }} />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: mainText }} />
          {editMode.location ? (
            <TextField
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ width: '80%' }}
            />
          ) : (
            <Typography color={mediumText}>{location}</Typography>
          )}
          <IconButton onClick={() => editMode.location ? handleSave("location") : handleEdit("location")}>
            {editMode.location ? <SaveOutlined sx={{ color: primary }} /> : <EditOutlined sx={{ color: primary }} />}
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <FontAwesomeIcon
            icon={faClipboard}
            size="lg"
            style={{
              color: mainText,
              width: "24px", // Set the width
              height: "24px", // Set the height
            }}
          />
          {editMode.occupation ? (
            <TextField
              value={tempOccupation}
              onChange={(e) => setTempOccupation(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ width: '80%' }}
            />
          ) : (
            <Typography color={mediumText}>{occupation}</Typography>
          )}
          <IconButton onClick={() => editMode.occupation ? handleSave("occupation") : handleEdit("occupation")}>
            {editMode.occupation ? <SaveOutlined sx={{ color: primary }} /> : <EditOutlined sx={{ color: primary }} />}
          </IconButton>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={mediumText}>Who's viewed your profile</Typography>
          <Typography color={mainText} fontWeight="500">
            {/* Simulated value */}
            1
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={mediumText}>Impressions of your post</Typography>
          <Typography color={mainText} fontWeight="500">
            {/* Simulated value */}
            20
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={mainText} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        {socialProfiles.map((profile, index) => (
          <FlexBetween gap="1rem" mb="0.5rem" key={profile.name}>
            <FlexBetween gap="1rem">
              <img
                src={profile.src}
                alt={profile.name}
                style={{ width: "24px", height: "24px", borderRadius: "50%" }}
              />
              {profile.editing ? (
                <TextField
                  value={profile.tempUrl}
                  onChange={(e) => {
                    const newProfiles = [...socialProfiles];
                    newProfiles[index].tempUrl = e.target.value;
                    setSocialProfiles(newProfiles);
                  }}
                  variant="outlined"
                  size="small"
                  sx={{ width: '80%' }}
                />
              ) : (
                <Typography color={mediumText}>{profile.url}</Typography>
              )}
            </FlexBetween>
            <IconButton onClick={() => profile.editing ? handleSocialSave(index) : handleSocialEdit(index)}>
              {profile.editing ? <SaveOutlined sx={{ color: primary }} /> : <EditOutlined sx={{ color: primary }} />}
            </IconButton>
          </FlexBetween>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
