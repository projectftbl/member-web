import find from 'lodash/collection/find';
import React, { Component, PropTypes } from 'react';
import { Input } from '@ftbl/form';
import { Rule } from '@ftbl/component';
import { budgets, terms, equities } from '../data';

export default class Additional extends Component {
  render() {
    const { additional } = this.props;
    
    const budget = find(budgets, { id: additional.budget.value })
        , term = find(terms, { id: additional.term.value })
        , equity = find(equities, { id: additional.equity.value });

    if (budget == null && term == null && equity == null) return <span/>;

    return (
      <span>
        <Rule colour='#ddd' />

        {budget && <Input label='Content Commitment Budget' field={{ value: budget }} readOnly={true} />}
        {term && <Input label='Annual Content Commitment' field={{ value: term }} readOnly={true} />}
        {equity && <Input label='Bonus Equity' field={{ value: equity }} readOnly={true} />}
      </span>
    );
  }
};
