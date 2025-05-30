
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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Checkbox,
  FormGroup,
  FormHelperText,
  Input,
  Alert,
} from '@mui/material';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { advancedFormSchema, type AdvancedFormData } from '../schemas/formSchemas';

const countries = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Japan', 'Australia'];
const skillOptions = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++'];

const AdvancedForm: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<AdvancedFormData>({
    resolver: zodResolver(advancedFormSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      birthDate: new Date(),
      gender: 'male',
      country: '',
      skills: [],
      agreeToTerms: false,
      newsletter: false,
    },
  });

  const watchedSkills = watch('skills');
  const watchedPassword = watch('password');

  const onSubmit = async (data: AdvancedFormData) => {
    console.log('Advanced Form Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Advanced form submitted successfully!');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('profilePicture', file);
      trigger('profilePicture');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 4) return { strength: 'Weak', color: 'error' };
    if (password.length < 8) return { strength: 'Medium', color: 'warning' };
    return { strength: 'Strong', color: 'success' };
  };

  const passwordStrength = getPasswordStrength(watchedPassword || '');

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2" color="primary">
            Advanced Form Features
          </Typography>
        }
        subheader="Complex validations, file uploads, date pickers, and conditional fields"
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                margin="normal"
                variant="outlined"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={
                  errors.password?.message || 
                  (touchedFields.password && (
                    <span style={{ color: passwordStrength.color === 'error' ? '#f44336' : 
                                        passwordStrength.color === 'warning' ? '#ff9800' : '#4caf50' }}>
                      Password strength: {passwordStrength.strength}
                    </span>
                  ))
                }
                margin="normal"
                variant="outlined"
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Confirm Password"
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                margin="normal"
                variant="outlined"
              />
            )}
          />

          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <Box sx={{ mt: 2, mb: 1 }}>
                <Typography variant="body2" gutterBottom>
                  Birth Date
                </Typography>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outlined"
                      sx={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        color: field.value ? 'inherit' : 'text.secondary',
                      }}
                    >
                      <CalendarIcon size={16} style={{ marginRight: 8 }} />
                      {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn('p-3 pointer-events-auto')}
                    />
                  </PopoverContent>
                </Popover>
                {errors.birthDate && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                    {errors.birthDate.message}
                  </Typography>
                )}
              </Box>
            )}
          />

          <FormControl component="fieldset" margin="normal" error={!!errors.gender}>
            <FormLabel component="legend">Gender</FormLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              )}
            />
            {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.country}>
            <InputLabel>Country</InputLabel>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Country">
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.country && <FormHelperText>{errors.country.message}</FormHelperText>}
          </FormControl>

          <FormControl component="fieldset" margin="normal" error={!!errors.skills}>
            <FormLabel component="legend">Skills</FormLabel>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <FormGroup row>
                  {skillOptions.map((skill) => (
                    <FormControlLabel
                      key={skill}
                      control={
                        <Checkbox
                          checked={field.value.includes(skill)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, skill]);
                            } else {
                              field.onChange(field.value.filter((s) => s !== skill));
                            }
                          }}
                        />
                      }
                      label={skill}
                    />
                  ))}
                </FormGroup>
              )}
            />
            {errors.skills && <FormHelperText>{errors.skills.message}</FormHelperText>}
            <Box sx={{ mt: 1 }}>
              {watchedSkills.map((skill) => (
                <Chip key={skill} label={skill} size="small" sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          </FormControl>

          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Profile Picture
            </Typography>
            <Input
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={handleFileChange}
              sx={{ mb: 1 }}
            />
            {previewImage && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ maxWidth: 200, maxHeight: 200, objectFit: 'cover' }}
                />
              </Box>
            )}
          </Box>

          <FormControl error={!!errors.agreeToTerms}>
            <Controller
              name="agreeToTerms"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="I agree to the terms and conditions"
                />
              )}
            />
            {errors.agreeToTerms && <FormHelperText>{errors.agreeToTerms.message}</FormHelperText>}
          </FormControl>

          <Controller
            name="newsletter"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Subscribe to newsletter"
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
              onClick={() => {
                reset();
                setPreviewImage(null);
              }}
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

export default AdvancedForm;
