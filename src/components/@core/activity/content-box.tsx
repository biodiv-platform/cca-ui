import { Box, Text } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import { ShowActivityIbp } from "@interfaces/activity";
import React from "react";

import ACTIVITY_TYPE from "./activity-types";
import CommentRender from "./comment-render";

const ContentBox = ({ activity }: { activity: ShowActivityIbp }) => {
  const at = activity.activityIbp?.activityType;

  switch (at) {
    case ACTIVITY_TYPE.POSTED_RESOURCE:
    case ACTIVITY_TYPE.REMOVED_RESOURCE:
      const ad1 = JSON.parse(activity.activityIbp?.activityDescription || "{}");
      return (
        <Box>
          <BlueLink href={ad1?.webAddress}>{ad1?.userGroupName}</BlueLink>
          {at !== ACTIVITY_TYPE.UNFEATURED && <Text as="p">{ad1?.featured}</Text>}
        </Box>
      );
    case ACTIVITY_TYPE.ADDED_A_COMMENT:
    case ACTIVITY_TYPE.PERMISSION_ADDED:
    case ACTIVITY_TYPE.PERMISSION_REMOVED:
    case ACTIVITY_TYPE.FOLLOWER_ADDED:
    case ACTIVITY_TYPE.FOLLOWER_REMOVED:
      return <CommentRender html={activity?.activityIbp?.activityDescription} />;

    default:
      return (
        <Box>
          <Box whiteSpace="pre-line">{activity?.activityIbp?.activityDescription}</Box>
        </Box>
      );
  }
};

export default ContentBox;
