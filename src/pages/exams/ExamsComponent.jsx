import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';


const StyledTableCell = withStyles((theme) => ({
  head: {
    color:"black" ,
    fontFamily:"Arial",
    fontSize:16,
    marginTop:"130px"
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: '20%',
  },
  container: {
    maxHeight: 440,
  },
});

function ExamsComponent(props) {
  const {
    exams
  }=props;

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
    <TableContainer component={Paper}>
    <Table className={classes.table} stickyHeader aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Subjects</StyledTableCell>
          <StyledTableCell align="center">Professor</StyledTableCell>
          <StyledTableCell align="center">Specialization</StyledTableCell>
          <StyledTableCell align="center">Type</StyledTableCell>
          <StyledTableCell align="center">Date and Begin hour</StyledTableCell>
          <StyledTableCell align="center">Duration</StyledTableCell>
          <StyledTableCell align="center">Room</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          exams.map((exam)=>(
            <StyledTableRow>
              <StyledTableCell align="center">{exam.subject.name}</StyledTableCell>
              <StyledTableCell align="center">{exam.professor.name}</StyledTableCell>
              <StyledTableCell align="center">{exam.subject.specialization.name}</StyledTableCell>
              <StyledTableCell align="center">{exam.typ.name}</StyledTableCell>
              <StyledTableCell align="center">{exam.appointment.start_date_exam}</StyledTableCell>
              <StyledTableCell align="center">{exam.appointment.duration}</StyledTableCell>
              <StyledTableCell align="center">{exam.appointment.room.name}</StyledTableCell>
            </StyledTableRow>
        ))}
      </TableBody>
    </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={exams.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />  
      </TableContainer>
      </React.Fragment>
  );
}

ExamsComponent.propTypes={
  exams:PropTypes.array,
}

export default ExamsComponent;