import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { SubjectsTableContainer, ProfessorsTableContainer, DepartmentsTableContainer } from 'components';
import SpecializationsTableContainer from 'components/specializations-table/SpecializationsTableContainer';
import UsersTableContainer from 'components/users-table/UsersTableContainer';
import RoomsTableContainer from 'components/rooms-table/RoomsTableContainer';
import AppointmentsTableContainer from 'components/appointments-table/AppointmentsTableContainer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={7}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function AdminComponent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Appointments" />
        <Tab label="Subjects" />
        <Tab label="Professors" />
        <Tab label="Departments" />
        <Tab label="Specializations" />
        <Tab label="Rooms" />
        <Tab label="Users" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AppointmentsTableContainer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubjectsTableContainer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfessorsTableContainer />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DepartmentsTableContainer />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SpecializationsTableContainer />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <RoomsTableContainer />
      </TabPanel>
      <TabPanel value={value} index={6}>
       <UsersTableContainer />
      </TabPanel>
    </Paper>
  );
}

export default AdminComponent;