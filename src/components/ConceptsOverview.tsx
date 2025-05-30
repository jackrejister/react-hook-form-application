
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircleOutline,
  Code,
  DynamicForm,
  Security,
  Visibility,
  Speed,
  BugReport,
  Group,
} from '@mui/icons-material';

const ConceptsOverview: React.FC = () => {
  const concepts = [
    {
      title: 'Basic Form Handling',
      description: 'Simple form with validation and error handling',
      icon: <CheckCircleOutline color="primary" />,
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
    'Material UI components for beautiful UI',
    'Dark theme for modern aesthetics',
    'Responsive design for all devices',
    'Performance optimized with minimal re-renders',
    'Comprehensive error handling',
    'Accessibility features built-in',
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={
            <Typography variant="h4" component="h1" color="primary" gutterBottom>
              React Hook Form Complete Guide
            </Typography>
          }
          subheader={
            <Typography variant="h6" color="text.secondary">
              Master every concept of React Hook Form with practical examples
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1" paragraph>
            This comprehensive application demonstrates all React Hook Form concepts including form validation,
            complex field types, dynamic forms, and advanced patterns using TypeScript, Zod validation, and Material UI.
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {concepts.map((concept, index) => (
              <Grid xs={12} md={6} key={index}>
                <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {concept.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {concept.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {concept.description}
                  </Typography>
                  <List dense>
                    {concept.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleOutline fontSize="small" color="success" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper sx={{ p: 3, mt: 3, backgroundColor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Speed color="primary" sx={{ mr: 1 }} />
              Key Features of This Application
            </Typography>
            <Grid container spacing={2}>
              {formFeatures.map((feature, index) => (
                <Grid xs={12} sm={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutline fontSize="small" color="success" sx={{ mr: 1 }} />
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConceptsOverview;
