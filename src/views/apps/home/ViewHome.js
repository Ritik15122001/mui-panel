import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Typography,
  TableHead,
  Avatar,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  Paper,
  TableContainer,
} from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
// import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
// import PageContainer from '../../../components/container/PageContainer';
import PageContainer from '../../../components/container/PageContainer';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


import img1 from '../../../assets/images/profile/user-1.jpg';
import img2 from '../../../assets/images/profile/user-2.jpg';
import img3 from '../../../assets/images/profile/user-3.jpg';
import img4 from '../../../assets/images/profile/user-4.jpg';
import img5 from '../../../assets/images/profile/user-5.jpg';
import ParentCard from '../../../components/shared/ParentCard';
import { Stack } from '@mui/system';
import { readFirebase, removeFromFirebase } from '../../../firebase';
import { ModeEditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { API_PATHS,API_URL } from '../../../utils';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// const rows = [
//   {
//     id: '1',
//     imgurl: 'www.google.com',
//     imgsrc: img1,
//     // date: '10 Jun, 2021 09:51:40',
//   },
//   {
//     id: '2',
//     imgurl: 'www.google.com',
//     imgsrc: img1,
//     // date: '10 Jun, 2021 09:51:40',
//   },
//   {
//     id: '3',
//     imgurl: 'www.google.com',
//     imgsrc: img1,
//     // date: '10 Jun, 2021 09:51:40',
//   },
//   {
//     id: '4',
//     imgurl: 'www.google.com',
//     imgsrc: img1,
//     // date: '10 Jun, 2021 09:51:40',
//   },
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Pagination Table',
  },
];

const ViewHome = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const navigate = useNavigate();
  const handleUpdate = (row) => {
    // console.log("id---->",row._id)
    navigate(`/apps/home/update/${row._id}`, { state: { row } });
  };
  const handlePreview = (row) => {
    navigate(`/apps/home/preview/${row._id}`, { state: { row } });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handledelete = (row) => {
    // const del = rows.find(item => row.key === item.key)
    // console.log(del)

    removeFromFirebase(API_PATHS.ADD_HEROIMG+"/"+`${row._id}`).then((res) => {
      alert('Delete  successfully');
      valueDataBase()
    });

  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const valueDataBase = async () => {
    try {
      const result = await readFirebase(API_PATHS.ADD_HEROIMG);
      // Use the result array here
      // console.log('result-->', result);
      setRows(result.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  React.useEffect(() => {
    valueDataBase();
  }, []);

  console.log("Data---->",rows)

  return (
    <PageContainer title="Home">
      {/* breadcrumb */}
      <Breadcrumb title="Home" />
      {/* end breadcrumb */}
      <ParentCard>
        <Paper variant="outlined">
          <TableContainer>
            <Table
              aria-label="custom pagination table"
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Action</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Image</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Heading</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                  <TableRow key={row.key}>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        <button
                          className="btn button"
                          style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }}
                          onClick={() => handlePreview(row)}
                        >
                          <VisibilityOutlined />
                        </button>
                        <button
                          className="btn button"
                          style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }}
                          onClick={() => handleUpdate(row)}
                        >
                          <ModeEditOutlined />
                        </button>

                        <button
                          className="btn button"
                          style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }}
                          onClick={() => handledelete(row)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </Typography>
                    </TableCell>
                    {/* <TableCell>
                      <Typography variant="h6">{row.title}</Typography>
                    </TableCell> */}
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={`${API_URL}/${row.image.filename}`}
                          alt={row.image.name}
                          width="40"
                        />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.heading}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={6}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputprops: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </ParentCard>
    </PageContainer>
  );
};

export default ViewHome;
