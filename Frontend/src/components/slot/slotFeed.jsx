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
    <div className="mx-auto">
      <InfiniteScroll
        dataLength={slots.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<p className="text-center py-4">Loading...</p>}
        endMessage={
          <p className="text-center py-4 text-gray-500">
            No more slots to show
          </p>
        }
        refreshFunction={refetch}
        pullDownToRefresh
        pullDownToRefreshThreshold={60}
        pullDownToRefreshContent={
          <h4 className="text-center py-2">↓ Pull down to refresh</h4>
        }
        releaseToRefreshContent={
          <h4 className="text-center py-2">↑ Release to refresh</h4>
        }
      >
        {slots.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            userId={userId}
            isProfile={isProfile}
          />
        ))}
      </InfiniteScroll>

      {isFetchingNextPage && (
        <p className="text-center py-2 text-gray-500">Loading more...</p>
      )}
    </div>
  );
}

export default SlotFeed;
