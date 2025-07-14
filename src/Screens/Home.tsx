import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

export interface IHomeProps {
}

export default function Home (props: IHomeProps) {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography>
        {t('WelcomeToTheHomePage')}
      </Typography>
    </Box>
  );
}
