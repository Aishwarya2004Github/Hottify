import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Logo from "../../assets/Hottify.png";
import h from "../../assets/h.png";
import h2 from "../../assets/h2-removebg-preview.png";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      minHeight="100vh"
      sx={{ position: 'relative' }}
    >
      {/* Header Section */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        position="relative"
        zIndex="1"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ height: "5rem", marginRight: "0.5rem" }} // Adjust the height here
          />
          <Typography
            variant="h2"
            component="span"
            sx={{ fontFamily: 'Dancing Script,cursive' }}
          >
            Hottify
          </Typography>
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        alignItems="center"
        width="100%"
        flexGrow="1"
        p="1rem"
        sx={{ position: 'relative' }}
      >
        {/* Left Image */}
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 0 }}
        >
          <img
            src={h}
            alt="left-decoration"
            style={{ position:"relative",left:"150px",top:"-150px", height:"50%", width: "100%", objectFit: "cover" }} // Adjust the size here
          />
        </Box>

        {/* Form Container */}
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
          position="relative"
          zIndex="1"
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to Hottify, the Information Website!
          </Typography>
          <Form />
        </Box>

        {/* Right Image */}
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 0 }}
        >
          <img
            src={h2}
            alt="right-decoration"
            style={{ position:"relative",left:"-150px",top:"150px", height:"50%", width: "100%",objectFit: "cover" }} // Adjust the size here
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
