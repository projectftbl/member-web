import React, { Component, PropTypes } from 'react';
import { Input } from '@ftbl/form';

export default class Additional extends Component {
  render() {
    const { additional } = this.props;
    
    return (
      <span>
        <Input label='Equity' field={additional.equity} />
      </span>
    );
  }
};
