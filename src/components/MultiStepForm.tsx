
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
  Checkbox,
  FormGroup,
  Grid,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { z } from 'zod';

const multiStepSchema = z.object({
  // Step 1: Personal Info
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  
  // Step 2: Preferences
  theme: z.enum(['light', 'dark', 'auto']),
  notifications: z.array(z.string()),
  language: z.string().min(1, 'Please select a language'),
  
  // Step 3: Account Settings
  username: z.string().min(3, 'Username must be at least 3 characters'),
  bio: z.string().max(200, 'Bio must be less than 200 characters'),
  isPublic: z.boolean(),
});

type MultiStepFormData = z.infer<typeof multiStepSchema>;

const steps = ['Personal Information', 'Preferences', 'Account Settings'];

const MultiStepForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    reset,
    watch,
  } = useForm<MultiStepFormData>({
    resolver: zodResolver(multiStepSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      theme: 'dark',
      notifications: [],
      language: '',
      username: '',
      bio: '',
      isPublic: false,
    },
  });

  const formData = watch();

  const getStepFields = (step: number): (keyof MultiStepFormData)[] => {
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

  const handleNext = async () => {
    const fields = getStepFields(activeStep);
    const isStepValid = await trigger(fields);
    
    if (isStepValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (data: MultiStepFormData) => {
    console.log('Multi-step Form Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Multi-step form submitted successfully!');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
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
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid xs={12} md={6}>
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
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid xs={12}>
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
            </Grid>
            
            <Grid xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Notification Preferences</FormLabel>
                <Controller
                  name="notifications"
                  control={control}
                  render={({ field }) => (
                    <FormGroup>
                      {['Email Updates', 'Push Notifications', 'SMS Alerts', 'Newsletter'].map((option) => (
                        <FormControlLabel
                          key={option}
                          control={
                            <Checkbox
                              checked={field.value.includes(option)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, option]);
                                } else {
                                  field.onChange(field.value.filter(item => item !== option));
                                }
                              }}
                            />
                          }
                          label={option}
                        />
                      ))}
                    </FormGroup>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    label="Preferred Language"
                    error={!!errors.language}
                    helperText={errors.language?.message}
                    variant="outlined"
                    SelectProps={{ native: true }}
                  >
                    <option value="">Select a language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid xs={12}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Username"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            
            <Grid xs={12}>
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
                    helperText={errors.bio?.message}
                    variant="outlined"
                  />
                )}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {formData.bio?.length || 0}/200 characters
              </Typography>
            </Grid>

            <Grid xs={12}>
              <Controller
                name="isPublic"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Make profile public"
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Review Your Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={`${formData.firstName} ${formData.lastName}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Email" secondary={formData.email} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Theme" secondary={formData.theme} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Notifications" 
                  secondary={formData.notifications.length > 0 ? formData.notifications.join(', ') : 'None selected'} 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Language" secondary={formData.language} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Username" secondary={formData.username} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Profile Visibility" secondary={formData.isPublic ? 'Public' : 'Private'} />
              </ListItem>
            </List>
          </Paper>
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
            Multi-Step Form Example
          </Typography>
        }
        subheader="Complex form flow with step-by-step validation"
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
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  reset();
                  setActiveStep(0);
                }}
              >
                Reset
              </Button>
              
              {activeStep === steps.length ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Review' : 'Next'}
                </Button>
              )}
            </Box>
          </Box>

          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Please fix the errors in the current step before proceeding.
            </Alert>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MultiStepForm;
