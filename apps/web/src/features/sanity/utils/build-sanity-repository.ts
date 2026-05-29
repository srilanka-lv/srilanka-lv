import { DefaultSanityProvider } from '../providers/default-sanity-provider';
import { DefaultSanityRepository } from '../repositories/default-sanity-repository';

export const buildSanityRepository = () => new DefaultSanityRepository(new DefaultSanityProvider());
