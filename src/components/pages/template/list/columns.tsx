import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import NextLink from "@components/@core/next-link";
import TimeAgo from "@components/pages/common/timeago";
import EditIcon from "@icons/edit";
import { axDeleteTemplate } from "@services/cca.service";
import { TEMPLATE } from "@static/events";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { emit } from "react-gbus";

export const ListColumns = [
  {
    Header: "form:name",
    accessor: "name"
  },
  {
    Header: "form:created_on",
    accessor: "createdOn",
    Cell: TimeAgo
  },
  {
    Header: "form:updated_on",
    accessor: "updatedOn",
    Cell: TimeAgo
  },
  {
    Header: "common:edit",
    accessor: "editId",
    Cell: ({ value }) => {
      const { t } = useTranslation();

      return (
        <NextLink href={`/template/edit/${value}`}>
          <Link>
            <EditIcon /> {t("common:edit")}
          </Link>
        </NextLink>
      );
    }
  },
  {
    Header: "form:responses",
    accessor: "responseShowId",
    Cell: ({ value }) => {
      const { t } = useTranslation();

      return (
        <NextLink href={`/data/table/${value}`}>
          <Link>
            <ViewIcon /> {t("common:view")}
          </Link>
        </NextLink>
      );
    }
  },
  {
    Header: "common:delete",
    accessor: "deleteId",
    Cell: ({ value }) => {
      const { t } = useTranslation();

      const deleteTemplate = async () => {
        if (!confirm(t("template:delete.confirm"))) return;

        const { success } = await axDeleteTemplate(value);

        if (success) {
          emit(TEMPLATE.DELETED, { templateId: value });
          notification(t("template:delete.success"), NotificationType.Success);
        } else {
          notification(t("template:delete.error"));
        }
      };

      return (
        <Button variant="link" colorScheme="red" onClick={deleteTemplate} leftIcon={<DeleteIcon />}>
          {t("common:delete")}
        </Button>
      );
    }
  }
];
