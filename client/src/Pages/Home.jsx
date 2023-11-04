import { Button, Container, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Skeleton, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

// Alert notification of MUI
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Home({user}) {
  const [task, setTask] = useState([])
  const [task2, setTas2] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [success, setSuccess] = useState('')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [customVariant, setCustomVariant] = useState('error')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false)


  // This is for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const getAllTasks = async() => {
    return await axios.get(`http://localhost:5000/task/getAllTask/${user._id}`).then((response) => {
      setTask(response.data.result)
      setTas2(response.data.result)
      setLoading(true)
    }).catch((err) => {
      console.log("error on getAllTasks: ", err);
    })
  }

  const markAsDoneTsk = async(id) => {
    return await axios.put(`http://localhost:5000/task/markAsDone/${user._id}/${id}`).then((response) => {
      setSuccess(response.data.msg)
      setCustomVariant('success')
      setOpen(true)
      if(refresh){
        setRefresh(false)
      }else{
        setRefresh(true)
      }
    }).catch((err) => {
      setError(err.response.data.msg)
      setCustomVariant('error')
      setOpen(true)
    })
  }
  
  const deleteTask = async(id) => {
    // console.log("delete: ", id);
    return await axios.delete(`http://localhost:5000/task/deleteTask/${user._id}/${id}`).then((response) => {
      setSuccess(response.data.msg)
      setCustomVariant('success')
      setOpen(true)
      if(refresh){
        setRefresh(false)
      }else{
        setRefresh(true)
      }
    }).catch((err) => {
      setError(err.response.data.msg)
      setCustomVariant('error')
      setOpen(true)
    })
  }

  const filterByPriority = (value) => {
    if(!value){
      getAllTasks()
    }
    const result = task2.filter((item) => {
      return item.priority === value
    })
    setTask(result)
  }

  const filterByDone = (value) => {
    if(!value){
      getAllTasks()
    }
    const result = task2.filter((item) => {
      return item.completed === value
    })
    setTask(result)
  }


  useEffect(() => {
    if(user){
      getAllTasks()
    }
  }, [refresh, user])

  
  return (
    <Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity={customVariant} sx={{ width: '100%' }}>
              {error ? error : success}
          </Alert>
      </Snackbar>

      <Grid container spacing={2} component={Paper} sx={{mt: 3}} >
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Sort By Priority</InputLabel>
              <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" label="Age" onChange={(evt) => filterByPriority(evt.target.value)}>
                  <MenuItem value="">
                      <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"high"}>high</MenuItem>
                  <MenuItem value={"medium"}>medium</MenuItem>
                  <MenuItem value={"low"}>low</MenuItem>
              </Select>
              
              <FormHelperText>Please select priority of task</FormHelperText>

          </FormControl>
        </Grid>

        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Sort By Completed</InputLabel>
              <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" label="Age" onChange={(evt) => filterByDone(evt.target.value)}>
                  <MenuItem value="">
                      <em>Select</em>
                  </MenuItem>
                  <MenuItem value={true}>Done</MenuItem>
                  <MenuItem value={false}>Not Done</MenuItem>
              </Select>
              
              <FormHelperText>Please select priority of task</FormHelperText>

          </FormControl>
        </Grid>
      </Grid>
                
      <TableContainer component={Paper} sx={{mt: 2}}>
          <Table sx={{minWidth: 750 }} aria-labelledby="tableTitle" >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Mark As Done</TableCell>
                {/* <TableCell colSpan={3} align="center">Actions</TableCell> */}
                
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? task.map((item, ind) => { //udpate
                return(
                  <TableRow hover role="checkbox" sx={{ cursor: 'pointer' }} key={ind}>
                    <TableCell component="th" scope="row" padding="none"align="center" > {item.name} </TableCell>
                    <TableCell align="left">{moment(item.dueDate).format("DD/MM/YYYY")}</TableCell>
                    <TableCell align="left">{item.completed ? "true" : "false"}</TableCell>
                    <TableCell align="left">{item.priority}</TableCell>
                    <TableCell align="left"> <Link to={`/udpate/${item._id}`}><IconButton color="warning"> <EditIcon /> </IconButton></Link> </TableCell>
                    <TableCell align="left"> <IconButton color="error" onClick={() => deleteTask(item._id)}> <DeleteForeverIcon /> </IconButton> </TableCell>
                    <TableCell align="left"> {item.completed ? <DoneIcon color="success" /> : <Button onClick={() => markAsDoneTsk(item._id)} variant='outlined' >Not Done</Button>} </TableCell>
                    
                  </TableRow>
                )
              }) : <TableRow>
                  <TableCell><Skeleton variant='rectangular' width={"100%"} height={60} /></TableCell>
                  <TableCell><Skeleton variant='rectangular' width={"100%"} height={60} /></TableCell>
                  <TableCell><Skeleton variant='rectangular' width={"100%"} height={60} /></TableCell>
                  <TableCell><Skeleton variant='rectangular' width={"100%"} height={60} /></TableCell>
                  <TableCell><Skeleton variant='rectangular' width={"100%"} height={60} /></TableCell>
                  <TableCell><Skeleton variant='rectangular' width={"100%"} height={60} /></TableCell>
                  <TableCell><Skeleton variant='rectangular' width={"100%"} height={60} /></TableCell>
                </TableRow>}
            </TableBody>
          </Table>
          <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={task.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </TableContainer>
    </Container>
  )
}

export default Home