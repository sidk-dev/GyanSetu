import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import SlotCard from "./slotCard";
import { fetchSlots } from "../../api/auth_api";

function SlotFeed({ userId = null, isProfile = false }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["slots", { isProfile, userId }],
      queryFn: fetchSlots,
      getNextPageParam: (lastPage) => {
        if (!lastPage?.links?.next) return undefined;
        const url = new URL(lastPage.links.next);
        return url.searchParams.get("page_cursor");
      },
      keepPreviousData: true,
    });

  const slots = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 ">
      <InfiniteScroll
        dataLength={slots.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <p className="text-center py-4 text-neutral-medium animate-pulse">
            Loading...
          </p>
        }
        endMessage={
          <p className="text-center py-4 text-neutral-medium">
            No more slots to show
          </p>
        }
        refreshFunction={refetch}
        pullDownToRefresh
        pullDownToRefreshThreshold={60}
        pullDownToRefreshContent={
          <h4 className="text-center py-2 text-neutral-medium">
            ↓ Pull down to refresh
          </h4>
        }
        releaseToRefreshContent={
          <h4 className="text-center py-2 text-neutral-medium">
            ↑ Release to refresh
          </h4>
        }
      >
        <div className="flex pt-2 flex-col gap-4">
          {slots.length === 0 && !isFetchingNextPage ? (
            <p className="text-center py-8 text-neutral-medium">
              No slots available.
            </p>
          ) : (
            slots.map((slot) => (
              <SlotCard
                key={slot.id}
                slot={slot}
                userId={userId}
                isProfile={isProfile}
              />
            ))
          )}
        </div>
      </InfiniteScroll>

      {isFetchingNextPage && slots.length > 0 && (
        <p className="text-center py-4 text-neutral-medium animate-pulse">
          Loading more...
        </p>
      )}
    </div>
  );
}

export default SlotFeed;
