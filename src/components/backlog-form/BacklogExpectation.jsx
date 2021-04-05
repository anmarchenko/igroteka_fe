import React from 'react';
import PropTypes from 'prop-types';

import FancySelect from '../forms/FancySelect';
import { EXPECTATIONS } from '../../constants';

export const BacklogExpectation = ({ setExpectation, value }) => (
  <FancySelect
    value={value}
    options={EXPECTATIONS}
    onChange={setExpectation}
    onDelete={() => setExpectation(null)}
    emptyLabel="Expectation"
    deleteLabel="Remove expectation"
  />
);

BacklogExpectation.propTypes = {
  value: PropTypes.number,
  setExpectation: PropTypes.func.isRequired,
};

BacklogExpectation.defaultProps = {
  value: null,
};

export default BacklogExpectation;
