import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBillsDetails } from "./redux/actions";
import PaginationTable from "../../shared/PaginationTable";
import { TableRow, TableCell, Slide, Button, Dialog } from "@material-ui/core";
import { billDetailsSelector } from "./redux/selectors";
import AddBillItem from "./AddBillItem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BillDetails({ match }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const billDetails = useSelector(billDetailsSelector);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const { id } = match.params;
    dispatch(getBillsDetails(id));
  }, [match]);
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Item
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AddBillItem handleClose={handleClose} />
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
            </TableRow>
          );
        }}
      />
    </div>
  );
}

export default BillDetails;
