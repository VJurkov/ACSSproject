import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  FormControl,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  billItemFormSelector,
  addItemLoadingSelector,
} from "./redux/selectors";
import {
  getCategories,
  getSubCategories,
  getProducts,
  saveItem,
} from "./redux/actions";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
function AddBillItem({ handleClose, billId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formData = useSelector(billItemFormSelector);
  const isLoading = useSelector(addItemLoadingSelector);

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitDisabled =
    !categoryId || !subCategoryId || !productId || !quantity;

  const handleSaveItem = () => {
    setSubmitted(true);
    dispatch(
      saveItem({ BillId: billId, ProductId: productId, Quantity: quantity })
    );
  };

  useEffect(() => {
    if (submitted) {
      if (!isLoading) {
        handleClose();
      }
    } else {
      dispatch(getCategories());
    }
  }, [submitted, isLoading]);
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
          {!isLoading && (
            <Button
              disabled={submitDisabled}
              autoFocus
              color="inherit"
              onClick={handleSaveItem}
            >
              save
            </Button>
          )}
          {isLoading && <CircularProgress color="#FFFFFF" />}
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <div className={classes.root}>
          <FormControl>
            <InputLabel id="categories">Categories</InputLabel>
            <Select
              labelId="categories"
              id="categories"
              value={categoryId}
              onChange={(e) => {
                const id = e.target.value;
                setCategoryId(id);
                dispatch(getSubCategories(id));
              }}
            >
              {formData.categories.map((category) => {
                return <MenuItem value={category.Id}>{category.Name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="subcategories">Subcategories</InputLabel>
            <Select
              labelId="subcategories"
              id="subcategories"
              value={subCategoryId}
              onChange={(e) => {
                const id = e.target.value;
                setSubCategoryId(id);
                dispatch(getProducts(id));
              }}
            >
              {formData.subcategories.map((subcategory) => {
                return (
                  <MenuItem value={subcategory.Id}>{subcategory.Name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="products">Products</InputLabel>
            <Select
              labelId="products"
              id="products"
              value={productId}
              onChange={(e) => {
                const id = e.target.value;
                setProductId(id);
              }}
            >
              {formData.products.map((product) => {
                return <MenuItem value={product.Id}>{product.Name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="quantity">Quantity</InputLabel>
            <Select
              labelId="quantity"
              id="quantity"
              value={quantity}
              onChange={(e) => {
                const id = e.target.value;
                setQuantity(id);
              }}
            >
              <MenuItem value={1}>1</MenuItem>;<MenuItem value={2}>2</MenuItem>;
              <MenuItem value={3}>3</MenuItem>;<MenuItem value={4}>4</MenuItem>;
              <MenuItem value={5}>5</MenuItem>;<MenuItem value={6}>6</MenuItem>;
              <MenuItem value={7}>7</MenuItem>;<MenuItem value={8}>8</MenuItem>;
              <MenuItem value={9}>9</MenuItem>;
              <MenuItem value={10}>10</MenuItem>;
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default AddBillItem;
