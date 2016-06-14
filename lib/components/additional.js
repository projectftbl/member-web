import React, { Component, PropTypes } from 'react';
import { Input } from '@ftbl/form';
import { Rule } from '@ftbl/component';

export default class Additional extends Component {
  render() {
    const { additional: { budget, term, equity }} = this.props;
    
    if (budget.value == null && term.value == null && term.value == null) return <span/>;

    return (
      <span>
        <Rule colour='#ddd' />

        {budget.value && <Input label='Content Commitment Budget' field={budget} disabled={true} />}
        {term.value && <Input label='Annual Content Commitment' field={term} disabled={true} />}
        {equity.value && <Input label='Bonus Equity' field={equity} disabled={true} />}
      </span>
    );
  }
};
