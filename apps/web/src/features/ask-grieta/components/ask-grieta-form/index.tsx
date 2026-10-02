'use client';

import { Field } from '@ark-ui/react/field';
import { RadioGroup } from '@ark-ui/react/radio-group';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { CircleAlert, type LucideIcon, Map as MapIcon, PhoneCall, Send, Users } from 'lucide-react';
import { type ChangeEvent, type FunctionComponent, useEffect, useRef } from 'react';
import { Controller, type UseFormReturn, useForm, useWatch } from 'react-hook-form';

import { Button } from '@/shared/components/button';
import { Spinner } from '@/shared/components/spinner';

import { ASK_GRIETA_PRODUCTS, type AskGrietaProductId } from '../../constants/ask-grieta-products';
import { DEFAULT_COUNTRY, findCountry } from '../../constants/countries';
import { ruleFor } from '../../constants/validation-messages';
import { examplePlaceholder, splitInternationalNumber } from '../../utils/phone';
import { createFieldStartTracker, productProp, trackAskGrieta } from '../../utils/track';
import { CountryCombobox } from './country-combobox';
import { type FormSchema, formSchema } from './form-schema';
import {
  chipIconStyle,
  chipStyle,
  chipsStyle,
  errorIconStyle,
  errorTextStyle,
  fieldStyle,
  formStyle,
  helperTextStyle,
  honeypotStyle,
  labelStyle,
  optionalStyle,
  phoneInputStyle,
  phoneRowStyle,
  productGroupStyle,
  questionStyle,
  submitBarStyle,
  submitErrorStyle,
  submitHintStyle,
  submitIconStyle,
  submitSpinnerStyle,
  submitStyle,
  textInputStyle,
  textareaStyle,
} from './styles.css';

// One stroke family with the rest of the drawer (lucide), not emoji.
const PRODUCT_ICONS: Record<AskGrietaProductId, LucideIcon> = {
  'girls-trip': Users,
  consultation: PhoneCall,
  'travel-plan': MapIcon,
};

const TEXT_FIELDS = new Set(['name', 'phone', 'email', 'message']);

export const DEFAULT_VALUES: FormSchema = {
  product: null,
  name: '',
  country: DEFAULT_COUNTRY,
  phone: '',
  email: '',
  message: '',
};

export const useAskGrietaForm = (): UseFormReturn<FormSchema> =>
  useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
    // Errors only after a submit attempt, then live while fixing them.
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

/** Sent along with the form values, outside the validated schema. */
export type AskGrietaFormExtras = {
  /** The honeypot's value: empty for people. */
  website: string;
};

type AskGrietaFormProps = {
  form: UseFormReturn<FormSchema>;
  onSubmit: (data: FormSchema, extras: AskGrietaFormExtras) => Promise<void>;
  /** Shown next to the submit button, where the visitor is looking. */
  submitFailed?: boolean;
};

/**
 * One screen, top to bottom in the order Grieta needs it: what it's about,
 * who, and where to reach her on WhatsApp. Email and message are optional.
 * The submit button is sticky, so it is reachable at every snap point.
 */
