import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import * as C from "./AddCommentElements";
import { FeedBackBtnPurple } from "../../utilities/buttons";
import { addComment } from "../../actions";
import { nanoid } from "nanoid";
import { empty } from "../../utilities/notifications";
import type { RootState, Item } from "../../Types";

const AddComment = () => {
  const target: string = useLocation().pathname.replace("/feedback-detail/", "").toLowerCase();
  const USER = useSelector((state: any) => state.user);
  const currentItem: Item = useSelector((state: RootState) =>
    state.feedbacks.items.find((item: Item) => item.link === target)
  )!;
  const [saveComment, setSaveComment] = useState("");
  const [textCount, setTextCount] = useState<number>(0);
  const randomId = nanoid(10);

  const dispatch = useDispatch();
  const CharacterRemain = 225 - textCount;

  const handleTextCount = (e: React.ChangeEvent<HTMLElement>) => {
    const event = e.currentTarget as HTMLInputElement;
    const value = event.value;
    setTextCount(value.length);
    setSaveComment(value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (saveComment === "") {
      empty();
    } else {
      dispatch(
        addComment(target, currentItem._id, {
          _key: randomId,
          username: USER.username,
          avatar: USER.img,
          user_id: USER.nickname,
          comment: saveComment,
          replies: [],
        })
      );
      setSaveComment("");
    }
  };
  const handleKeypress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit(e);
    }
  };
  return (
    <C.Wrapper>
      <C.Title>Add Comment</C.Title>
      <C.AddCommentWrapper id="add-comment" data-text={CharacterRemain + " characters left"} onSubmit={handleSubmit}>
        <C.TextArea
          name="comment"
          rows={3}
          maxLength={225}
          onChange={handleTextCount}
          value={saveComment}
          onKeyDown={handleKeypress}
          required
        />
        <FeedBackBtnPurple data-text="Post Comment" form="add-comment" aria-label="submit" />
      </C.AddCommentWrapper>
    </C.Wrapper>
  );
};

export default AddComment;
