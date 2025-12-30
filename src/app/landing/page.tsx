import { Box } from '@mantine/core';

import { Globe, Navbar } from '@/src/components/organisms';

export default function LandingPage() {
  return (
    <Box
      style={{
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        background: '#000',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
      }}
    >
      <Navbar />
      <Globe />
    </Box>
  );
}
