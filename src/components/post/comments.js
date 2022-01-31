import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import AddComment from "./add-comments";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className="px-4 pb-4">
        {comments.length >= 3 && (
          <p className="text-sm text-gray-400">
            View all {comments.length} comments
          </p>
        )}
        {comments.slice(0, 3).map((item) => (
          <p
            key={`${item.comment}-${item.displayName}`}
            className="mb-1 space-x-2 text-sm"
          >
            <Link to={`/p/${item.displayName}`} className="hover:underline">
              <span className="text-sm font-semibold text-gray-800">
                {item.displayName}
              </span>
            </Link>
            <span className="text-xs text-gray-600">{item.comment}</span>
          </p>
        ))}
        <p className="text-[10px] uppercase text-gray-400">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
