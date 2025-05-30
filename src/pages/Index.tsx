
import React from 'react';
import { Container, Box } from '@mui/material';
import ConceptsOverview from '../components/ConceptsOverview';
import BasicForm from '../components/BasicForm';
import AdvancedForm from '../components/AdvancedForm';
import DynamicForm from '../components/DynamicForm';
import WatchForm from '../components/WatchForm';
import ValidationForm from '../components/ValidationForm';
import MultiStepForm from '../components/MultiStepForm';

const Index: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <ConceptsOverview />
        <BasicForm />
        <ValidationForm />
        <AdvancedForm />
        <MultiStepForm />
        <DynamicForm />
        <WatchForm />
      </Container>
    </Box>
  );
};

export default Index;
