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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { removeFromFirebase } from '../../../firebase';

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
//     title: 'Development',
//     category: 'Finance',
//     date: '10 Jun, 2021 ',
//     imgsrc: img1,
//     description: 'Estibulum...',
//     tags: 'insta',
//     author: 'Leslie',
//     authorImg: img2,
//     authorDescription: 'Lorem ipsum...',
//   },
//   {
//     id: '2',
//     title: 'Development',
//     category: 'Finance',
//     date: '10 Jun, 2021 ',
//     imgsrc: img1,
//     description: 'Estibulum...',
//     tags: 'insta',
//     author: 'Leslie',
//     authorImg: img2,
//     authorDescription: 'Lorem ipsum...',
//   },
//   {
//     id: '3',
//     title: 'Development',
//     category: 'Finance',
//     date: '10 Jun, 2021 ',
//     imgsrc: img1,
//     description: 'Estibulum...',
//     tags: 'insta',
//     author: 'Leslie',
//     authorImg: img2,
//     authorDescription: 'Lorem ipsum...',
//   },
//   {
//     id: '4',
//     title: 'Development',
//     category: 'Finance',
//     date: '10 Jun, 2021 ',
//     imgsrc: img1,
//     description: 'Estibulum...',
//     tags: 'insta',
//     author: 'Leslie',
//     authorImg: img2,
//     authorDescription: 'Lorem ipsum...',
//   },
//   {
//     id: '5',
//     title: 'Development',
//     category: 'Finance',
//     date: '10 Jun, 2021 ',
//     imgsrc: img1,
//     description: 'Estibulum...',
//     tags: 'insta',
//     author: 'Leslie',
//     authorImg: img2,
//     authorDescription: 'Lorem ipsum...',
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

const ViewBlog = () => {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [showDes, setShowDes] = React.useState('');
  const navigate = useNavigate();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const valueDataBase = async () => {
    try {
      const result = await readFirebase('blogs');
      // Use the result array here
      // console.log('result-->', result);
      setRows(result);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };
  React.useEffect(() => {
    valueDataBase();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleUpdate = (row) => {
    navigate('/apps/blog/update', { state: { row } });
  };
  const handlePreview = (row) => {
    navigate('/apps/blog/preview', { state: { row } });
  };
  const handleDialog = (des) => {
    setShowDes(des);
    setOpenDialog(true);
  };
  const handledelete = (row) => {
    const del = rows.find(item => row.key === item.key)
    console.log(del)

    removeFromFirebase(`blogs/${del.key}`).then((res) => {
      alert('Delete  successfully');
      valueDataBase()
    });

  };
  return (
    <PageContainer title="Blogs">
      {/* breadcrumb */}
      <Breadcrumb title="Blogs" />
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
                    <Typography variant="h6">Title</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Category</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Description</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Tags</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">A. Img</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Author</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">AuthorDs</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Date</Typography>
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
                      <Typography variant="h6">{row.orderno}</Typography>
                    </TableCell> */}
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={row.blogImage.url} alt={row.blogImage.name} width="30" />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {/* {row.title} */}
                        <Button className="btn button" onClick={() => handleDialog(row.title)}>
                          View
                        </Button>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.category}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        <Button
                          className="btn button"
                          onClick={() => handleDialog(row.description)}
                        >
                          View
                        </Button>
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {/* {row.tags} */}
                        <Button className="btn button" onClick={() => handleDialog(row.tags)}>
                          View
                        </Button>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={row.authorImage.url} alt={row.authorImage.name} width="30" />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.author}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        <Button
                          className="btn button"
                          onClick={() => handleDialog(row.authorDescription)}
                        >
                          View
                        </Button>
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h6">{row.blogDate}</Typography>
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

export default ViewBlog;
