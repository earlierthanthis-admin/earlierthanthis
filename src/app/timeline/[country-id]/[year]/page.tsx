import { EssayReader } from '@/src/components/templates';

interface PageProps {
  params: Promise<{
    'country-id': string;
    year: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { 'country-id': countryId, year: yearString } = await params;
  const year = parseInt(yearString, 10);

  return <EssayReader countryId={countryId} year={year} />;
}
