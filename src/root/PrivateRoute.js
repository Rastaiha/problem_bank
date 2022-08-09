import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ onlyMentor = false, isMentor = false, token }) => {
  const hasAccess = token && (isMentor || !onlyMentor);
  return hasAccess ? (
    <Outlet />
  ) : (
    <Navigate to={eventId ? `/?private_event_enter=${eventId}` : '/'} />
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isMentor: state.account.userAccount
    ? state.account.userAccount.is_mentor
    : false,
});

export default connect(mapStateToProps)(PrivateRoute);