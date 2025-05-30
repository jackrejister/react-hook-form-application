
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
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
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    alert('Form submitted successfully!');
  };

  return (
    <Card className="max-w-2xl mx-auto mb-8">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">
          Basic Form Concepts
        </CardTitle>
        <p className="text-muted-foreground">
          useForm, Controller, validation, and basic field types
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="firstName"
                    placeholder="Enter your first name"
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="lastName"
                    placeholder="Enter your last name"
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                )}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={errors.email ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label>Age: {watchedAge} years</Label>
            <Controller
              name="age"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Slider
                  value={[value]}
                  onValueChange={(values) => onChange(values[0])}
                  min={18}
                  max={100}
                  step={1}
                  className="w-full"
                />
              )}
            />
            {errors.age && (
              <p className="text-sm text-red-500">{errors.age.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="bio"
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className={errors.bio ? 'border-red-500' : ''}
                />
              )}
            />
            <p className="text-sm text-muted-foreground">
              {watchedBio?.length || 0}/500 characters
            </p>
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="flex-1"
            >
              Reset
            </Button>
          </div>

          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please fix the errors above before submitting.
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default BasicForm;
