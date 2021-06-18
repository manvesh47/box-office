/* eslint-disable arrow-body-style */
import React from 'react';
import Navs from './Navs';
import Title from './Title';

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title title="box office" subtitle="are you looking for a movie" />
      <Navs />

      {children}
    </div>
  );
};

export default MainPageLayout;
