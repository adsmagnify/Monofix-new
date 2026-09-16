import {
  CaseIcon,
  ChartUpwardIcon,
  CogIcon,
  CommentIcon,
  DocumentTextIcon,
  ImageIcon,
  ImagesIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("MONOFIX content")
    .items([
      S.listItem()
        .title("Display settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("homeBanner").title("Home banners").icon(ImagesIcon),
      S.documentTypeListItem("galleryItem").title("Gallery").icon(ImageIcon),
      S.documentTypeListItem("clientStory").title("Client stories").icon(CommentIcon),
      S.documentTypeListItem("insight").title("Insights").icon(DocumentTextIcon),
      S.documentTypeListItem("caseStudy").title("Case studies").icon(CaseIcon),
      S.documentTypeListItem("materialPrice").title("Material prices").icon(ChartUpwardIcon),
    ]);
