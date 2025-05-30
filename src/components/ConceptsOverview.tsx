
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Code, 
  FormInput, 
  Shield, 
  Eye, 
  Zap 
} from 'lucide-react';

const ConceptsOverview: React.FC = () => {
  const concepts = [
    {
      title: 'Basic Form Handling',
      description: 'Simple form with validation and error handling',
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      features: ['Basic field types', 'Real-time validation', 'Error messages', 'Form submission'],
    },
    {
      title: 'Advanced Features',
      description: 'Complex form elements and file handling',
      icon: <Code className="w-6 h-6 text-primary" />,
      features: ['File uploads', 'Date pickers', 'Radio buttons', 'Checkboxes', 'Select dropdowns'],
    },
    {
      title: 'Dynamic Forms',
      description: 'Dynamic field arrays and conditional logic',
      icon: <FormInput className="w-6 h-6 text-primary" />,
      features: ['useFieldArray', 'Add/remove fields', 'Nested objects', 'Dynamic validation'],
    },
    {
      title: 'Watch & Control',
      description: 'Real-time form state monitoring',
      icon: <Eye className="w-6 h-6 text-primary" />,
      features: ['watch() hook', 'Conditional fields', 'Form state tracking', 'Real-time updates'],
    },
  ];

  const formFeatures = [
    'TypeScript integration for type safety',
    'Zod schema validation for robust data validation',
    'Shadcn/ui components for beautiful UI',
    'Dark theme for modern aesthetics',
    'Responsive design for all devices',
    'Performance optimized with minimal re-renders',
    'Comprehensive error handling',
    'Accessibility features built-in',
  ];

  return (
    <div className="mb-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary mb-2">
            React Hook Form Complete Guide
          </CardTitle>
          <p className="text-xl text-muted-foreground">
            Master every concept of React Hook Form with practical examples
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-base mb-6 text-muted-foreground">
            This comprehensive application demonstrates all React Hook Form concepts including form validation,
            complex field types, dynamic forms, and advanced patterns using TypeScript, Zod validation, and Shadcn/ui.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {concepts.map((concept, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {concept.icon}
                    <h3 className="text-lg font-semibold">{concept.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {concept.description}
                  </p>
                  <ul className="space-y-2">
                    {concept.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Key Features of This Application</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptsOverview;
