import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input, Select, Button, TextArea, Message } from '@ftbl/form';
import { memberSelector } from '../ducks/members';
import { Question } from '@ftbl/icons';
import validate from '../validate/profile';
import types from '../data/types';

export class Profile extends Component {
  render() {
    const { fields, button = [ 'Save', 'Saving...' ], authorized
          , members: { changing, error }, handleSubmit } = this.props;
    
    return (
      <Form onSubmit={handleSubmit} authorized={authorized}>
        <Input label='Member Name' field={fields.name} focus={true} />
        <Select label='Member Type' field={fields.type} data={types} />
        <TextArea label='Bio' field={fields.bio} minRows={6} />

        <Button label={changing ? button[1] : button[0]}
                disabled={changing} onClick={handleSubmit} />
        <Message>{error}</Message>
      </Form>
    );
  }
};

export default reduxForm({ form: 'profile', fields: [ 'name', 'type', 'bio' ], validate })(Profile);
