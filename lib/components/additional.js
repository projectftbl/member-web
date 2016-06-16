import find from 'lodash/collection/find';
import React, { Component, PropTypes } from 'react';
import { Input, TextArea } from '@ftbl/form';
import { Rule } from '@ftbl/component';
import { terms, equities } from '../data';

const Field = ({ Field = Input, value, description, ...rest }) => {
  return (
    <span>
      {description && <div style={{paddingBottom: 5, fontSize:'0.9em'}}>{description}</div>}
      <Field field={{ value }} readOnly={true} {...rest} />
    </span>
  );
};

export default class Additional extends Component {
  render() {
    const { additional } = this.props;
    
    const content = additional.content.value
        , existing = additional.existing.value
        , term = find(terms, { id: additional.term.value })
        , equity = find(equities, { id: additional.equity.value })
        , special = additional.special.value;

    if (content == null && existing == null && term == null && equity == null && special == null) return <span/>;

    return (
      <span>
        <Rule colour='#ddd' />

        {content && <Field value={`$ ${content}`} description='The Content Commitment referred to in the SMA:' label='New Content' />}
        {existing && <Field value={`$ ${existing}`} label='Existing Content' />}
        {term && <Field value={term.description} description='We will make the Content Commitment available for:' />}
        {equity && <Field value={equity.description} description='Our Founder Bonus Percentage (equity) is as follows:' />}
        {special && <Field Field={TextArea} value={special} rows={4} description='We agree to provide FTBL the following promotional benefits (marketing rights):' />}
      </span>
    );
  }
};
