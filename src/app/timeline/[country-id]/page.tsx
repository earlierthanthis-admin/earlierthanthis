import { Timeline } from '@/src/components/templates';

interface PageProps {
  params: Promise<{
    'country-id': string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { 'country-id': countryId } = await params;

  return <Timeline countryId={countryId} />;
}
