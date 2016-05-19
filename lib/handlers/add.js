import React, { Component, PropTypes } from 'react';
import assign from 'lodash/object/assign';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { create, membersSelector } from '../ducks/members';
import { Heading } from '../../../components';
import ProfileForm from '../components/profile';

export class Add extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    const { session, create } = this.props;

    create(assign({}, data, { userId: session.user.id }));
  }

  render() {
    return (
      <div>
        <Heading>Register Member</Heading>
        <ProfileForm {...this.props} button={['Register', 'Registering...']}
                     onSubmit={this.handleSubmit} />
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  members: membersSelector
, session: state => state.session
});

export default connect(mapStateToProps, { create })(Add);

