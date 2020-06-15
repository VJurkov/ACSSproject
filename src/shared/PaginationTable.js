import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  makeStyles,
  Button,
} from "@material-ui/core";
import { chunkArray } from "./utils";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";

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

function PaginationTable({ renderHeader, data, renderItem, itemsPerPage }) {
  const history = useHistory();
  const [pages, setPages] = useState(chunkArray(data, itemsPerPage));
  const [currentPage, setCurrentPage] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    setCurrentPage(0);
    setPages(chunkArray(data, itemsPerPage));
  }, [data, itemsPerPage]);

  if (data.length === 0) {
    return (
      <div>
        <div>NO ITEMS</div>
        <Button
          onClick={() => {
            history.goBack();
          }}
        >
          GO back
        </Button>
      </div>
    );
  }
  if (pages.length === 0) {
    return null;
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>{renderHeader()}</TableHead>
        <TableBody>
          {pages[currentPage].map((item) => renderItem(item))}
        </TableBody>
      </Table>

      <div>
        {
          <Pagination
            count={pages.length - 1}
            onChange={(event, value) => {
              setCurrentPage(value);
            }}
          />
        }
      </div>
    </TableContainer>
  );
}

export default PaginationTable;
