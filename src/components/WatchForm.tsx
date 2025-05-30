
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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Alert,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import { watchFormSchema, type WatchFormData } from '../schemas/formSchemas';

const subscriptionFeatures = {
  basic: ['Email Support', 'Basic Analytics', '5 Users'],
  premium: ['Email Support', 'Basic Analytics', '25 Users', 'Chat Support', 'Advanced Analytics'],
  enterprise: ['Email Support', 'Basic Analytics', 'Unlimited Users', 'Chat Support', 'Advanced Analytics', 'Phone Support', 'Custom Integration'],
};

const additionalServices = ['Training', 'Custom Development', 'Priority Support', 'Data Migration'];

const WatchForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<WatchFormData>({
    resolver: zodResolver(watchFormSchema),
    mode: 'onChange',
    defaultValues: {
      subscriptionType: 'basic',
      features: [],
      maxUsers: 1,
      customDomain: false,
      supportLevel: 'email',
      additionalServices: [],
    },
  });

  // Watch specific fields to create conditional logic
  const watchedSubscription = watch('subscriptionType');
  const watchedCustomDomain = watch('customDomain');
  const watchedFeatures = watch('features');
  const watchedMaxUsers = watch('maxUsers');
  const watchedSupportLevel = watch('supportLevel');

  const onSubmit = async (data: WatchFormData) => {
    console.log('Watch Form Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Subscription form submitted successfully!');
  };

  const calculatePrice = () => {
    let basePrice = 0;
    switch (watchedSubscription) {
      case 'basic':
        basePrice = 29;
        break;
      case 'premium':
        basePrice = 99;
        break;
      case 'enterprise':
        basePrice = 299;
        break;
    }

    if (watchedCustomDomain) basePrice += 20;
    if (watchedSupportLevel === 'chat') basePrice += 30;
    if (watchedSupportLevel === 'phone') basePrice += 50;

    return basePrice;
  };

  const availableFeatures = subscriptionFeatures[watchedSubscription] || [];

  return (
    <Card sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2" color="primary">
            Watch & Conditional Forms
          </Typography>
        }
        subheader="Using watch() for conditional rendering and real-time updates"
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormControl component="fieldset" margin="normal" error={!!errors.subscriptionType}>
            <FormLabel component="legend">Subscription Type</FormLabel>
            <Controller
              name="subscriptionType"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel value="basic" control={<Radio />} label="Basic ($29/mo)" />
                  <FormControlLabel value="premium" control={<Radio />} label="Premium ($99/mo)" />
                  <FormControlLabel value="enterprise" control={<Radio />} label="Enterprise ($299/mo)" />
                </RadioGroup>
              )}
            />
          </FormControl>

          <Paper sx={{ p: 2, mt: 2, mb: 2, backgroundColor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom>
              Included Features for {watchedSubscription.charAt(0).toUpperCase() + watchedSubscription.slice(1)}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {availableFeatures.map((feature) => (
                <Chip key={feature} label={feature} color="primary" size="small" />
              ))}
            </Box>
          </Paper>

          <Controller
            name="maxUsers"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Maximum Users"
                type="number"
                inputProps={{ 
                  min: 1, 
                  max: watchedSubscription === 'basic' ? 5 : 
                       watchedSubscription === 'premium' ? 25 : 
                       1000 
                }}
                error={!!errors.maxUsers}
                helperText={
                  errors.maxUsers?.message || 
                  `Limit: ${watchedSubscription === 'basic' ? '5' : 
                           watchedSubscription === 'premium' ? '25' : 
                           'Unlimited'} users`
                }
                margin="normal"
                variant="outlined"
              />
            )}
          />

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Additional Features</FormLabel>
            <Controller
              name="customDomain"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Custom Domain (+$20/mo)"
                  disabled={watchedSubscription === 'basic'}
                />
              )}
            />
          </FormControl>

          {watchedSubscription !== 'basic' && (
            <FormControl component="fieldset" margin="normal" error={!!errors.supportLevel}>
              <FormLabel component="legend">Support Level</FormLabel>
              <Controller
                name="supportLevel"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel value="email" control={<Radio />} label="Email Support (Included)" />
                    <FormControlLabel 
                      value="chat" 
                      control={<Radio />} 
                      label="Chat Support (+$30/mo)"
                      disabled={watchedSubscription === 'basic'}
                    />
                    <FormControlLabel 
                      value="phone" 
                      control={<Radio />} 
                      label="Phone Support (+$50/mo)"
                      disabled={watchedSubscription !== 'enterprise'}
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          )}

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Additional Services</FormLabel>
            <Controller
              name="additionalServices"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  {additionalServices.map((service) => (
                    <FormControlLabel
                      key={service}
                      control={
                        <Checkbox
                          checked={field.value?.includes(service) || false}
                          onChange={(e) => {
                            const current = field.value || [];
                            if (e.target.checked) {
                              field.onChange([...current, service]);
                            } else {
                              field.onChange(current.filter((s) => s !== service));
                            }
                          }}
                        />
                      }
                      label={service}
                    />
                  ))}
                </FormGroup>
              )}
            />
          </FormControl>

          <Divider sx={{ my: 3 }} />

          <Paper sx={{ p: 2, mb: 3, backgroundColor: 'primary.dark' }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography variant="body1">
              Subscription: {watchedSubscription.charAt(0).toUpperCase() + watchedSubscription.slice(1)}
            </Typography>
            <Typography variant="body1">
              Users: {watchedMaxUsers}
            </Typography>
            <Typography variant="body1">
              Support: {watchedSupportLevel.charAt(0).toUpperCase() + watchedSupportLevel.slice(1)}
            </Typography>
            {watchedCustomDomain && (
              <Typography variant="body1">
                Custom Domain: Enabled
              </Typography>
            )}
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" color="secondary">
              Total: ${calculatePrice()}/month
            </Typography>
          </Paper>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ flex: 1 }}
            >
              {isSubmitting ? 'Processing...' : 'Subscribe Now'}
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

export default WatchForm;
