import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";

export default function Timeline() {
  const { photos } = usePhotos();
  return (
    <section className="order-2 col-span-2 overflow-hidden md:order-1">
      {!photos ? (
        <div className="space-y-4">
          {[...new Array(4)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p>Follow people to see photos.</p>
      )}
    </section>
  );
}

export function PostSkeleton() {
  return (
    <>
      <div className="mb-4 border-y border-gray-200 bg-white sm:rounded-xl sm:border">
        <div className="flex items-center gap-4 p-4">
          <div className="avatar avatar__sm shrink-0">
            <Skeleton
              circle
              height="100%"
              count={1}
              containerClassName="avatar-skeleton"
            />
          </div>
          <div className="h-4 w-32 leading-3">
            <Skeleton count={1} containerClassName="avatar-skeleton" />
          </div>
        </div>
        <Skeleton
          count={1}
          containerClassName="avatar-skeleton"
          className="post__img__skeleton"
        />
        <div className="space-y-4 ">
          <div className="h-4 p-4 leading-3">
            <Skeleton
              count={1}
              width={80}
              containerClassName="avatar-skeleton"
            />
          </div>

          <div className="h-4 px-4 leading-3">
            <Skeleton
              count={1}
              width={160}
              containerClassName="avatar-skeleton"
            />
          </div>
          <div className="grid grid-cols-5 gap-4 border-t border-gray-200 p-4 sm:gap-6">
            <div className="col-span-4 h-4 space-x-7 leading-3">
              <Skeleton count={1} containerClassName="avatar-skeleton" />
            </div>
            <div className="h-4 space-x-7 leading-3">
              <Skeleton count={1} containerClassName="avatar-skeleton" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
