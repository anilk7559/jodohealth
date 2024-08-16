import React, { useEffect, useState } from 'react';
import { Table,Input,Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Paper, TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { appointmentupdate, getalllabsbookinglist } from '../redux/services/otherServices/Lab';
import { toast } from 'react-toastify';
import { Loader } from '../constants/Loader';
import Header from '../homecomponents/Header';
import Footer from '../homecomponents/Footer';

function BookingSection() {
  const [bookingListData, setBookingListData] = useState([]);
  const [files, setFiles] = useState({});
  const [prices, setPrices] = useState({});
  const [totalaccounts, setTotalAccounts] = useState(0);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetBookingListData(page, query);
  }, [page, query]);

  const handleGetBookingListData = async (page, query) => {
    setLoading(true);
    try {
      const res = await getalllabsbookinglist(page, query);
      if (res.success) {
        setBookingListData(res.response?.body?.findAppointment || []);
        setTotalAccounts(res.response?.body?.totalCount || 0);
      } else {
        toast.error('Failed to fetch booking list.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching the booking list.');
      console.error('Error fetching booking list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (id, value) => {
    setPrices(prevPrices => ({
      ...prevPrices,
      [id]: value
    }));
  };

  const handleFileChange = (id, fileType, event) => {
    const file = event.target.files[0];
    setFiles(prevFiles => ({
      ...prevFiles,
      [id]: {
        ...prevFiles[id],
        [fileType]: file
      }
    }));
  };

  const handleSubmit = async (id) => {
    const currentPrice = bookingListData.find(item => item.id === id)?.price || "";
    const price = prices[id] || currentPrice;
    const billFile = files[id]?.upload_bill || null;
    const reportFile = files[id]?.upload_report || null;

    const formData = new FormData();
    formData.append('id', id);
    if (price !== "" && price !== null) {
      formData.append('price', price);
    }
    if (billFile) formData.append('upload_bill', billFile);
    if (reportFile) formData.append('upload_report', reportFile);

    try {
      const res = await appointmentupdate(formData, id);
      if (res.success) {
        toast.success('Appointment updated successfully!');
        handleGetBookingListData(page, query);
      } else {
        toast.error('Failed to update appointment.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the appointment.');
      console.error('Error updating appointment:', error);
    }
  };

  const downloadFile = (url, filename) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch(error => console.error('Download error:', error));
  };

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
    setPage(0); // Reset to the first page when searching
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Header/>
      {loading && <Loader/>} 
      <Box  sx={{m:2 }}>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          sx={{ width: '300px' }}
        />
      </Box>

      <Typography sx={{ fontWeight: "700" }}>Booking List of Patients</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "700" }}>Lab Name</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Patient Name</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Prescription</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>File</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Upload Bill</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Upload Report</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingListData.map(row => {
              const isEditable = row.status === 1; // Status 1 means Editable
              const hasAllData = row.price !== null && row.upload_bill !== null && row.upload_report !== null;
              const isReadyToSubmit = isEditable && !hasAllData;

              return (
                <TableRow key={row.id}>
                  <TableCell>{row.lab_name}</TableCell>
                  <TableCell>{row.member_name}</TableCell>
                  <TableCell>{row.appointment_date}</TableCell>
                  <TableCell>{row.prescription || '-'}</TableCell>
                  <TableCell>
                    {row.prescription_image ? (
                      <img src={row.prescription_image} alt="Prescription" style={{ width: 100, height: 100 }} />
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditable ? (
                      row.price === null ? (
                        <TextField
                          type="number"
                          onChange={(e) => handlePriceChange(row.id, e.target.value)}
                          value={prices[row.id] || ''}
                          placeholder="Enter Price"
                        />
                      ) : (
                        row.price || '-'
                      )
                    ) : (
                      row.price || '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditable ? (
                      row.upload_bill === null ? (
                        <Input
                          type="file"
                          onChange={(e) => handleFileChange(row.id, 'upload_bill', e)}
                        />
                      ) : (
                        row.upload_bill ? (
                          <Button onClick={() => downloadFile(row.upload_bill, 'bill.pdf')}>Download Bill</Button>
                        ) : '-'
                      )
                    ) : (
                      row.upload_bill ? (
                        <Button onClick={() => downloadFile(row.upload_bill, 'bill.pdf')}>Download Bill</Button>
                      ) : '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditable ? (
                      row.upload_report === null ? (
                        <Input
                          type="file"
                          onChange={(e) => handleFileChange(row.id, 'upload_report', e)}
                        />
                      ) : (
                        row.upload_report ? (
                          <Button onClick={() => downloadFile(row.upload_report, 'report.pdf')}>Download Report</Button>
                        ) : '-'
                      )
                    ) : (
                      row.upload_report ? (
                        <Button onClick={() => downloadFile(row.upload_report, 'report.pdf')}>Download Report</Button>
                      ) : '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditable && isReadyToSubmit ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSubmit(row.id)}
                      >
                        Submit
                      </Button>
                    ) : (
                      isEditable ? 'All Completed' : 'Not Editable'
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalaccounts}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      />

      </Box>
      <Footer/>
    </div>
  );
}

export default BookingSection;
