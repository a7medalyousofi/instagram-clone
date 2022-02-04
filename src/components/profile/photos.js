import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

export default function Photos({ photos }) {
  return (
    <>
      {!photos ? (
        new Array(12)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} count={1} width={100} height={100} />
          ))
      ) : photos.length > 0 ? (
        <div className="grid grid-cols-2 items-center gap-4 overflow-hidden border-y border-gray-200 bg-white p-4 sm:grid-cols-3 sm:gap-2 sm:rounded-xl sm:border sm:p-2 md:gap-4 md:p-4">
          {photos.map(({ docId, caption, comments, imageSrc, likes }) => (
            <div
              key={docId}
              className="group relative overflow-hidden rounded-lg"
            >
              <img
                className="h-[200px] w-[290px] sm:h-[234px] sm:w-[234px] md:h-[310px] md:w-[310px]"
                alt={caption}
                src={imageSrc}
              />
              <div className="absolute inset-0 z-10 hidden h-full w-full items-center justify-center space-x-2 bg-gray-600/80 text-sm group-hover:flex sm:space-x-4 md:space-x-8">
                <div className="flex flex-col items-center font-bold text-white sm:flex-row sm:space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 md:w-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{likes.length}</span>
                </div>

                <div className="flex flex-col items-center font-bold text-white sm:flex-row sm:space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 md:w-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{comments.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!photos ||
        (photos.length === 0 && (
          <div className="border-y border-gray-200 bg-white p-2 text-center sm:rounded-xl sm:border md:gap-4 md:p-4">
            <p>There is no posts yet.</p>
          </div>
        ))}
    </>
  );
}

Photos.propTypes = {
  photos: PropTypes.array,
};
