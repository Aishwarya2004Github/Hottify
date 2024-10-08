import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // Ref for the posts container
  const postsContainerRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    if (isProfile) {
      fetchPosts(`https://hottify.onrender.composts/${userId}/posts`);
    } else {
      fetchPosts("https://hottify.onrender.composts");
    }
  }, [isProfile, userId, token, dispatch]); // Dependencies include token and dispatch

  return (
    <div
      ref={postsContainerRef}
      style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }} // Adjust the height as needed
    >
      {posts.slice().reverse().map( // Reverse the posts array to show latest first
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </div>
  );
};

export default PostsWidget;
