
import React, { useState } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Switch,
} from '@mui/material';
import { z } from 'zod';

const multiStepSchema = z.object({
  // Step 1: Personal Info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  
  // Step 2: Preferences
  theme: z.enum(['light', 'dark', 'auto']),
  notifications: z.array(z.string()),
  language: z.string().min(1, 'Please select a language'),
  
  // Step 3: Account Setup
  username: z.string().min(3, 'Username must be at least 3 characters'),
  bio: z.string().min(10, 'Bio must be at least 10 characters').max(200, 'Bio must be under 200 characters'),
  isPublic: z.boolean(),
});

type MultiStepFormData = z.infer<typeof multiStepSchema>;

const steps = ['Personal Information', 'Preferences', 'Account Setup'];

const MultiStepForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<MultiStepFormData>({
    resolver: zodResolver(multiStepSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      theme: 'auto',
      notifications: [],
      language: '',
      username: '',
      bio: '',
      isPublic: false,
    },
  });

  const watchedBio = watch('bio');

  const handleNext = async () => {
    const fieldsToValidate = getFieldsForStep(activeStep);
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getFieldsForStep = (step: number): (keyof MultiStepFormData)[] => {
    switch (step) {
      case 0:
        return ['firstName', 'lastName', 'email'];
      case 1:
        return ['theme', 'notifications', 'language'];
      case 2:
        return ['username', 'bio', 'isPublic'];
      default:
        return [];
    }
  };

  const onSubmit = async (data: MultiStepFormData) => {
    console.log('Multi-Step Form Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Multi-step form submitted successfully!');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
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
          </Box>
        );
      
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Theme Preference</FormLabel>
              <Controller
                name="theme"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel value="light" control={<Radio />} label="Light" />
                    <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                    <FormControlLabel value="auto" control={<Radio />} label="Auto" />
                  </RadioGroup>
                )}
              />
            </FormControl>
            
            <FormControl component="fieldset">
              <FormLabel component="legend">Notification Preferences</FormLabel>
              <Controller
                name="notifications"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormGroup>
                    {['email', 'push', 'sms', 'newsletter'].map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            checked={value.includes(option)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                onChange([...value, option]);
                              } else {
                                onChange(value.filter((item) => item !== option));
                              }
                            }}
                          />
                        }
                        label={option.charAt(0).toUpperCase() + option.slice(1)}
                      />
                    ))}
                  </FormGroup>
                )}
              />
            </FormControl>

            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.language}>
                  <InputLabel>Preferred Language</InputLabel>
                  <Select {...field} label="Preferred Language">
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                    <MenuItem value="zh">Chinese</MenuItem>
                  </Select>
                  {errors.language && (
                    <Typography variant="caption" color="error">
                      {errors.language.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Box>
        );
      
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Username"
                  placeholder="Choose a username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  variant="outlined"
                />
              )}
            />
            
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
                {watchedBio?.length || 0}/200 characters
              </Typography>
            </Box>

            <Controller
              name="isPublic"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  control={<Switch checked={value} onChange={onChange} />}
                  label="Make profile public"
                />
              )}
            />
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2" color="primary">
            Multi-Step Form
          </Typography>
        }
        subheader="Step-by-step form with validation at each stage"
      />
      <CardContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="contained"
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MultiStepForm;
