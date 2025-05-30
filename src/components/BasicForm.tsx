
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
  Slider,
  Alert,
  Paper,
} from '@mui/material';
import { Error } from '@mui/icons-material';
import { basicFormSchema, type BasicFormData } from '../schemas/formSchemas';

const BasicForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
  } = useForm<BasicFormData>({
    resolver: zodResolver(basicFormSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 25,
      bio: '',
    },
  });

  const watchedAge = watch('age');
  const watchedBio = watch('bio');

  const onSubmit = async (data: BasicFormData) => {
    console.log('Basic Form Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Form submitted successfully!');
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2" color="primary">
            Basic Form Concepts
          </Typography>
        }
        subheader="useForm, Controller, validation, and basic field types"
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="First Name"
                    placeholder="Enter your first name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    variant="outlined"
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Last Name"
                    placeholder="Enter your last name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    variant="outlined"
                  />
                )}
              />
            </Box>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  variant="outlined"
                />
              )}
            />

            <Box>
              <Typography gutterBottom>Age: {watchedAge} years</Typography>
              <Controller
                name="age"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={value}
                      onChange={(_, newValue) => onChange(newValue)}
                      min={18}
                      max={100}
                      step={1}
                      marks={[
                        { value: 18, label: '18' },
                        { value: 50, label: '50' },
                        { value: 100, label: '100' },
                      ]}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                )}
              />
              {errors.age && (
                <Typography variant="caption" color="error">
                  {errors.age.message}
                </Typography>
              )}
            </Box>

            <Box>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Bio"
                    placeholder="Tell us about yourself..."
                    multiline
                    rows={4}
                    error={!!errors.bio}
                    helperText={errors.bio?.message}
                    variant="outlined"
                  />
                )}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {watchedBio?.length || 0}/500 characters
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !isValid}
                sx={{ flex: 1 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => reset()}
                sx={{ flex: 1 }}
              >
                Reset
              </Button>
            </Box>

            {Object.keys(errors).length > 0 && (
              <Alert severity="error" icon={<Error />}>
                Please fix the errors above before submitting.
              </Alert>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BasicForm;
