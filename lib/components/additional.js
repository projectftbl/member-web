import find from 'lodash/collection/find';
import React, { Component, PropTypes } from 'react';
import { Input, TextArea } from '@ftbl/form';
import { Rule } from '@ftbl/component';
import { terms, equities } from '../data';

const Field = ({ Field = Input, value, description, describe, ...rest }) => {
  return (
    <span>
      {description && describe && <div style={{paddingBottom: 5, fontSize:'0.9em'}}>{description}</div>}
      <Field field={{ value }} readOnly={true} {...rest} />
    </span>
  );
};

export default class Additional extends Component {
  render() {
    const { additional, describe } = this.props;
    
    const content = additional.content.value
        , existing = additional.existing.value
        , term = find(terms, { id: additional.term.value })
        , equity = find(equities, { id: additional.equity.value })
        , special = additional.special.value;

    if (content == null && existing == null && term == null && equity == null && special == null) return <span/>;

    return (
      <span>
        <Rule colour='#ddd' />

        {content && <Field value={`$ ${content}`} label={describe ? 'New Content' : 'New Content Commitment Budget'} description='The Content Commitment referred to in the SMA:' describe={describe} />}
        {existing && <Field value={`$ ${existing}`} label={describe ? 'Existing Content' : 'Existing Content Commitment Budget'} />}
        {term && <Field value={term.description} label={describe ? undefined : 'Content Commitment Term'} description='We will make the Content Commitment available for:' describe={describe} />}
        {equity && <Field value={equity.description} label={describe ? undefined : 'Founder Bonus Equity'} description='Your Founder Bonus Percentage (equity) is as follows:' describe={describe} />}
        {special && <Field Field={TextArea} value={special} rows={4} label={describe ? undefined : 'Special Terms'} description='You agree to provide FTBL the following promotional benefits (Marketing and Promotion Rights):' describe={describe} />}
      </span>
    );
  }
};
