import mapJson, { mapComposer } from '~/core/util/json-mapper';
import { composerPropsMapping } from '~/components/composer/transformations/composer-to-props.mapper';
import { relatedLinksMapper } from '~/components/relatedLinks/transformations/relatedlinks.entry-to-card.mapper';
import { ctaBannerPropsMapping } from '~/components/ctaBanner/transformations/ctaBanner.component-to-props.mapper';
import { promotedContentMapper } from '~/components/promotedContent/transformations/promotedContent.component-to-props.mapper';
import { renderHeroPropsMapper } from '~/components/renderHero/transformations/renderhero.components-to-props.mapper';

export const contentPagePropsMapping = {
  contentHeroProps: { ...renderHeroPropsMapper },
  leadParagraphProps: {
    text: 'leadParagraph',
  },
  relatedLinksProps: {
    title: 'relatedLinksTitle',
    links: ({ relatedLinks }: any) => {
      return relatedLinks.map((link: any) => {
        return mapJson(link, relatedLinksMapper);
      });
    },
  },
  contentComposerProps: ({ bodyContent }: any) =>
    mapComposer(bodyContent, composerPropsMapping),
  ctaBannerProps: {
    ...ctaBannerPropsMapping,
  },
  promotedContentProps: {
    title: () => 'Explore more',
    results: ({ promotedContent }: any) => {
      return promotedContent.map((link: any) => {
        return mapJson(link, promotedContentMapper);
      });
    },
  },
};