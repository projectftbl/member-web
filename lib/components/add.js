import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input, Select, Button, TextArea, Message } from '@ftbl/form';
import { memberSelector } from '../ducks/members';
import { Search, Spinner } from '@ftbl/icons';
import data from '../data/types';

const Invite = ({ member, results, users, invite }) => {
  if (results.fetched === false || results.data.length) return <span/>;

  return (
    <Button size='small' style={{position: 'absolute', right: 0, top: 0}}
            label={users.inviting ? 'Inviting...' : 'Invite?'}
            disabled={users.inviting}
            onClick={_ => invite(member, results.meta.query.q)} />
  );
};

export class Add extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { search, fields: { q }} = this.props;

    if (e.keyCode === 13) search({ q: q.value });
  }

  render() {
    const { fields, results: { fetching }, results, users, invite, member } = this.props;

    const colour = fields.q.active ? '#999' : '#ccc';

    const icon = fetching 
                 ? <Spinner rotate={true} colour={colour} /> 
                 : <Search colour={colour} />;
    
    return (
      <div>
        <p style={{color: '#666', margin: '-5px 0 10px 0', paddingTop: 5}}>
          Search for users and grant access
        </p>

        <div style={{position: 'relative'}}>
          <Input label='Search Users' field={fields.q} focus={true} icon={icon} onKeyDown={this.handleSubmit} />
          <Invite invite={invite} member={member} results={results} users={users} />
        </div>
      </div>
    );
  }
};

export default reduxForm({ form: 'users', fields: [ 'q' ] })(Add);
