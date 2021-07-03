import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useField } from "./../hooks/index";
import { FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updatePostComments } from "../reducers/postReducer";
import { notify } from "./../reducers/notificationReducer";

const NewComment = ({ post }) => {
  const dispatch = useDispatch();

  const propToRemove = "reset";
  const { [propToRemove]: resetComment, ...comment } = useField("text");

  const addCommentHandler = async (e) => {
    e.preventDefault();
    const { id } = post;
    const data = [
      ...post.comments,
      { content: comment.value, date: Date.now() },
    ];
    try {
      await dispatch(updatePostComments({ comments: data }, id));
      dispatch(
        notify(
          `Commented on ${post.user.username || "👻"}'s blog 🙌`,
          "success",
          5
        )
      );
      resetComment();
    } catch (error) {
      dispatch(notify("" + error, "danger", 5));
      resetComment();
    }
  };

  return (
    <Form inline onSubmit={addCommentHandler}>
      <FormControl
        {...comment}
        placeholder="drop a comment..."
        className="mr-sm-2"
      />
      <Button type="submit" variant="outline-success">
        Comment
      </Button>
    </Form>
  );
};

const PostedComments = ({ post }) => {
  return (
    <>
      <ul>
        {post.comments.map((comment) => (
          <li key={comment.date}>{comment.content}</li>
        ))}
      </ul>
    </>
  );
};

const Comments = ({ post }) => {
  return (
    <>
      <p className="text-primary">Leave a comment</p>
      {(post.comments.length && <PostedComments post={post} />) || (
        <p className="text-muted">Be the first to comment on this post 😎</p>
      )}
      <NewComment post={post} />
    </>
  );
};

export default Comments;
