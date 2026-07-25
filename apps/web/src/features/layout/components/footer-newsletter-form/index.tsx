'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { InputField } from '@/features/forms/components/input-field';
import { Button } from '@/shared/components/button';
import { Heading } from '@/shared/components/heading';
import { Text } from '@/shared/components/text';

import { footerHeadingStyle } from '../footer/styles.css';
import { submitEmail } from './actions/submit-email';
import { type FormSchema, formSchema } from './constants/form-schema';
import { formStyle, textStyle } from './styles.css';

export function FooterNewsletterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    const result = await submitEmail(data);

    if (!result.success) {
      setError('email', { message: result.error });
      throw new Error(result.error);
    }
  };

  return (
    <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2" variant="h6" className={footerHeadingStyle}>
        Nepalaid garām jaunumus!
      </Heading>

      <Text className={textStyle}>
        Piesakies jaunumiem un esi pirmais, kas uzzina par izdevīgām aviobiļetēm uz Šrilanku,
        ekskluzīviem maršrutiem un salas apslēptajām pērlēm, ko neatradīsi nekur citur.
      </Text>

      {isSubmitSuccessful ? (
        <div>
          <Heading as="h2" variant="h6" className={footerHeadingStyle}>
            Paldies!
          </Heading>
          <Text>Esi veiksmīgi pieteicies jaunumiem.</Text>
        </div>
      ) : (
        <>
          <InputField
            autoComplete="email"
            size="large"
            label="E-pasts"
            type="email"
            placeholder="jusu@epasts.lv"
            errorMessage={errors.email?.message}
            disabled={isSubmitting}
            data-lpignore="true"
            data-1p-ignore
            data-form-type="other"
            {...register('email')}
          />
          <Button type="submit" size="large" disabled={isSubmitting}>
            {isSubmitting ? 'Nosūta...' : 'Pieteikties'}
          </Button>
        </>
      )}
    </form>
  );
}
