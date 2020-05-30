import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { customersSelector, customersLoadingSelector } from './redux/selectors'
import { getCustomers } from './redux/actions';
import { TableContainer, Table, TableRow, TableCell, Paper, makeStyles, TableHead, TableBody, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,

    },
    tableContainer: {
        marginLeft: 350,
        marginRight:350,
        paddingTop:40
    }
});

function Customers() {
    const isLoading = useSelector(customersLoadingSelector);
    const classes = useStyles();
    const customers = useSelector(customersSelector);
    const dispatch = useDispatch();

    //pokreni ovu funkciju PRIJE nego što se prikaže na ekranu po prvi puta, pokrece se samo jednom kada je potrebno prikazati customere
    useEffect(() => {
        dispatch(getCustomers());
    }, [])

    if(isLoading){
        return (
            <LinearProgress color="secondary" />
        )
    }
    return (
        <div className={classes.tableContainer}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Surname</TableCell>
                            <TableCell align="right">E-mail</TableCell>
                            <TableCell align="right">Telephone</TableCell>
                            <TableCell align="right">City</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.Id}>
                                <TableCell component="th" scope="row">
                                    {customer.Id}
                                </TableCell>
                                <TableCell align="right">{customer.Name}</TableCell>
                                <TableCell align="right">{customer.Surname}</TableCell>
                                <TableCell align="right">{customer.Email}</TableCell>
                                <TableCell align="right">{customer.Telephone}</TableCell>
                                <TableCell align="right">{customer.CityName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Customers