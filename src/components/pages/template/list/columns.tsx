import { Button, Link } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import TimeAgo from "@components/pages/common/timeago";
import EditIcon from "@icons/edit";
import { axDeleteTemplate } from "@services/cca.service";
import { TEMPLATE } from "@static/events";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { emit } from "react-gbus";
import { LuEye } from "react-icons/lu";

import DeleteIcon from "@/icons/delete";

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
        <LocalLink href={`/template/edit/${value}`} prefixGroup={true}>
          <Link>
            <EditIcon /> {t("common:edit")}
          </Link>
        </LocalLink>
      );
    }
  },
  {
    Header: "form:responses",
    accessor: "responseShowId",
    Cell: ({ value }) => {
      const { t } = useTranslation();

      return (
        <LocalLink href={`/data/table/${value}`} prefixGroup={true}>
          <Link>
            <LuEye /> {t("common:view")}
          </Link>
        </LocalLink>
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
        <Button colorScheme="red" onClick={deleteTemplate}>
          <DeleteIcon />
          {t("common:delete")}
        </Button>
      );
    }
  }
];
