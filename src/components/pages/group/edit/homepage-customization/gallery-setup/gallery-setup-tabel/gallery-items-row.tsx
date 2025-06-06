import { Box, Button, Image, Link } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import { RESOURCE_SIZE } from "@static/constants";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuCheck, LuDelete, LuGripVertical, LuLink, LuPencil, LuX } from "react-icons/lu";
import { SortableElement } from "react-sortable-hoc";

const GalleryItemsRow: any = SortableElement(({ itemDetails, onDelete, onEdit }) => {
  const { t } = useTranslation();
  const { title, customDescripition, moreLinks, fileName, truncated } = itemDetails;
  const { currentGroup } = useGlobalState();
  const imgUrl = getNextResourceThumbnail(
    RESOURCE_CTX.USERGROUPS,
    fileName,
    RESOURCE_SIZE.LIST_THUMBNAIL
  );

  return (
    <tr>
      <Box as="td" w="16rem">
        <LuGripVertical cursor="move" /> {title}
      </Box>
      <td>
        <Image src={imgUrl} />
      </td>
      <td>{customDescripition}</td>

      {currentGroup.id ? (
        <td>
          <Link target="_blank" href={moreLinks}>
            <LuLink />
          </Link>
        </td>
      ) : (
        <td>{truncated ? <LuCheck color={"blue"} /> : <LuX color={"red"} />}</td>
      )}
      <td>
        <Button onClick={onDelete} colorPalette="red" ml={2}>
          <LuDelete />
          {t("common:delete")}
        </Button>
      </td>
      <td>
        <Button onClick={onEdit} colorPalette="blue" ml={2}>
          <LuPencil />
          {t("common:edit")}
        </Button>
      </td>
    </tr>
  );
});

export default GalleryItemsRow;
