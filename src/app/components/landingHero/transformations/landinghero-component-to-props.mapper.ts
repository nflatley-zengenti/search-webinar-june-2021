export const landingHeroPropsMapping = {
  hasIllustration: {
    $path: ['heroImage', 'heroIllustration'],
    $formatting: (hero: any) => (hero.asset || hero === 'None' ? false : true),
    $default: () => false,
  },
  heroIllustrationUri: {
    $path: 'heroIllustration',
    $formatting: (type: string) => {
      if (!type) return null;
      type = type.toLowerCase().replace(/ /g, '-');
      return `/static/img/illustrations/${type}.png`;
    },
  },
  heroIllustrationAlt: 'heroIllustration',
  imageUri: {
    $path: 'heroImage',
    $formatting: (img: any) => {
      return img && img.asset && img.asset.sys && img.asset.sys.uri;
    },
  },
  imageAlt: ['altText', 'caption', 'asset.title'],
  title: 'title',
  summary: 'summary',
  ctaLink: {
    $path: 'callToActionDestination',
    $formatting: (link: any) => link && link.sys && link.sys.uri,
  },
  ctaText: 'callToActionText',
};
