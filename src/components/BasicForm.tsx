
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
  Alert,
  Slider,
} from '@mui/material';
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

  const onSubmit = async (data: BasicFormData) => {
    console.log('Basic Form Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    alert('Form submitted successfully!');
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
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
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                margin="normal"
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
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                margin="normal"
                variant="outlined"
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                margin="normal"
                variant="outlined"
              />
            )}
          />

          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography gutterBottom>
              Age: {watchedAge} years
            </Typography>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <Slider
                  {...field}
                  min={18}
                  max={100}
                  valueLabelDisplay="auto"
                  sx={{ mt: 1 }}
                />
              )}
            />
            {errors.age && (
              <Typography color="error" variant="caption">
                {errors.age.message}
              </Typography>
            )}
          </Box>

          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Bio"
                multiline
                rows={4}
                error={!!errors.bio}
                helperText={errors.bio?.message || `${field.value.length}/500 characters`}
                margin="normal"
                variant="outlined"
              />
            )}
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
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
            <Alert severity="error" sx={{ mt: 2 }}>
              Please fix the errors above before submitting.
            </Alert>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BasicForm;
