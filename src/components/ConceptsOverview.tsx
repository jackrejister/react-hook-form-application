
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  DynamicForm,
  Visibility,
  Speed,
} from '@mui/icons-material';

const ConceptsOverview: React.FC = () => {
  const concepts = [
    {
      title: 'Basic Form Handling',
      description: 'Simple form with validation and error handling',
      icon: <CheckCircle color="primary" />,
      features: ['Basic field types', 'Real-time validation', 'Error messages', 'Form submission'],
    },
    {
      title: 'Advanced Features',
      description: 'Complex form elements and file handling',
      icon: <Code color="primary" />,
      features: ['File uploads', 'Date pickers', 'Radio buttons', 'Checkboxes', 'Select dropdowns'],
    },
    {
      title: 'Dynamic Forms',
      description: 'Dynamic field arrays and conditional logic',
      icon: <DynamicForm color="primary" />,
      features: ['useFieldArray', 'Add/remove fields', 'Nested objects', 'Dynamic validation'],
    },
    {
      title: 'Watch & Control',
      description: 'Real-time form state monitoring',
      icon: <Visibility color="primary" />,
      features: ['watch() hook', 'Conditional fields', 'Form state tracking', 'Real-time updates'],
    },
  ];

  const formFeatures = [
    'TypeScript integration for type safety',
    'Zod schema validation for robust data validation',
    'Material-UI components for beautiful UI',
    'Dark theme for modern aesthetics',
    'Responsive design for all devices',
    'Performance optimized with minimal re-renders',
    'Comprehensive error handling',
    'Accessibility features built-in',
  ];

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
            React Hook Form Complete Guide
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
            Master every concept of React Hook Form with practical examples
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            This comprehensive application demonstrates all React Hook Form concepts including form validation,
            complex field types, dynamic forms, and advanced patterns using TypeScript, Zod validation, and Material-UI.
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {concepts.map((concept, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {concept.icon}
                      <Typography variant="h6" sx={{ ml: 2 }}>
                        {concept.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {concept.description}
                    </Typography>
                    <List dense>
                      {concept.features.map((feature, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature} 
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

          <Paper sx={{ p: 3, backgroundColor: 'action.hover' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Speed color="primary" />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Key Features of This Application
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {formFeatures.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle color="success" fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ConceptsOverview;
