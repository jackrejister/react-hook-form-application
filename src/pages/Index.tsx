
import React from 'react';
import ConceptsOverview from '../components/ConceptsOverview';
import BasicForm from '../components/BasicForm';
import AdvancedForm from '../components/AdvancedForm';
import DynamicForm from '../components/DynamicForm';
import WatchForm from '../components/WatchForm';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ConceptsOverview />
        <BasicForm />
        <AdvancedForm />
        <DynamicForm />
        <WatchForm />
      </div>
    </div>
  );
};

export default Index;