export const AskGrietaForm: FunctionComponent<AskGrietaFormProps> = ({
  form,
  onSubmit,
  submitFailed,
}) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const honeypotRef = useRef<HTMLInputElement>(null);

  // useWatch, not watch(): the React Compiler memoizes watch() calls away.
  const country = findCountry(useWatch({ control, name: 'country' }));

  // `ask-field-start`: the first input into each field, once per field.
  // Programmatic setValue calls carry no `type`, and the product chips and
  // country picker send their own events, so none of those count here. Only
  // the field name is sent, never what was typed.
  useEffect(() => {
    const fieldStarted = createFieldStartTracker((field, order) =>
      trackAskGrieta('ask-field-start', { field, order }),
    );
    const subscription = watch((_, { name, type }) => {
      if (type === 'change' && name && TEXT_FIELDS.has(name)) {
        fieldStarted(name);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // Autofill pastes "+371 26 123 456" into the number: move the dial code into
  // the picker so the visitor never has to fix it by hand.
  const splitAutofilledNumber = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const split = splitInternationalNumber(value);
    // After a submit attempt errors update live, so re-check the moved number.
    const options = { shouldValidate: form.formState.isSubmitted };

    if (split) {
      setValue('country', split.country);
      setValue('phone', split.national, options);
    } else if (value !== value.trimStart()) {
      // Typing "+44 7700…" by hand splits at "+44"; drop the space that follows.
      setValue('phone', value.trimStart(), options);
    }
  };

  // One `ask-submit` per tap: which fields failed which rule, e.g.
  // "email:format,phone:too-short". Rule codes only, never the values.
  const onInvalid = (invalid: Partial<Record<keyof FormSchema, { message?: string }>>): void => {
    trackAskGrieta('ask-submit', {
      result: 'invalid',
      errors: Object.entries(invalid)
        .map(([field, error]) => `${field}:${ruleFor(error?.message)}`)
        .sort()
        .join(','),
      product: productProp(form.getValues('product')),
    });
  };

  return (
    <form
      className={formStyle}
      onSubmit={handleSubmit(
        (data) => onSubmit(data, { website: honeypotRef.current?.value ?? '' }),
        onInvalid,
      )}
      noValidate
    >
      {/* Honeypot: off screen and out of the tab order and accessibility tree,
          so only bots fill it in. The server drops those submissions. */}
      <div className={honeypotStyle} aria-hidden="true">
        <label>
          Neaizpildi šo lauku
          <input
            ref={honeypotRef}
            type="text"
            name="ask-grieta-hp"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <Controller
        control={control}
        name="product"
        render={({ field }) => (
          <RadioGroup.Root
            className={productGroupStyle}
            value={field.value}
            onValueChange={({ value }) => {
              trackAskGrieta('ask-product-select', {
                product: productProp(value),
                previous: productProp(field.value),
              });
              field.onChange(value);
            }}
            name={field.name}
          >
            <RadioGroup.Label className={questionStyle}>Kas Tevi interesē?</RadioGroup.Label>
            <div className={chipsStyle}>
              {ASK_GRIETA_PRODUCTS.map((product) => {
                const Icon = PRODUCT_ICONS[product.id];

                return (
                  <RadioGroup.Item key={product.id} value={product.id} className={chipStyle}>
                    <Icon className={chipIconStyle} aria-hidden="true" />
                    <RadioGroup.ItemText>{product.label}</RadioGroup.ItemText>
                    <RadioGroup.ItemHiddenInput />
                  </RadioGroup.Item>
                );
              })}
            </div>
          </RadioGroup.Root>
        )}
      />

      <Field.Root className={fieldStyle} invalid={!!errors.name} disabled={isSubmitting}>
        <Field.Label className={labelStyle}>Tavs vārds</Field.Label>
        <Field.Input
          className={textInputStyle}
          autoComplete="name"
          autoCapitalize="words"
          enterKeyHint="next"
          placeholder="Anna"
          {...register('name')}
        />
        <FieldError message={errors.name?.message} />
      </Field.Root>

      <Field.Root className={fieldStyle} invalid={!!errors.phone} disabled={isSubmitting}>
        <Field.Label className={labelStyle}>Tavs WhatsApp numurs</Field.Label>
        <div className={phoneRowStyle}>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <CountryCombobox
                value={field.value}
                disabled={isSubmitting}
                onChange={(code) => {
                  field.onChange(code);
                  if (form.formState.isSubmitted) {
                    void form.trigger('phone');
                  }
                }}
              />
            )}
          />
          <Field.Input
            className={phoneInputStyle}
            type="tel"
            aria-label="Tavs WhatsApp numurs"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            placeholder={examplePlaceholder(country.code) || 'Mobilā tālruņa numurs'}
            {...register('phone', { onChange: splitAutofilledNumber })}
          />
        </div>
        {errors.phone ? (
          <FieldError message={errors.phone.message} />
        ) : (
          <Field.HelperText className={helperTextStyle}>
            Atbildēšu Tev personīgi WhatsApp.
          </Field.HelperText>
        )}
      </Field.Root>

      <Field.Root className={fieldStyle} invalid={!!errors.email} disabled={isSubmitting}>
        <Field.Label className={labelStyle}>
          E-pasts <span className={optionalStyle}>(nav obligāti)</span>
        </Field.Label>
        <Field.Input
          className={textInputStyle}
          type="email"
          inputMode="email"
          autoComplete="email"
          enterKeyHint="next"
          placeholder="anna@epasts.lv"
          {...register('email')}
        />
        <FieldError message={errors.email?.message} />
      </Field.Root>

      <Field.Root className={fieldStyle} invalid={!!errors.message} disabled={isSubmitting}>
        <Field.Label className={labelStyle}>
          Ziņa <span className={optionalStyle}>(nav obligāti)</span>
        </Field.Label>
        <Field.Textarea
          className={textareaStyle}
          autoresize
          rows={2}
          enterKeyHint="enter"
          placeholder="Kad plāno braukt, ar ko kopā, viss, kas Tev uz sirds"
          {...register('message')}
        />
        <FieldError message={errors.message?.message} />
      </Field.Root>

      <div className={submitBarStyle}>
        {submitFailed && (
          <p className={submitErrorStyle} role="alert">
            <CircleAlert className={errorIconStyle} aria-hidden="true" />
            Neizdevās nosūtīt. Pamēģini vēlreiz vai uzraksti man WhatsApp vai Instagram zemāk.
          </p>
        )}
        <Button
          type="submit"
          size="large"
          className={submitStyle}
          disabled={isSubmitting}
          aria-busy={isSubmitting || undefined}
        >
          {isSubmitting ? (
            <>
              <Spinner size="small" className={submitSpinnerStyle} /> Nosūta…
            </>
          ) : (
            <>
              Sūtīt Grietai
              <Send className={submitIconStyle} aria-hidden="true" />
            </>
          )}
        </Button>
        <p className={submitHintStyle}>Nekāda spama. Tikai mana ziņa Tev WhatsApp.</p>
      </div>
    </form>
  );
};

// Error text with an icon, so an error never relies on colour alone.
const FieldError: FunctionComponent<{ message?: string }> = ({ message }) =>
  message ? (
    <Field.ErrorText className={errorTextStyle}>
      <CircleAlert className={errorIconStyle} aria-hidden="true" />
      {message}
    </Field.ErrorText>
  ) : null;
