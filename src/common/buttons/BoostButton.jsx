import { useCallback } from "react";
import { IconButton } from "@mui/material";
import { useNotify, useGetIdentity } from "react-admin";
import {
  useOutbox,
  ACTIVITY_TYPES,
  PUBLIC_URI,
} from "@semapps/activitypub-components";
import RepeatIcon from "@mui/icons-material/Repeat";

const LikeButton = ({ object, activity, ...rest }) => {
  const outbox = useOutbox();
  const notify = useNotify();
  const { data: identity } = useGetIdentity();

  const boost = useCallback(async () => {
    try {
      await outbox.post({
        type: ACTIVITY_TYPES.ANNOUNCE,
        actor: outbox.owner,
        object: object?.id || activity?.id,
        to: [
          identity.webIdData.followers,
          activity?.actor || object?.attributedTo,
          PUBLIC_URI,
        ],
      });
      notify("app.notification.post_boosted", { type: "success" });
    } catch (e) {
      notify(e.message, "error");
    }
  }, [object, activity, outbox, notify]);

  return (
    <IconButton aria-label="like" onClick={boost} {...rest}>
      <RepeatIcon />
    </IconButton>
  );
};

export default LikeButton;
