import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: palette.background.paper, // Ensure the background is visible
        padding: "1rem",
        borderRadius: "12px",
      }}
    >
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://hottify.onrender.com/assets/spon.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Messages</Typography>
        <Typography color={medium}>Hottify.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Stay connected, share moments, and express yourself. Join the conversation on Hottify, your space to Hofy your story.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
