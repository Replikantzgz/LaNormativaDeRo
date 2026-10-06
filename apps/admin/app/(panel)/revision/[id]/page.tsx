import { FilingDetail } from "./FilingDetail";

export default async function Page({ params }: PageProps<"/revision/[id]">) {
  const { id } = await params;
  return <FilingDetail id={id} />;
}
