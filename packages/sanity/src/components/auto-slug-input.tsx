import { useEffect, useRef } from 'react';
import { type FormPatch, type PatchEvent, type SlugInputProps, set, useFormValue } from 'sanity';

const MAX_LENGTH = 96;

function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, MAX_LENGTH);
}

export function AutoSlugInput(props: SlugInputProps) {
  const title = useFormValue(['title']) as string | undefined;
  const isManual = useRef(Boolean(props.value?.current));

  const onChangeRef = useRef(props.onChange);
  onChangeRef.current = props.onChange;

  const currentSlug = props.value?.current;

  useEffect(() => {
    if (isManual.current) {
      return;
    }
    if (!title) {
      return;
    }

    const next = slugify(title);
    if (next === currentSlug) {
      return;
    }

    onChangeRef.current(set({ _type: 'slug', current: next }));
  }, [title, currentSlug]);

  function handleChange(patch: FormPatch | PatchEvent | FormPatch[]) {
    isManual.current = true;
    props.onChange(patch);
  }

  return props.renderDefault({ ...props, onChange: handleChange });
}
