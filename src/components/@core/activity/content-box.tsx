import { Box } from "@chakra-ui/react";
import { ShowActivityIbp } from "@interfaces/activity";
import React from "react";

import ACTIVITY_TYPE from "./activity-types";
import CommentRender from "./comment-render";

const ContentBox = ({ activity }: { activity: ShowActivityIbp }) => {
  const at = activity.activityIbp?.activityType;

  switch (at) {
    case ACTIVITY_TYPE.DATA_COMMENTED:
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
