'use client';

import { Box, Button, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleBeginNow = () => {
    router.push('/main'); // Navigate to the main page
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* Hero Section */}
      <Stack
        spacing={3}
        maxWidth="90%" // Adjust width for smaller screens
        padding={{ xs: 2, sm: 3, md: 4 }}
        bgcolor="rgba(255, 255, 255, 0.9)"
        borderRadius={2}
      >
        <Typography
          variant="h2"
          color="primary.main"
          fontWeight="bold"
          fontSize={{ xs: '2rem', sm: '2.5rem', md: '3rem' }} // Responsive font size
        >
          Welcome to Rate My Game
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          fontSize={{ xs: '1rem', sm: '1.25rem', md: '1.5rem' }} // Responsive font size
        >
          Perfect your crush text game with feedback and improvements from our AI assistant.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleBeginNow}
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            padding: { xs: '8px 16px', sm: '10px 20px', md: '12px 24px' },
            borderRadius: '8px',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          Begin Now
        </Button>
      </Stack>
    </Box>
  );
}