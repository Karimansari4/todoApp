import { Box, Button, Container, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Typography, avatarClasses } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

// Alert notification of MUI
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function AddTask({user}) {
    const navigate = useNavigate()
    const [success, setSuccess] = useState('')
    const [customVariant, setCustomVariant] = useState('error')
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [task, setTask] = useState({
        name: '',
        dueDate: '',
        priority: '',
    })
    const [valTask, setValTask] = useState({
        name: '',
        dueDate: '',
        priority: '',
    })
    const currentDate = moment();

    const handleOnChange = evt => {
        setTask({...task, [evt.target.name]: evt.target.value})
        setValTask({
            name: '',
            dueDate: '',
            priority: '',
        })
    }

    const handleChange = (event) => {
        setTask({...task, priority: event.target.value});
        setValTask({
            name: '',
            dueDate: '',
            priority: '',
        })
    };

    const handleDateChange = (evt) => {
        // console.log("evt: ", evt._d);
        setTask({...task, dueDate: evt._d})
        setValTask({
            name: '',
            dueDate: '',
            priority: '',
        })
        // console.log("moemnt: ", moment(evt._d, "DD-MM-YYYY"));
        // moment().format(); moment("12-25-1995", "MM-DD-YYYY");
    }
    
    const handleSubmit = async(evt) => {
        evt.preventDefault()
        if(!task.name){
            setValTask({...valTask, name: 'Please enter task name?'})
        }else if(!task.dueDate){
            setValTask({...valTask, dueDate: 'Please enter due date?'})
        }else if(moment(task.dueDate).isBefore(currentDate, 'day')){
            setValTask({...valTask, dueDate: 'Please select next date?'})
        }else if(!task.priority){
            setValTask({...valTask, priority: "Please select priority of task?"})
        }else{
            return await axios.post(`http://localhost:5000/task/addTask/${user._id}`, task).then((response) => {
                setSuccess(response.data.msg)
                setCustomVariant('success')
                setOpen(true)

                setTask({
                    name: '',
                    dueDate: '',
                    priority: '',
                })
            }).catch((err) => {
                console.log("error on adding task: ", err);
                setError(err.response.data.msg)
                setCustomVariant('error')
                setOpen(true)
            })
            
            
        }
    }

    return (
        <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity={customVariant} sx={{ width: '100%' }}>
                        {error ? error : success}
                    </Alert>
                </Snackbar>
            <Typography variant='h4' component={'h6'} mt={2}> <IconButton onClick={() => navigate(-1)}> <ArrowBackIcon /> </IconButton> Add Task</Typography>
            <Box component={'form'} onSubmit={handleSubmit} noValidate sx={{ mt: 2}}>
                <Grid container spacing={2}>
                    <Grid item sm={12} xs={12} md={4} lg={3}>
                        <TextField name='name' type='text' label="Task Name" placeholder='Please enter task name' onChange={handleOnChange} value={task.name} fullWidth required error={valTask.name ? true : false } helperText={valTask.name ? valTask.name : ''} />
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} lg={3}>
                        {/* <TextField name='dueDate' type='text' label="Due Date" placeholder='Please enter task due date' onChange={handleOnChange} value={task.dueDate} fullWidth required /> */}
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker label="Due Date" onChange={handleDateChange} />
                        </LocalizationProvider>
                        <Typography variant='body2' color={'error'}>{valTask.dueDate ? valTask.dueDate : ''}</Typography>
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} lg={3}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
                        <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={task.priority} label="Age" onChange={handleChange}>
                            <MenuItem value="">
                                <em>Select</em>
                            </MenuItem>
                            <MenuItem value={"high"}>high</MenuItem>
                            <MenuItem value={"medium"}>medium</MenuItem>
                            <MenuItem value={"low"}>low</MenuItem>
                        </Select>
                        <Typography variant='body2' color={'error'}>{valTask.priority ? valTask.priority : ''}</Typography>
                        <FormHelperText>Please select priority of task</FormHelperText>

                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='outlined' type='submit' fullWidth>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default AddTask