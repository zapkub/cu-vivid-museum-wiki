// @flow
import React from 'react';
import { compose } from 'recompose';
import HeroImage from '../components/HeroImage';
import CategoryThumbnailList from '../components/CategoryThumbnailList';
import SearchInputBar from '../components/SearchInputBar';

const LandingPage = () => (
  <div>
    <HeroImage heroImageURL={'/static/images/1_home-18.jpg'} >
      <SearchInputBar />
    </HeroImage>
    <CategoryThumbnailList />
  </div>);


export default compose(

)(LandingPage);
