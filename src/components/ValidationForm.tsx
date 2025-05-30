
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  Paper,
  Grid,
  Alert,
  LinearProgress,
} from '@mui/material';
import { z } from 'zod';

const validationSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select a priority level' })
  }),
  tags: z.array(z.string()).min(1, 'Please select at least one tag'),
});

type ValidationFormData = z.infer<typeof validationSchema>;

const ValidationForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
    watch,
  } = useForm<ValidationFormData>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      phone: '',
      website: '',
      priority: 'medium',
      tags: [],
    },
  });

  const watchedUsername = watch('username');
  const watchedEmail = watch('email');

  const availableTags = ['React', 'TypeScript', 'Material-UI', 'Node.js', 'Python', 'JavaScript', 'CSS', 'HTML'];

  const onSubmit = async (data: ValidationFormData) => {
    console.log('Validation Form Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Validation form submitted successfully!');
  };

  const getValidationProgress = () => {
    const fields = ['username', 'email', 'phone', 'priority', 'tags'];
    const validFields = fields.filter(field => {
      if (field === 'tags') return watch('tags').length > 0;
      return watch(field as keyof ValidationFormData) && !errors[field as keyof typeof errors];
    });
    return (validFields.length / fields.length) * 100;
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2" color="primary">
            Advanced Validation Examples
          </Typography>
        }
        subheader="Complex validation patterns with real-time feedback"
      />
      <CardContent>
        <Paper sx={{ p: 2, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>
            Form Completion Progress
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={getValidationProgress()} 
            sx={{ mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {Math.round(getValidationProgress())}% complete
          </Typography>
        </Paper>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Username"
                    placeholder="Enter username (3-20 chars)"
                    error={!!errors.username}
                    helperText={
                      errors.username?.message || 
                      (touchedFields.username && !errors.username && '✓ Username is valid')
                    }
                    variant="outlined"
                    color={touchedFields.username && !errors.username ? 'success' : 'primary'}
                  />
                )}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {watchedUsername.length}/20 characters
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    error={!!errors.email}
                    helperText={
                      errors.email?.message || 
                      (touchedFields.email && !errors.email && '✓ Email is valid')
                    }
                    variant="outlined"
                    color={touchedFields.email && !errors.email ? 'success' : 'primary'}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    error={!!errors.phone}
                    helperText={
                      errors.phone?.message || 
                      (touchedFields.phone && !errors.phone && '✓ Phone number is valid')
                    }
                    variant="outlined"
                    color={touchedFields.phone && !errors.phone ? 'success' : 'primary'}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Website (Optional)"
                    placeholder="https://example.com"
                    error={!!errors.website}
                    helperText={
                      errors.website?.message || 
                      (touchedFields.website && !errors.website && field.value && '✓ URL is valid')
                    }
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.priority}>
                <InputLabel>Priority Level</InputLabel>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Priority Level">
                      <MenuItem value="low">Low Priority</MenuItem>
                      <MenuItem value="medium">Medium Priority</MenuItem>
                      <MenuItem value="high">High Priority</MenuItem>
                    </Select>
                  )}
                />
                {errors.priority && <FormHelperText>{errors.priority.message}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Select Tags
              </Typography>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {availableTags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          variant={field.value.includes(tag) ? 'filled' : 'outlined'}
                          color={field.value.includes(tag) ? 'primary' : 'default'}
                          onClick={() => {
                            if (field.value.includes(tag)) {
                              field.onChange(field.value.filter(t => t !== tag));
                            } else {
                              field.onChange([...field.value, tag]);
                            }
                          }}
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Box>
                    {errors.tags && (
                      <Typography variant="caption" color="error">
                        {errors.tags.message}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Selected: {field.value.length} tag(s)
                    </Typography>
                  </Box>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{ flex: 1 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Form'}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => reset()}
                  sx={{ flex: 1 }}
                >
                  Reset Form
                </Button>
              </Box>
            </Grid>

            {Object.keys(errors).length > 0 && (
              <Grid item xs={12}>
                <Alert severity="error">
                  Please fix the {Object.keys(errors).length} error(s) above before submitting.
                </Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ValidationForm;
