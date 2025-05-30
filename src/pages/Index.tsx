
import React from 'react';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { darkTheme } from '../theme/theme';
import ConceptsOverview from '../components/ConceptsOverview';
import BasicForm from '../components/BasicForm';
import AdvancedForm from '../components/AdvancedForm';
import DynamicForm from '../components/DynamicForm';
import WatchForm from '../components/WatchForm';

const Index: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <ConceptsOverview />
          <BasicForm />
          <AdvancedForm />
          <DynamicForm />
          <WatchForm />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Index;
