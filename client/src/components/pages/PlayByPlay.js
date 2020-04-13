import React, { Fragment } from 'react';
import Title from '../layout/Title';
import PlayByPlayForm from '../playByPlay/PlayByPlayForm';

const PlayByPlay = () => {
  return (
    <Fragment>
      <Title title={'Play by Play Data'} />
      <PlayByPlayForm />
    </Fragment>
  );
};

export default PlayByPlay;
