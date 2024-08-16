import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Paper, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Loader } from '../constants/Loader'; // Assuming this is your loader component
import { getalluserlistforsubscription, updateSubscriptionStatus } from '../redux/services/otherServices/Users';

function Subscription() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState('');
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetUsersData(page, query);
  }, [page, query]);

  const handleGetUsersData = async (page, query) => {
    setLoading(true);
    try {
      const res = await getalluserlistforsubscription(page, query);
      if (res.success === true) {
        setData(res.response.body.findUser);
        setTotalAccounts(res.response.body.totalCount);
      } else {
        console.error('Failed to fetch user data:', res.error);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
    setPage(0);
  };

  const handleSubscriptionToggle = async (rowId, currentStatus) => {
    try {
        console.log(currentStatus);
       
        
      const newStatus = currentStatus === 0 ? 1 : 0; 

      const body ={
        subscription_status:newStatus
      }
      const res = await updateSubscriptionStatus(rowId, body); 
  
      if (res.success === true) {
        handleGetUsersData(page, query);
      } else {
        console.error('Failed to update subscription status:', res.error);
      }
    console.log(newStatus);
    } 
    catch (error) {
      console.error('Error updating subscription status:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      {loading && <Loader />}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={query}
          onChange={handleSearchInputChange}
          InputProps={{
            endAdornment: (
              <IconButton size="small">
                <SearchIcon />
              </IconButton>
            ),
            style: { paddingRight: 0 }
          }}
          style={{ width: '300px' }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Subscription Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name || 'N/A'}</TableCell>
                <TableCell>{row.email || 'N/A'}</TableCell>
                <TableCell>{row.phone || 'N/A'}</TableCell>
                <TableCell>{row.role_type || 'N/A'}</TableCell>
                <TableCell>{row.subscription_status === 0 ? 'Subscribed' : 'Not Subscribed'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={row.subscription_status === 0 ? 'secondary' : 'primary'}
                    onClick={() => handleSubscriptionToggle(row.id, row.subscription_status)}
                  >
                    {row.subscription_status === 0 ? 'Unsubscribe' : 'Subscribe'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalAccounts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}

export default Subscription;
