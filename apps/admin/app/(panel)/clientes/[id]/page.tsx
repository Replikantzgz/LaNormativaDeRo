import { ClientDetail } from "./ClientDetail";

export default async function Page({ params }: PageProps<"/clientes/[id]">) {
  const { id } = await params;
  return <ClientDetail id={id} />;
}
