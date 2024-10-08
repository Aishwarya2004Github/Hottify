import back from "../../assets/back.jpg"; 
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`https://hottify.onrender.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box
      sx={{
        backgroundImage: `url(${back})`, // Set the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Full height
        position: "relative", // Position for dot overlay
        overflow: "hidden", // Prevent overflow
      }}
    >
      <Navbar />
      {/* Overlay with dots */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent overlay
          zIndex: 1,
          pointerEvents: "none", // Allow interaction with content
        }}
      >
        {/* Dots placed in various locations */}
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            left: "25%",
            width: "1rem",
            height: "1rem",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Dot color
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "45%",
            left: "55%",
            width: "1.5rem",
            height: "1.5rem",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "75%",
            left: "35%",
            width: "1rem",
            height: "1rem",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        />
      </Box>

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
        sx={{ zIndex: 2 }} // Ensure content is above the overlay
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
