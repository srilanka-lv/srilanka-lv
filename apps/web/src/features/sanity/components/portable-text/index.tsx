import {
  type PortableTextComponents,
  PortableText as PortableTextReact,
  defaultComponents,
  mergeComponents,
} from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import type { SanityTable } from 'structured-table';

import { Heading } from '@/shared/components/heading';
import { Text } from '@/shared/components/text';

import { urlForImage } from '../../utils/url-for-image';
import { ImageGallery } from '../portable-text-image-gallery/image-gallery';
import TableView from '../stl-renderer/table/table-view';
import { YouTubeEmbed } from '../youtube-embed';
import {
  inlineImageCaptionStyle,
  inlineImageFigureStyle,
  stlTableScrollWrapperStyle,
} from './styles.css';

type StlTableBlockValue = {
  stlParsed?: string;
  stlString?: string;
  caption?: string;
};

type YouTubeBlockValue = {
  url?: string;
  caption?: string;
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <Text>{children}</Text>,
    h2: ({ children }) => (
      <Heading as="h2" variant="h2">
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as="h3" variant="h3">
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading as="h4" variant="h4">
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading as="h5" variant="h5">
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading as="h6" variant="h6">
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href ?? '#';
      const isExternal = /^https?:\/\//.test(href);

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }

      return <Link href={href}>{children}</Link>;
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) {
        return null;
      }

      // biome-ignore lint/suspicious/noFocusedTests: This isn't a test - it's the Sanity image URL.
      const url = urlForImage(value).width(1920).quality(100).fit('max').auto('format').url();

      return (
        <figure className={inlineImageFigureStyle}>
          <Image
            src={url}
            alt={value.alt ?? ''}
            width={1920}
            height={1080}
            sizes="(min-width: 1024px) 800px, 100vw"
            style={{ width: '100%', height: 'auto' }}
          />
          {value.caption ? (
            <figcaption className={inlineImageCaptionStyle}>{value.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
    imageGallery: ImageGallery,
    stlTableBlock: ({ value }: { value: StlTableBlockValue }) => {
      if (!value?.stlParsed) {
        return null;
      }

      const data = JSON.parse(value.stlParsed) as SanityTable;
      return (
        <>
          <div className={stlTableScrollWrapperStyle}>
            <TableView data={data} />
          </div>
          {value.caption ? <p>{value.caption}</p> : null}
        </>
      );
    },
    youTube: ({ value }: { value: YouTubeBlockValue }) => (
      <YouTubeEmbed url={value.url} caption={value.caption} />
    ),
  },
};

const baseComponents = mergeComponents(defaultComponents, components);

export type PortableTextValue = Parameters<typeof PortableTextReact>[0]['value'];

type PortableTextProps = {
  value: PortableTextValue;
  components?: PortableTextComponents;
};

export function PortableText({ value, components: overrides }: PortableTextProps) {
  return (
    <PortableTextReact
      value={value}
      components={overrides ? mergeComponents(baseComponents, overrides) : baseComponents}
    />
  );
}
