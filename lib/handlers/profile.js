import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { authorizeSelector, Update } from '@ftbl/support';
import { update, memberSelector, primarySelector, membersSelector } from '../ducks/members';
import { Edit as Menu } from '../components/navigation';
import ProfileForm from '../components/profile';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    const { member, update } = this.props;
    update(member, data);
  }

  render() {
    const { member } = this.props;

    return (
      <div>
        <Menu />
        <ProfileForm {...this.props} onSubmit={this.handleSubmit} initialValues={member} />
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  member: memberSelector
, members: membersSelector
, session: state => state.session
, authorized: authorizeSelector(Update, primarySelector)
});

export default connect(mapStateToProps, { update })(Profile);

