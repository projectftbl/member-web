import React, { Component, PropTypes } from 'react';
import { Input } from '@ftbl/form';
import { Rule } from '@ftbl/component';

export default class Additional extends Component {
  render() {
    const { additional } = this.props;
    
    if (additional == null) return <span/>;

    return (
      <span>
        <Rule colour='#ddd' />

        {budget.value && <Input label='Content Commitment Budget' field={additional.budget} readOnly={true} />}
        {term.value && <Input label='Annual Content Commitment' field={additional.term} readOnly={true} />}
        {equity.value && <Input label='Bonus Equity' field={additional.equity} readOnly={true} />}
      </span>
    );
  }
};
