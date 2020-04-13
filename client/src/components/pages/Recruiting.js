import React, { Fragment } from 'react';
import Title from '../layout/Title';
import RecruitingForm from '../recruiting/RecruitingForm';
import RecruitingDataViz from '../recruiting/RecruitingDataViz';

const Recruiting = () => {
  return (
    <Fragment>
      <Title title={'Recruiting Breakdown'} />
      <RecruitingForm />
      <RecruitingDataViz />
    </Fragment>
  );
};

export default Recruiting;
