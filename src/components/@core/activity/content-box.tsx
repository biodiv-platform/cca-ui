import { Box, Text } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import LinkTag from "@components/pages/document/common/link-tag";
import { ShowActivityIbp } from "@interfaces/activity";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import ACTIVITY_TYPE from "./activity-types";
import CommentRender from "./comment-render";

const ContentBox = ({ activity }: { activity: ShowActivityIbp }) => {
  const { t } = useTranslation();
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
      return <CommentRender html={activity?.commentsIbp?.body} />;
    case ACTIVITY_TYPE.PERMISSION_ADDED:
    case ACTIVITY_TYPE.PERMISSION_REMOVED:
    case ACTIVITY_TYPE.FOLLOWER_ADDED:
    case ACTIVITY_TYPE.FOLLOWER_REMOVED:
      return <CommentRender html={activity?.activityIbp?.activityDescription} />;

    case ACTIVITY_TYPE.DOCUMENT_TAG_UPDATED:
      const tags = activity.activityIbp?.activityDescription?.split(",") || [];
      return (
        <Box mt={2}>
          {tags.map((tag) => (
            <LinkTag key={tag} label={tag} href={"/data/list"} />
          ))}
        </Box>
      );

    case ACTIVITY_TYPE.FLAGGED:
    case ACTIVITY_TYPE.FLAG_REMOVED:
      const desc = activity?.activityIbp?.activityDescription || ":";
      const [flagType, flagInfo]: any = desc.split(/:(.+)/);
      const html = `${t(`common:actions.flag.flags.${flagType.toLowerCase()}`)}: ${flagInfo}`;
      return <CommentRender html={html} />;

    default:
      return (
        <Box>
          <Box whiteSpace="pre-line">{activity?.activityIbp?.activityDescription}</Box>
        </Box>
      );
  }
};

export default ContentBox;
