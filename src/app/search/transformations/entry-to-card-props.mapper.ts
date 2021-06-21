import { mapEntries } from '~/core/util/json-mapper';
import { CardTypes, ContentTypes } from '~/core/schema';

import dateWithSuffix from '~/utils/dateWithSuffix';
import { truncateString } from '~/utils/truncateString';

import { Props as CardProps } from '~/components/card/Card';
import { Props as SearchCardProps } from '~/components/searchCard/SearchCard';

const baseMapping = {
  type: () => CardTypes.Generic,
  title: 'entryTitle',
  text: {
    $path: ['kicker', 'leadParagraph', 'summary', 'description'],
    $formatting: (text: string) => truncateString(text, 124),
  },
  uri: 'sys.uri',
  imageUri: {
    $path: 'heroImage.asset.sys.uri',
    $default: () => '/image-library/default-images/leif-fallback.png',
  },
  imageAlt: ['heroImage.altText', 'heroImage.caption', 'heroImage.asset.title'],
};

// export const blogCardMapping = {
//   ...baseMapping,
//   type: () => CardTypes.Blog,
//   imageUri: {
//     $path: 'primaryImage.asset.sys.uri',
//     $default: () => '/image-library/default-images/leif-fallback.png',
//   },
//   date: {
//     $path: 'sys.version.published',
//     $formatting: ({ published }: any) => dateWithSuffix(published),
//   },
//   imageAlt: [
//     'primaryImage.altText',
//     'primaryImage.caption',
//     'primaryImage.asset.title',
//   ],
// };

// export const productCardMapping = {
//   ...baseMapping,
//   type: () => CardTypes.Product,
//   title: ['productName'],
//   price: {
//     $path: ['plantVariant', 'potVariant'],
//     $formatting: (v: any) => v.price,
//   },
//   productType: 'type.entryTitle',
//   imageUri: {
//     $path: 'primaryImage.asset.sys.uri',
//     $default: () => '/image-library/default-images/leif-fallback.png',
//   },
//   imageAlt: [
//     'primaryImage.altText',
//     'primaryImage.caption',
//     'primaryImage.asset.title',
//   ],
//   ctaLink: 'sys.uri',
//   ctaText: () => 'Find out more',
//   isRenderedAsLink: () => true,
//   isPromoted: {
//     $path: 'tags',
//     $formatting: (tag: string) => (tag === 'promoted' ? true : false),
//   },
// };

export const mappers = {
  default: baseMapping,
  // [ContentTypes.contentPage]: baseMapping,
  // [ContentTypes.blog]: blogCardMapping,
  // [ContentTypes.plant]: productCardMapping,
  // [ContentTypes.pot]: productCardMapping,
};

const mapEntriesToResults = (entries: any): (SearchCardProps | CardProps)[] =>
  mapEntries(entries, mappers);

export default mapEntriesToResults;
