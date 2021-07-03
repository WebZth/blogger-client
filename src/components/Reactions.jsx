import { Badge, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { notify } from "../reducers/notificationReducer";
import { updatePostReaction } from "../reducers/postReducer";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🙌",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const Reactions = ({ reactions, post }) => {
  const dispatch = useDispatch();

  const updateReactions = async ({ id }, name) => {
    const data = { ...reactions, [name]: reactions[name] + 1 };
    try {
      await dispatch(updatePostReaction({ reactions: data }, id));
      dispatch(
        notify(
          `Liked post "${post.postTitle}" by ${post.postAuthor || "anonymous"}`,
          "success",
          5
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button
        variant="dark"
        key={name}
        className="mt-2"
        onClick={(e) => updateReactions(post, name)}
      >
        {emoji}
        <Badge variant="success">{reactions[name]}</Badge>
      </Button>
    );
  });
  return <div>{reactionButtons}</div>;
};
export default Reactions;
