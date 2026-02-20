import { redirect } from "next/navigation";

/** Form page hidden for now; contact cards on /contact use mailto links. Re-enable when email delivery is configured. */
export default async function SupportContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/contact`);
}
