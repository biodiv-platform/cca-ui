/* eslint-disable simple-import-sort/imports */
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/ui/oxide/skin.min.css";

import "tinymce/tinymce";
import "tinymce/models/dom/model";
import "tinymce/icons/default";
import "tinymce/plugins/code";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";
import "tinymce/themes/silver/theme";

import { Editor } from "@tinymce/tinymce-react";
import React from "react";

interface WYSIWYGEditorProps {
  uploadHandler?;
  [key: string]: any;
}

export default function WYSIWYGEditor({ uploadHandler, ...props }: WYSIWYGEditorProps) {
  return (
    <Editor
      {...props}
      init={{
        skin: false,
        width: "100%",
        height: "300px",
        relative_urls: false,
        convert_urls: false,
        plugins: [
          "advlist",
          "paste",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "print",
          "preview",
          "anchor",
          "help",
          "searchreplace",
          "visualblocks",
          "code",
          "insertdatetime",
          "media",
          "table",
          "paste",
          "wordcount",
          uploadHandler ? "image" : "na"
        ],
        toolbar:
          "image undo paste-as-text redo  bold italic alignleft aligncenter alignright alignjustify bullist link numlist table outdent indent help code",
        images_upload_handler: uploadHandler,
        images_upload_base_path: "/",
        valid_elements: "*[*]",
        valid_children: "+body[style]",
        verify_html: false,
        extended_valid_elements: "style[type|media],link[rel|type|media|href]"
      }}
    />
  );
}
