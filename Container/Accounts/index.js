/* Account */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectDegrees } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.scss';
import { Input, Form, Button, Checkbox } from 'antd';
import AccountForm from '../../components/AccountForm';
import { makeSelectUser } from '../App/selectors';
import { fetchDegrees, updateStudentProfile } from './actions';

export function Account(props) {
  useInjectReducer({ key: 'account', reducer });
  useInjectSaga({ key: 'account', saga });

  const handleSubmit = (data) => {
    props.updateStudentProfile(data);
  }

  useEffect(() => {
    props.fetchDegrees();
  }, []);

  const { user, degrees } = props;
  return (
    <section className="accountSection">
      <div className="container">
        <div className="dashboardAccountMain">
          <h3>My Account</h3>
          <AccountForm degrees={degrees} onSubmit={handleSubmit} user={user} />
        </div>
      </div>
    </section>
  );
}

Account.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  degrees: makeSelectDegrees(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchDegrees: (data) => dispatch(fetchDegrees(data)),
    updateStudentProfile: (data) => dispatch(updateStudentProfile(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Account);
