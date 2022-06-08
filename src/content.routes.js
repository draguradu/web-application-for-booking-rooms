import React from 'react';
import { Route } from 'react-router-dom';
import ExamsContainer from './pages/exams/ExamsContainer';
import FormContainer from './pages/form/FormContainer';
import { FormExamProvider } from 'contexts';
import AdminContainer from 'pages/admin/AdminContainer';
import { RoutingManagerAdminAndHeadOfStudy, RoutingManagerAdmin } from 'routing/routing-manager';

export default [
    <RoutingManagerAdmin key="admin" path="/admin" adminComponent={AdminContainer} nonAdminComponent={ExamsContainer} />,
    <Route key="exams" path="/exams" component={ExamsContainer} />,
    <FormExamProvider key="form">
        <RoutingManagerAdminAndHeadOfStudy path="/form" adminOrHeadOfYearComponent={FormContainer} nonAdminOrHeadOfYearComponent={ExamsContainer} />
    </FormExamProvider>,
];
