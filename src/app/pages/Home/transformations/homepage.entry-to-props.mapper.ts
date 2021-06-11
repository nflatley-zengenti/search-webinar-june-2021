import { landingHeroPropsMapping } from '~/components/landingHero/transformations/landinghero-component-to-props.mapper';
import { pageMetadataPropsMapping } from '~/components/metadata/transformations/metdata.to-props-mapper';

export const homepageHeroProps = {
  metadataProps: { ...pageMetadataPropsMapping },
  homeHeroProps: { ...landingHeroPropsMapping },
};
