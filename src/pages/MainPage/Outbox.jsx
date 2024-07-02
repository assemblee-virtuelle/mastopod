import { CircularProgress, Box } from "@mui/material";
import { useCollection } from "@semapps/activitypub-components";
import ActivityBlock from "../../common/blocks/ActivityBlock/ActivityBlock";
import PostBlock from "../../common/blocks/PostBlock";
import LoadMore from "../../common/LoadMore";

const Outbox = () => {
  const {
    items: activities,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useCollection("outbox", { dereferenceItems: true });
  return (
    <>
      <PostBlock />
      {activities?.map((activity) => (
        <ActivityBlock activity={activity} key={activity.id} showReplies />
      ))}
      {
        <LoadMore
          fetchNextPage={fetchNextPage}
          isLoading={isFetchingNextPage || isLoading}
        />
      }
    </>
  );
};

export default Outbox;
