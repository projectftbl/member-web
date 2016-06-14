import React, { Component, PropTypes } from 'react';
import { Input } from '@ftbl/form';
import { Rule } from '@ftbl/component';

export default class Additional extends Component {
  render() {
    const { additional } = this.props;
    
    return (
      <span>
        <Rule colour='#ddd' />

        <Input label='Content Commitment Budget' field={additional.equity} disabled={true} />
        <Input label='Annual Content Commitment' field={additional.equity} disabled={true} />
        <Input label='Bonus Equity' field={additional.equity} disabled={true} />
      </span>
    );
  }
};
