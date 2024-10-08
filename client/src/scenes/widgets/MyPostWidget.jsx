import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import sound from "../../assets/sound.mp3"; // Import the sound file

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    try {
      const response = await fetch(`http://localhost:5000/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");

      // Play the post sound
      const audio = new Audio(sound);
      audio.play();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <WidgetWrapper>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: palette.background.default, // Ensure it's visible
          borderBottom: `1px solid ${palette.neutral.medium}`,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "1rem", // Add some padding
        }}
      >
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </FlexBetween>

        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="8px"
            mt="1rem"
            p="1rem"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1.5rem"
                  width="100%"
                  textAlign="center"
                  sx={{
                    "&:hover": { cursor: "pointer", backgroundColor: palette.neutral.light },
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography color={mediumMain}>Drag & Drop or Click to Upload</Typography>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined sx={{ color: palette.primary.main }} />
                    </FlexBetween>
                  )}
                </Box>
              )}
            </Dropzone>
            {image && (
              <Box
                mt="1rem"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{ maxWidth: "120px", height: "150px" }}
                />
              </Box>
            )}
            {image && (
              <IconButton
                onClick={() => setImage(null)}
                sx={{ display: "block", margin: "1rem auto" }}
              >
                <DeleteOutlined />
              </IconButton>
            )}
          </Box>
        )}

        <Divider sx={{ margin: "1.25rem 0" }} />

        <FlexBetween>
          <FlexBetween
            justifyContent="center"
            gap="0.5rem"
            onClick={() => setIsImage(!isImage)}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: palette.primary.dark,
              },
              transition: "color 0.3s ease",
            }}
          >
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                },
              }}
            >
              Add Image
            </Typography>
          </FlexBetween>

          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "50px",
              padding: "0.75rem 2rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: palette.primary.dark,
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
              },
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            Post
          </Button>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
