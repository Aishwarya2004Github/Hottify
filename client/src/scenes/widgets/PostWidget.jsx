import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const textColor = palette.neutral.main; // Main text color
  const accentColor = palette.primary.main; // Color for likes
  const backgroundColor = palette.background.paper; // Background color for widget
  const borderColor = palette.divider; // Border color

  const handleLike = async () => {
    try {
      const response = await fetch(`https://hottify.onrender.composts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

      if (!response.ok) {
        throw new Error("Failed to like the post");
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  return (
    <WidgetWrapper
      m="1rem 0"
      sx={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: "0.75rem",zIndex: 1000,
        boxShadow: 1, // Added shadow for a modern look
      }}
    >
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography variant="body1" color="black" sx={{ mt: "1rem", mb: "0.5rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{
            borderRadius: "0.75rem",
            marginBottom: "0.75rem",
            zIndex: 1000,
            border: `1px solid ${borderColor}`,
          }}
          src={`https://hottify.onrender.comassets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.5rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.5rem">
            <IconButton onClick={handleLike} sx={{ color: isLiked ? accentColor : textColor, transition: 'color 0.3s' }}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: accentColor }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography color={textColor}>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.5rem">
            <IconButton onClick={() => setIsComments(!isComments)} sx={{ color: textColor, transition: 'color 0.3s' }}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography color={textColor}>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton sx={{ color: textColor, transition: 'color 0.3s' }}>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box
          mt="0.5rem"
          sx={{
            maxHeight: "250px",
            overflowY: "auto",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            zIndex: 1000,
            backgroundColor: palette.background.paper, // Ensure correct background for comments section
            borderRadius: "0.75rem",
            border: `1px solid ${borderColor}`,
            p: "0.5rem", // Added padding
          }}
        >
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider sx={{ borderColor: borderColor }} />
              <Typography sx={{ color: textColor, my: "0.5rem", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ borderColor: borderColor }} />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
