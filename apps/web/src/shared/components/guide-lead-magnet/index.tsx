'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import Image from 'next/image';
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
  chipStyle,
  coverImageStyle,
  coverStyle,
  fieldStyle,
  formStyle,
  headStyle,
  headingStyle,
  noteStyle,
  restStyle,
  successHeadingStyle,
  successTextStyle,
  textStyle,
} from './styles.css';

type GuideLeadMagnetProps = {
  /** Short qualifier shown as a chip above the title, like the product cards. */
  chip: string;
  title: string;
  /** One or two sentences on what the reader gets. */
  children: ReactNode;
  /** The guide's cover, standing on the panel the way product cutouts do. */
  cover: { src: string; alt: string; width: number; height: number };
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
export function GuideLeadMagnet({ chip, title, children, cover, note }: GuideLeadMagnetProps) {
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
      <div className={headStyle}>
        <span className={chipStyle}>{chip}</span>
        <Heading as="h3" variant="h4" className={headingStyle}>
          {title}
        </Heading>
      </div>

      <figure className={coverStyle}>
        <Image
          className={coverImageStyle}
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes="(min-width: 768px) 160px, 96px"
        />
      </figure>

      <div className={restStyle}>
        <Text className={textStyle}>{children}</Text>

        {isSubmitSuccessful ? (
          <div role="status">
            <Heading as="h4" variant="h6" className={successHeadingStyle}>
              Paldies!
            </Heading>
            <Text className={successTextStyle}>Ceļvedis jau ceļā uz tavu e-pastu.</Text>
          </div>
        ) : (
          <>
            {/* noValidate: the schema error is in Latvian; the browser bubble is not. */}
            <form className={formStyle} onSubmit={handleSubmit(onSubmit)} noValidate>
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
      </div>
    </aside>
  );
}
