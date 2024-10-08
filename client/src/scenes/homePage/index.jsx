import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import back from "../../assets/back.jpg"; // Import the background image

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box
      sx={{
        backgroundImage: `url(${back})`, // Set background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Ensure it covers the viewport height
        position: "relative", // Positioning for dot overlay
        overflow: "hidden", // Prevent scrolling outside the box
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
          pointerEvents: "none", // Prevents blocking interaction
        }}
      >
        {/* Creating visible dots using circles */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "20%",
            width: "1rem",
            height: "1rem",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Dot color
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "60%",
            width: "1.5rem",
            height: "1.5rem",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "70%",
            left: "30%",
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
        gap="0.5rem"
        justifyContent="space-between"
        sx={{ zIndex: 2 }} // Ensure content is above the overlay
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
