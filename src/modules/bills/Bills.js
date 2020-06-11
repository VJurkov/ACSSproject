import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { billsSelector } from "./redux/selectors";
import { getBills } from "./redux/actions";
import PaginationTable from "../../shared/PaginationTable";
import { TableRow, TableCell } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Bills({ match }) {
  const bills = useSelector(billsSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const { id } = match.params;
    dispatch(getBills(id));
  }, [match]);
  const onItemClick = (id) => {
    history.replace("/billDetails/" + id);
  };
  return (
    <PaginationTable
      data={bills}
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
            <TableCell align="right">{item.Date}</TableCell>
            <TableCell align="right">{item.BillNumber}</TableCell>
          </TableRow>
        );
      }}
      renderHeader={() => {
        return (
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Bill Number</TableCell>
          </TableRow>
        );
      }}
    />
  );
}

export default Bills;
