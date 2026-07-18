import type { Reference, ValidationContext } from 'sanity';

type ImageValue = {
  asset?: Reference;
};

type Dimensions = {
  width: number;
  height: number;
};

export function imageDimensionsValidator(required: Dimensions) {
  return async (value: ImageValue | undefined, context: ValidationContext) => {
    if (!value?.asset?._ref) {
      return true;
    }

    const client = context.getClient({ apiVersion: '2024-01-01' });
    const dimensions = await client.fetch<Dimensions | null>(
      '*[_id == $id][0].metadata.dimensions',
      { id: value.asset._ref },
    );

    if (!dimensions) {
      return 'Could not read image dimensions.';
    }

    if (dimensions.width !== required.width || dimensions.height !== required.height) {
      return `Image must be exactly ${required.width}×${required.height} (uploaded ${dimensions.width}×${dimensions.height}).`;
    }

    return true;
  };
}
