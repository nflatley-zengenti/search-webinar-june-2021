import React from 'react';

// Components
import LandingHero from '~/components/landingHero/LandingHero';
import Metadata from '~/components/metadata/Metadata';

// Layout
import MainLayout from '~/layout/MainLayout';

// Models
import { Props } from './Home.d';

const Home = ({ mappedEntry }: Props) => {
  const { homeHeroProps, metadataProps } = mappedEntry || {};
  return (
    <MainLayout isLight={true}>
      <Metadata {...metadataProps} />
      <LandingHero {...homeHeroProps} />
    </MainLayout>
  );
};

export default Home;
