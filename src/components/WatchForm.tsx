
import React, { useEffect } from 'react';
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
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
  FormHelperText,
  Paper,
  Chip,
  Alert,
} from '@mui/material';
import { watchFormSchema, type WatchFormData } from '../schemas/formSchemas';

const WatchForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
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

  const watchedSubscription = watch('subscriptionType');
  const watchedFeatures = watch('features');
  const watchedMaxUsers = watch('maxUsers');
  const watchedCustomDomain = watch('customDomain');

  // Dynamic feature options based on subscription type
  const getAvailableFeatures = (subscriptionType: string) => {
    const baseFeatures = ['Basic Support', 'Dashboard Access'];
    const premiumFeatures = ['Priority Support', 'Advanced Analytics', 'API Access'];
    const enterpriseFeatures = ['24/7 Support', 'Custom Integrations', 'Dedicated Manager'];

    switch (subscriptionType) {
      case 'basic':
        return baseFeatures;
      case 'premium':
        return [...baseFeatures, ...premiumFeatures];
      case 'enterprise':
        return [...baseFeatures, ...premiumFeatures, ...enterpriseFeatures];
      default:
        return baseFeatures;
    }
  };

  const availableFeatures = getAvailableFeatures(watchedSubscription);

  // Dynamic max users based on subscription
  const getMaxUsersLimit = (subscriptionType: string) => {
    switch (subscriptionType) {
      case 'basic':
        return 5;
      case 'premium':
        return 50;
      case 'enterprise':
        return 1000;
      default:
        return 5;
    }
  };

  const maxUsersLimit = getMaxUsersLimit(watchedSubscription);

  // Dynamic additional services
  const getAdditionalServices = (subscriptionType: string) => {
    const services = ['Training', 'Migration Help'];
    if (subscriptionType === 'premium' || subscriptionType === 'enterprise') {
      services.push('Custom Development', 'Consulting');
    }
    if (subscriptionType === 'enterprise') {
      services.push('On-site Support', 'SLA Agreement');
    }
    return services;
  };

  const additionalServices = getAdditionalServices(watchedSubscription);

  // Update max users when subscription changes
  useEffect(() => {
    if (watchedMaxUsers > maxUsersLimit) {
      setValue('maxUsers', maxUsersLimit);
    }
  }, [watchedSubscription, watchedMaxUsers, maxUsersLimit, setValue]);

  // Clear features that are no longer available
  useEffect(() => {
    const currentFeatures = watchedFeatures.filter(feature => 
      availableFeatures.includes(feature)
    );
    if (currentFeatures.length !== watchedFeatures.length) {
      setValue('features', currentFeatures);
    }
  }, [watchedSubscription, watchedFeatures, availableFeatures, setValue]);

  const onSubmit = async (data: WatchFormData) => {
    console.log('Watch Form Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Watch form submitted successfully!');
  };

  const getSubscriptionPrice = () => {
    const basePrice = watchedSubscription === 'basic' ? 10 : 
                     watchedSubscription === 'premium' ? 50 : 200;
    const userPrice = Math.max(0, watchedMaxUsers - 1) * 
                     (watchedSubscription === 'basic' ? 2 : 
                      watchedSubscription === 'premium' ? 5 : 10);
    const domainPrice = watchedCustomDomain ? 20 : 0;
    
    return basePrice + userPrice + domainPrice;
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2" color="primary">
            Watch & Conditional Logic
          </Typography>
        }
        subheader="Real-time form state monitoring and conditional field rendering"
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
                  <FormControlLabel value="basic" control={<Radio />} label="Basic ($10/mo)" />
                  <FormControlLabel value="premium" control={<Radio />} label="Premium ($50/mo)" />
                  <FormControlLabel value="enterprise" control={<Radio />} label="Enterprise ($200/mo)" />
                </RadioGroup>
              )}
            />
            {errors.subscriptionType && <FormHelperText>{errors.subscriptionType.message}</FormHelperText>}
          </FormControl>

          <Paper sx={{ p: 2, my: 2, backgroundColor: 'action.hover' }}>
            <Typography variant="h6" gutterBottom>
              Live Subscription Summary
            </Typography>
            <Typography variant="body2">
              <strong>Plan:</strong> {watchedSubscription.charAt(0).toUpperCase() + watchedSubscription.slice(1)}
            </Typography>
            <Typography variant="body2">
              <strong>Users:</strong> {watchedMaxUsers} (max: {maxUsersLimit})
            </Typography>
            <Typography variant="body2">
              <strong>Custom Domain:</strong> {watchedCustomDomain ? 'Yes (+$20)' : 'No'}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
              Total: ${getSubscriptionPrice()}/month
            </Typography>
          </Paper>

          <Controller
            name="maxUsers"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={`Maximum Users (1-${maxUsersLimit})`}
                type="number"
                inputProps={{ min: 1, max: maxUsersLimit }}
                error={!!errors.maxUsers}
                helperText={errors.maxUsers?.message}
                margin="normal"
                variant="outlined"
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
              />
            )}
          />

          <FormControl component="fieldset" margin="normal" error={!!errors.features}>
            <FormLabel component="legend">Available Features</FormLabel>
            <Controller
              name="features"
              control={control}
              render={({ field }) => (
                <FormGroup>
                  {availableFeatures.map((feature) => (
                    <FormControlLabel
                      key={feature}
                      control={
                        <Checkbox
                          checked={field.value.includes(feature)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, feature]);
                            } else {
                              field.onChange(field.value.filter((f) => f !== feature));
                            }
                          }}
                        />
                      }
                      label={feature}
                    />
                  ))}
                </FormGroup>
              )}
            />
            {errors.features && <FormHelperText>{errors.features.message}</FormHelperText>}
            <Box sx={{ mt: 1 }}>
              {watchedFeatures.map((feature) => (
                <Chip key={feature} label={feature} size="small" sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          </FormControl>

          {(watchedSubscription === 'premium' || watchedSubscription === 'enterprise') && (
            <Controller
              name="customDomain"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Custom Domain (+$20/month)"
                  sx={{ mt: 1 }}
                />
              )}
            />
          )}

          <FormControl fullWidth margin="normal" error={!!errors.supportLevel}>
            <InputLabel>Support Level</InputLabel>
            <Controller
              name="supportLevel"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Support Level">
                  <MenuItem value="email">Email Support</MenuItem>
                  {(watchedSubscription === 'premium' || watchedSubscription === 'enterprise') && (
                    <MenuItem value="chat">Live Chat Support</MenuItem>
                  )}
                  {watchedSubscription === 'enterprise' && (
                    <MenuItem value="phone">Phone Support</MenuItem>
                  )}
                </Select>
              )}
            />
            {errors.supportLevel && <FormHelperText>{errors.supportLevel.message}</FormHelperText>}
          </FormControl>

          {additionalServices.length > 0 && (
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
                              const currentServices = field.value || [];
                              if (e.target.checked) {
                                field.onChange([...currentServices, service]);
                              } else {
                                field.onChange(currentServices.filter((s) => s !== service));
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
          )}

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ flex: 1 }}
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
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
