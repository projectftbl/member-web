import find from 'lodash/collection/find';
import React, { Component, PropTypes } from 'react';
import { Input, TextArea } from '@ftbl/form';
import { Rule } from '@ftbl/component';
import { terms, equities } from '../data';

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

        {content && <Input field={{ value: '$ ' + content }} readOnly={true} />}
        {existing && <Input field={{ value: '$ ' + existing }} readOnly={true} />}
        {term && <Input field={{ value: term.description }} readOnly={true} />}
        {equity && <Input field={{ value: equity.description }} readOnly={true} />}
        {special && <TextArea field={{ value: special }} readOnly={true} rows={4} />}
      </span>
    );
  }
};
