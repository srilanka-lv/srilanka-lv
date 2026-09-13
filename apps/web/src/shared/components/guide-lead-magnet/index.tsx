'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { InputField } from '@/features/forms/components/input-field';
import { Button } from '@/shared/components/button';
import { Heading } from '@/shared/components/heading';
import { Text } from '@/shared/components/text';

import { requestGuidePdf } from './actions/request-guide-pdf';
import { type FormSchema, formSchema } from './constants/form-schema';
import {
  blockStyle,
  fieldStyle,
  formStyle,
  headingStyle,
  noteStyle,
  textStyle,
} from './styles.css';

type GuideLeadMagnetProps = {
  title: string;
  /** One or two sentences on what the reader gets. */
  children: ReactNode;
  /** Small print under the form, e.g. how to unsubscribe. */
  note?: ReactNode;
};

/**
 * An inline offer inside the guide: leave an email, get the PDF. Deliberately
 * NOT a dialog. A pop-up would add client-side state, a focus trap and
 * interaction cost to a page tuned for Core Web Vitals, and would interrupt
 * the one reader who has read far enough to be worth asking.
 *
 * It sits in the flow, so it causes no layout shift on load, and the only
 * JavaScript is the form that the footer already ships.
 */
export function GuideLeadMagnet({ title, children, note }: GuideLeadMagnetProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    const result = await requestGuidePdf(data);

    if (!result.success) {
      setError('email', { message: result.error });
      throw new Error(result.error);
    }
  };

  return (
    <aside className={blockStyle}>
      <Heading as="h3" variant="h5" className={headingStyle}>
        {title}
      </Heading>
      <Text className={textStyle}>{children}</Text>

      {isSubmitSuccessful ? (
        <Text>Paldies! Ceļvedis jau ceļā uz tavu e-pastu.</Text>
      ) : (
        <>
          <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
            <div className={fieldStyle}>
              <InputField
                autoComplete="email"
                size="large"
                label="E-pasts"
                type="email"
                placeholder="tavs@epasts.lv"
                errorMessage={errors.email?.message}
                disabled={isSubmitting}
                data-lpignore="true"
                data-1p-ignore
                data-form-type="other"
                {...register('email')}
              />
            </div>
            <Button
              type="submit"
              size="large"
              disabled={isSubmitting}
              data-umami-event="lead-magnet"
              data-umami-event-source="guide-pdf"
            >
              {isSubmitting ? 'Nosūta...' : 'Sūti man ceļvedi'}
            </Button>
          </form>
          {note ? <Text className={noteStyle}>{note}</Text> : null}
        </>
      )}
    </aside>
  );
}
