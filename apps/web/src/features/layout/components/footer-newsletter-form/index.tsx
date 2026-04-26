'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { InputField } from '@/features/forms/components/input-field';
import { Button } from '@/shared/components/button';
import { Heading } from '@/shared/components/heading';
import { Text } from '@/shared/components/text';

import { footerHeadingStyle } from '../footer/styles.css';
import { submitEmail } from './actions/submit-email';
import { type FormSchema, formSchema } from './constants/form-schema';

export function FooterNewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    const result = await submitEmail(data);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError('email', { message: result.error });
    }
  };

  if (submitted) {
    return (
      <div>
        <Heading as="h6" className={footerHeadingStyle}>
          Paldies!
        </Heading>
        <Text>Jūs esat veiksmīgi pieteikušies jaunumiem.</Text>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h6" className={footerHeadingStyle}>
        Nepalaidiet garām mūsu jaunumus!
      </Heading>
      <InputField
        label="E-pasts"
        type="email"
        placeholder="jusu@epasts.lv"
        errorMessage={errors.email?.message}
        {...register('email')}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Nosūta...' : 'Pieteikties'}
      </Button>
    </form>
  );
}
