import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";

export default function Timeline() {
  const { photos } = usePhotos();
  return (
    <section className="order-2 col-span-2 overflow-hidden md:order-1">
      {!photos ? (
        <div className="space-y-6">
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
      <div>
        <div className="mb-4 flex items-center gap-4 p-4">
          <div className="avatar avatar__sm shrink-0">
            <Skeleton
              circle
              height="100%"
              count={1}
              containerClassName="avatar-skeleton"
            />
          </div>
          <div className="col-span-4 h-4 w-32 leading-3">
            <Skeleton count={1} containerClassName="avatar-skeleton" />
          </div>
        </div>
        <Skeleton
          count={1}
          containerClassName="avatar-skeleton"
          className="post__img__skeleton"
        />
      </div>
    </>
  );
}
