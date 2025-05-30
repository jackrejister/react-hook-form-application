
import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  IconButton,
  Chip,
  Alert,
  Divider,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { dynamicFormSchema, type DynamicFormData } from '../schemas/formSchemas';

const DynamicForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<DynamicFormData>({
    resolver: zodResolver(dynamicFormSchema),
    mode: 'onChange',
    defaultValues: {
      projectName: '',
      description: '',
      teamMembers: [{ name: '', role: '', email: '' }],
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teamMembers',
  });

  const [tagInput, setTagInput] = React.useState('');
  const watchedTags = watch('tags') || [];

  const onSubmit = async (data: DynamicFormData) => {
    console.log('Dynamic Form Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Dynamic form submitted successfully!');
  };

  const addTag = () => {
    if (tagInput.trim() && !watchedTags.includes(tagInput.trim())) {
      const currentTags = watchedTags;
      currentTags.push(tagInput.trim());
      // We need to manually trigger the form update
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = watchedTags.filter(tag => tag !== tagToRemove);
    // Manually update the form
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2" color="primary">
            Dynamic Form Fields
          </Typography>
        }
        subheader="useFieldArray, dynamic field management, and complex nested forms"
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="projectName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Project Name"
                error={!!errors.projectName}
                helperText={errors.projectName?.message}
                margin="normal"
                variant="outlined"
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Project Description"
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
                margin="normal"
                variant="outlined"
              />
            )}
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Team Members
          </Typography>

          {fields.map((field, index) => (
            <Box key={field.id} sx={{ mb: 2, p: 2, border: '1px solid #333', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1">Member {index + 1}</Typography>
                {fields.length > 1 && (
                  <IconButton
                    onClick={() => remove(index)}
                    color="error"
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                )}
              </Box>

              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' } }}>
                <Controller
                  name={`teamMembers.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      error={!!errors.teamMembers?.[index]?.name}
                      helperText={errors.teamMembers?.[index]?.name?.message}
                      variant="outlined"
                      size="small"
                    />
                  )}
                />

                <Controller
                  name={`teamMembers.${index}.role`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Role"
                      error={!!errors.teamMembers?.[index]?.role}
                      helperText={errors.teamMembers?.[index]?.role?.message}
                      variant="outlined"
                      size="small"
                    />
                  )}
                />

                <Controller
                  name={`teamMembers.${index}.email`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      type="email"
                      error={!!errors.teamMembers?.[index]?.email}
                      helperText={errors.teamMembers?.[index]?.email?.message}
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </Box>
            </Box>
          ))}

          <Button
            type="button"
            variant="outlined"
            startIcon={<Add />}
            onClick={() => append({ name: '', role: '', email: '' })}
            sx={{ mb: 3 }}
          >
            Add Team Member
          </Button>

          {errors.teamMembers && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.teamMembers.message}
            </Alert>
          )}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Project Tags
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Add Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              variant="outlined"
              size="small"
              sx={{ flex: 1 }}
            />
            <Button variant="outlined" onClick={addTag} disabled={!tagInput.trim()}>
              Add
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            {watchedTags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => removeTag(tag)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ flex: 1 }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Project'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                reset();
                setTagInput('');
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

export default DynamicForm;
