import React from 'react';
import { TableContainer, Table, TablePagination, Paper, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import styles from "./TableProject.module.scss";

function TableProjectComponent(props) {
    const {
        columns,
        count,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        propertyColums,
        items,
        onClickAction,
        onDelete
    } = props;
    
    return (
        <div className={styles.tableContainer}>
            <div 
            className={styles.createButton}
            onClick={()=>onClickAction()}>
                <AddCircleOutlineIcon className={styles.addIcon}/>
                Create
            </div>
            <TableContainer component={Paper}>
                <Table size="small" stickyHeader aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                column
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item)=>(
                            <TableRow key={item.id}>
                                {propertyColums.map(property => (
                                    <TableCell key={property.value} align={property.align}>{item[property.value]}</TableCell>
                                ))}
                                <TableCell align="center">
                                    <EditIcon onClick={() => onClickAction(item)}/>
                                    <DeleteOutlineIcon onClick={() => onDelete(item.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}

TableProjectComponent.propTypes={
    columns: PropTypes.array,
    count: PropTypes.number,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    handleChangePage: PropTypes.func,
    handleChangeRowsPerPage: PropTypes.func,
    propertyColums: PropTypes.array,
    items: PropTypes.array,
    onClickAction: PropTypes.func,
    onDelete: PropTypes.func
  }
  
  export default TableProjectComponent;