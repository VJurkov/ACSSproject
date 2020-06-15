import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBillsDetails, deleteItem } from "./redux/actions";
import PaginationTable from "../../shared/PaginationTable";
import {
  TableRow,
  TableCell,
  Slide,
  Button,
  Dialog,
  Fab,
} from "@material-ui/core";
import { billDetailsSelector } from "./redux/selectors";
import AddBillItem from "./AddBillItem";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Counter from "../../shared/Counter";
import { isAuthorized } from "../../shared/authorized";
import { currentUserSelector } from "../authentication/redux/selectors";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BillDetails({ match }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const [open, setOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(0);
  const billDetails = useSelector(billDetailsSelector);
  const interval = useRef(null);

  const authorized = isAuthorized(currentUser);

  const { id } = match.params;
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const { id } = match.params;
    dispatch(getBillsDetails(id));
  }, [match]);
  return (
    <div>
      {authorized && (
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Item
        </Button>
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AddBillItem billId={id} handleClose={handleClose} />
      </Dialog>
      <PaginationTable
        data={billDetails}
        itemsPerPage={15}
        renderItem={(item) => {
          return (
            <TableRow key={item.Id}>
              <TableCell component="th" scope="row">
                {item.Id}
              </TableCell>
              <TableCell align="right">{item.Product.Name}</TableCell>
              <TableCell align="right">{item.Quantity}</TableCell>
              <TableCell align="right">{item.PricePerPiece}</TableCell>
              <TableCell align="right">{item.TotalPrice}</TableCell>
              <TableCell align="right">
                {item.Id === deletingItemId && (
                  <Counter
                    onStop={() => {
                      clearInterval(interval.current);
                      setDeletingItemId(0);
                    }}
                    seconds={5}
                  />
                )}
                {item.Id !== deletingItemId && authorized && (
                  <Button
                    color="transparent"
                    onClick={() => {
                      clearInterval(interval.current);
                      interval.current = setTimeout(() => {
                        dispatch(deleteItem(item.Id, id));
                      }, 5000);
                      setDeletingItemId(item.Id);
                    }}
                    size="small"
                  >
                    <DeleteOutlinedIcon />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        }}
        renderHeader={() => {
          return (
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price per piece</TableCell>
              <TableCell align="right">Total Cost</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          );
        }}
      />
    </div>
  );
}

export default BillDetails;
