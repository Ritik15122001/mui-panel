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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
// import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
// import PageContainer from '../../../components/container/PageContainer';
import PageContainer from '../../../components/container/PageContainer';

import img1 from '../../../assets/images/profile/user-1.jpg';
import img2 from '../../../assets/images/profile/user-2.jpg';
import img3 from '../../../assets/images/profile/user-3.jpg';
import img4 from '../../../assets/images/profile/user-4.jpg';
import img5 from '../../../assets/images/profile/user-5.jpg';
import ParentCard from '../../../components/shared/ParentCard';
import { Stack } from '@mui/system';
import { readFirebase } from '../../../firebase';
import { ModeEditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { removeFromFirebase } from '../../../firebase';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
//     title: 'Finance',
//     icon: img2,
//     imgsrc: img1,
//     description: 'Moder...',
//     projectTitle: 'Lorem',
//     projectDescription: 'loremipsum...',
//     clientName: 'Rebeca',
//     projectCategory: 'Modern',
//     author: 'Mark',
//     place: 'Paris',
//     date: '10 Jun, 2021',
//   },
//   {
//     id: '2',
//     title: 'Finance',
//     icon: img2,
//     imgsrc: img1,
//     description: 'Moder...',
//     projectTitle: 'Lorem',
//     projectDescription: 'loremipsum...',
//     clientName: 'Rebeca',
//     projectCategory: 'Modern',
//     author: 'Mark',
//     place: 'Paris',
//     date: '10 Jun, 2021',
//   },
//   {
//     id: '3',
//     title: 'Finance',
//     icon: img2,
//     imgsrc: img1,
//     description: 'Moder...',
//     projectTitle: 'Lorem',
//     projectDescription: 'loremipsum...',
//     clientName: 'Rebeca',
//     projectCategory: 'Modern',
//     author: 'Mark',
//     place: 'Paris',
//     date: '10 Jun, 2021',
//   },
//   {
//     id: '4',
//     title: 'Finance',
//     icon: img2,
//     imgsrc: img1,
//     description: 'Moder...',
//     projectTitle: 'Lorem',
//     projectDescription: 'loremipsum...',
//     clientName: 'Rebeca',
//     projectCategory: 'Modern',
//     author: 'Mark',
//     place: 'Paris',
//     date: '10 Jun, 2021',
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

const ViewWork = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [showDes, setShowDes] = React.useState('');
  const navigate = useNavigate();
  const handleUpdate = (row) => {
    navigate('/apps/work/update', { state: { row } });
  };
  const handlePreview = (row) => {
    navigate('/apps/work/preview', { state: { row } });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handledelete = (row) => {
    // const del = rows.find(item => row.key === item.key)
    // console.log(del)

    removeFromFirebase(API_PATHS.ADD_work+"/"+`${row._id}`).then((res) => {
      alert('Delete  successfully');
      valueDataBase()
    });

  };
  const valueDataBase = async () => {
    try {
      const result = await readFirebase(API_PATHS.ADD_work);
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

  const handleDialog = (des) => {
    setShowDes(des);
    setOpenDialog(true);
  };
  return (
    <PageContainer title="Our Work">
      {/* breadcrumb */}
      <Breadcrumb title="Our Work" />
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
                  <TableCell>
                    <Typography variant="h6">Subheading</Typography>
                  </TableCell>
                  {/* <TableCell>
                    <Typography variant="h6">Client Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Project Cat...</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Author</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Place</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Date</Typography>
                  </TableCell> */}
                  {/* <TableCell>
                    <Typography variant="h6">Tags</Typography>
                  </TableCell> */}

                  {/* <TableCell>
                    <Typography variant="h6">Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Status</Typography>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row) => (
                  <TableRow key={row.id}>
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
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={`${API_URL}/${row.image.filename}`} alt={row.workImage} width="30" />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{row.heading}</Typography>
                    </TableCell>

                    <TableCell>
                    <Typography variant="h6" dangerouslySetInnerHTML={{ __html: row.subheading }} />
                    </TableCell>
                   
                    {/* <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        <Button
                          className="btn button"
                          onClick={() => handleDialog(row.projectDescription)}
                        >
                          View
                        </Button>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.heading}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.category}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.author}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.place}
                      </Typography>
                    </TableCell> */}
                    {/* <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.workDate}
                      </Typography>
                    </TableCell> */}
                    {/* <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.tags}
                      </Typography>
                    </TableCell> */}

                    {/* <TableCell> */}
                    {/* <Typography variant="h6">{row.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={
                          row.status === 'Completed'
                            ? 'success'
                            : row.status === 'Pending'
                            ? 'warning'
                            : row.status === 'Cancel'
                            ? 'error'
                            : 'secondary'
                        }
                        sx={{
                          borderRadius: '6px',
                        }}
                        size="small"
                        label={row.status}
                      />
                    </TableCell> */}
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Description</DialogTitle>
        <DialogContent
        // style={{ width: '800px', height: '800px', whiteSpace: 'nowrap', overflowY: 'auto' }}
        >
          <div dangerouslySetInnerHTML={{ __html: showDes }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default ViewWork;
