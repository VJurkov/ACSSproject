import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customersSelector, customersLoadingSelector } from "./redux/selectors";
import { getCustomers, setSearchTermAction } from "./redux/actions";
import { useHistory } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Paper,
  makeStyles,
  TableHead,
  TableBody,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import PaginationTable from "../../shared/PaginationTable";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    marginLeft: 350,
    marginRight: 350,
    paddingTop: 40,
  },
});

function Customers() {
  const isLoading = useSelector(customersLoadingSelector);
  const history = useHistory();
  const classes = useStyles();
  const customers = useSelector(customersSelector);

  const dispatch = useDispatch();

  //pokreni ovu funkciju PRIJE nego što se prikaže na ekranu po prvi puta, pokrece se samo jednom kada je potrebno prikazati customere
  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const onItemClick = (id) => {
    history.push("/bills/" + id);
  };

  console.log(customers);
  if (isLoading && customers.length === 0) {
    return <LinearProgress color="secondary" />;
  } else {
    return (
      <div className={classes.tableContainer}>
        <TextField
          id="outlined-basic"
          label="Search"
          onChange={(event) => {
            dispatch(setSearchTermAction(event.target.value));
          }}
          variant="filled"
          fullWidth
        />
        <PaginationTable
          showBack={false}
          data={customers}
          itemsPerPage={15}
          renderItem={(item) => {
            return (
              <TableRow
                key={item.Id}
                onClick={() => {
                  onItemClick(item.Id);
                }}
              >
                <TableCell component="th" scope="row">
                  {item.Id}
                </TableCell>
                <TableCell align="right">{item.Name}</TableCell>
                <TableCell align="right">{item.Surname}</TableCell>
                <TableCell align="right">{item.Email}</TableCell>
                <TableCell align="right">{item.Telephone}</TableCell>
                <TableCell align="right">{item.CityName}</TableCell>
              </TableRow>
            );
          }}
          renderHeader={() => {
            return (
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Surname</TableCell>
                <TableCell align="right">E-mail</TableCell>
                <TableCell align="right">Telephone</TableCell>
                <TableCell align="right">City</TableCell>
              </TableRow>
            );
          }}
        />
      </div>
    );
  }
}

export default Customers;
