import React from 'react';
import { Route } from 'react-router-dom';
import { useGlobalStateContext } from 'contexts';
import { Roles } from 'utils/enums/Roles';

export function RoutingManagerAdmin(props, { ...rest }) {
    const { globalState } = useGlobalStateContext();
    const isAdmin = globalState.user?.role?.name === Roles.Admin;
    return <Route {...rest} exact component={isAdmin ? props.adminComponent : props.nonAdminComponent}></Route>;
}

export function RoutingManagerAdminAndHeadOfStudy(props, { ...rest }) {
    const { globalState } = useGlobalStateContext();
    const isAdminOrHeadOfYear = globalState.user?.role?.name === Roles.Admin || globalState.user?.role?.name === Roles.HeadOfYear;
    return <Route {...rest} exact component={isAdminOrHeadOfYear ? props.adminOrHeadOfYearComponent : props.nonAdminOrHeadOfYearComponent}></Route>;
}

export function CheckAuthorization(props) {
    const { globalState } = useGlobalStateContext();
    const userRole = globalState.user?.role?.name;
    var ok = false;
    props.authorizatedRoles.map(role => {
        if(userRole === role ) {
            ok = true;
        }
        return null;
    });
    if(ok) {
        return props.children;
    } else {
        return <React.Fragment></React.Fragment>;
    }
}