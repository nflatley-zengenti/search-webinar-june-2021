import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import LandingHero, { Props } from './LandingHero';

export default {
  title: 'Landing/Components/LandingHero',
  component: LandingHero,
} as Meta;

const Template: Story<Props> = args => {
  return <LandingHero {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'Header over multiple lines',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem lacus, elit a diam eget enim venenatis cum. Nibh quis facilisis et hendrerit eu nisl.',
  cta: {
    label: 'Show now',
    href: '#',
  },
  imageUri: 'https://source.unsplash.com/00fCk2lZn1c',
  imageAlt: 'Unsplash image',
};
