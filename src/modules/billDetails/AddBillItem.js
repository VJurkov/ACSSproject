import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import { useSelector, useDispatch } from "react-redux";
import { billItemFormSelector } from "./redux/selectors";
import { getCategories } from "./redux/actions";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
function AddBillItem({ handleClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formData = useSelector(billItemFormSelector);

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ADD ITEM
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={0}
            onChange={() => {}}
          >
            {formData.categories.map((category) => {
              return <MenuItem value={category.Id}>{category.Name}</MenuItem>;
            })}
          </Select>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={0}
            onChange={() => {}}
          >
            {formData.subcategories.map((subcategory) => {
              return (
                <MenuItem value={subcategory.Id}>{subcategory.Name}</MenuItem>
              );
            })}
          </Select>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={0}
            onChange={() => {}}
          >
            {formData.products.map((product) => {
              return <MenuItem value={product.Id}>{product.Name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default AddBillItem;
