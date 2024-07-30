import type { RichText } from "apps/admin/widgets.ts";

export interface Props {
  html: RichText;
}

export default function HTMLContent({ html }: Props) {
  if (!html) return null;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
