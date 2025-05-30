
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  Visibility,
  DynamicForm,
  Validation,
} from '@mui/icons-material';

const ConceptsOverview: React.FC = () => {
  const concepts = [
    {
      title: 'Basic Concepts',
      icon: <Code />,
      concepts: [
        'useForm hook initialization',
        'Controller component for controlled inputs',
        'Form validation with Zod',
        'Error handling and display',
        'Form state management (isSubmitting, isValid)',
        'Reset functionality',
        'Basic field types (text, email, number, textarea)',
      ],
    },
    {
      title: 'Advanced Features',
      icon: <Validation />,
      concepts: [
        'Complex validation schemas',
        'Password confirmation validation',
        'File upload handling',
        'Date picker integration',
        'Radio groups and checkboxes',
        'Select dropdowns with options',
        'Custom validation messages',
        'Field touch states',
      ],
    },
    {
      title: 'Dynamic Forms',
      icon: <DynamicForm />,
      concepts: [
        'useFieldArray for dynamic fields',
        'Adding and removing form fields',
        'Nested object validation',
        'Dynamic tag management',
        'Array field validation',
        'Complex nested forms',
        'Field array manipulation',
      ],
    },
    {
      title: 'Watch & Conditional',
      icon: <Visibility />,
      concepts: [
        'watch() for real-time field monitoring',
        'Conditional field rendering',
        'Dependent field validation',
        'Real-time price calculation',
        'Dynamic feature lists',
        'Subscription-based field enabling',
        'Form state-based UI updates',
      ],
    },
  ];

  const features = [
    'TypeScript integration',
    'Zod schema validation',
    'Material-UI dark theme',
    'Responsive design',
    'Real-time validation',
    'File upload preview',
    'Dynamic pricing',
    'Conditional logic',
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
            React Hook Form Comprehensive Guide
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
            A complete showcase of React Hook Form features with Material-UI and Zod validation
          </Typography>
          
          <Paper sx={{ p: 2, mt: 3, backgroundColor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom>
              Features Demonstrated
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {features.map((feature) => (
                <Chip key={feature} label={feature} color="secondary" size="small" />
              ))}
            </Box>
          </Paper>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {concepts.map((section, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {section.icon}
                  <Typography variant="h6" component="h2" sx={{ ml: 1 }}>
                    {section.title}
                  </Typography>
                </Box>
                <List dense>
                  {section.concepts.map((concept, conceptIndex) => (
                    <ListItem key={conceptIndex} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={concept}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ConceptsOverview;
