import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { memberSelector } from '../ducks/members';
import { Access as Menu } from '../components/navigation';

export class Access extends Component {
  render() {
    const { member, children } = this.props;
  
    return (
      <div style={{minHeight: 400}}>
        <Menu member={member} />

        {children}
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  member: memberSelector
});

export default connect(mapStateToProps)(Access);

