// @flow
import React from 'react';
import { compose, withProps } from 'recompose';
import HeroImage from '../components/HeroImage';
import CategoryThumbnailList from '../components/CategoryThumbnailList';
import SearchInputBar from '../components/SearchInputBar';
import categories from '../category';

const LandingPage = ({ }) => (
  <div>

    <HeroImage heroImageURL={'/static/images/1_home-18.jpg'} >
      <SearchInputBar />
    </HeroImage>
    <CategoryThumbnailList />
  </div>);


export default compose(
  withProps(() => {
    const rand = Math.round(Math.random() * 2);
    const category = Object.keys(categories)[rand];
    return {
      heroImage: categories[category].heroImage,
    };
  }),
)(LandingPage);
