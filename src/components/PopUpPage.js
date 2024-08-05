import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';



import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import 'reactjs-popup/dist/index.css';



import { useState, useEffect } from 'react'
import { DayPicker } from 'react-day-picker';
import { DigitalClock } from '@mui/x-date-pickers-pro';
// import DemoItem from '@mui/material/DemoItem';

import 'react-day-picker/dist/style.css';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import Slider from '@mui/material/Slider';

import Moment from 'moment';
import dayjs from "dayjs";
import { ConnectingAirportsOutlined } from '@mui/icons-material';

function PopUpPage({ setLoad ,setEventInfo, isLogin}) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [selected, setSelected] = useState(null);
    const [maxPeople, setMaxPeople] = useState(null);
    // const footer =
    //     selected && selected.length > 0 ? (
    //         <p>You selected {selected.length} day(s).</p>
    //     ) : (
    //         <p>Please pick one day.</p>
    //     );
    //validation
    const [ErrorMsg, setErrorMsg] = useState("")
    const [EventNameError, setEventNameError] = useState(false)
    const [meetingPointError, setMeetingPointError] = useState(false)
    const [DateError, setDateError] = useState(false)
    const validation = () => {
        console.log("selected",selected)
        // console.log("isToday",isToday(selected))
        console.log("startingTime",startingTime)
        console.log("type of startingTime",typeof startingTime)
        console.log("startingTime.$H",startingTime.$H)
        console.log("startingTime.$M",startingTime.$M)
        console.log("startingTime.$m",startingTime.$m)
        console.log("isLogin",isLogin)
        if (EventName == "" || EventName == null) {
            setErrorMsg("Error: Please Enter An Event Name")
            setEventNameError(true)
            return false
        }
        else if (meetingPoint == "" || meetingPoint == null) {
            setErrorMsg("Error: Please Enter A Meeting Point")
            setMeetingPointError(true)
            return false
        }
        else if (selected == null || selected.length == 0) {
            setErrorMsg("Error: Please Select One Date")
            setDateError(true)
            return false
        }
        else if (!(selected == null || selected.length == 0)&&(isToday(selected)==true && startingTime.isBefore(Date()))){
            setErrorMsg("Error: startingTime.isBefore(Date())")
            // setDateError(true)
            return false
        }
        else if (maxPeople == null || maxPeople <= 1) {
            setErrorMsg("Error: Max. People should be more than 1")
            // setDateError(true)
            return false
        }
        else if (startingTime == "" || startingTime == null) {
            setErrorMsg("Error: Please Enter Starting Time")
            // setDateError(true)
            return false
        }
        else if (endingTime == "" || endingTime == null) {
            setErrorMsg("Error: Please Enter Ending Time")
            // setDateError(true)
            return false
        }
        else if (startingTime.isAfter(endingTime)) {
            setErrorMsg("Error: startingTime.isAfter(endingTime)")
            // setDateError(true)
            return false
        }
        else if(isLogin==false){
            setErrorMsg("Error: Please Login to add an event")
            return false
        }

        return true
    }

    const cleanValue = () => {
        setEventName('')
        setMeetingPoint('')
        setSelected(null)
        setErrorMsg("")
        setEventNameError(false)
        setMeetingPointError(false)
        setDateError(false)
        setStartingTime('')
        setEndingTime('')
    }

    //post api
    const [EventName, setEventName] = useState('')
    const [meetingPoint, setMeetingPoint] = useState('')
    const [startingTime, setStartingTime] = useState('')
    const [endingTime, setEndingTime] = useState('')
    const [moreInformation, setMoreInformation] = useState('')
    const addPosts = async () => {
        await fetch('https://ysukt2sovh.execute-api.ap-northeast-1.amazonaws.com/prod', {
            method: 'POST',
            body: JSON.stringify({
                "EventName": EventName,
                //meeting point
                "MeetingPoint": meetingPoint,
                "Dates": selected.toDateString(),
                //max pp
                "MaxPeople": maxPeople,
                "StartingTime":startingTime.format('hh:mm A'),
                "EndingTime":endingTime.format('hh:mm A'),
                "MoreInformation":moreInformation,
                "UserEmail": localStorage.getItem("email"),
                "UserGoogleID": localStorage.getItem("googleId"),
                "UserImg": localStorage.getItem("imageUrl"),
                "UserName": localStorage.getItem("name"),
                "JoinedUser":{
                    "googleId": localStorage.getItem("googleId"),
                    "imageUrl": localStorage.getItem("imageUrl"),
                    "email": localStorage.getItem("email"),
                    "name": localStorage.getItem("name"),
                    "givenName": localStorage.getItem("givenName"),
                    "familyName": localStorage.getItem("familyName"),       
                }
            }),
            headers: {
                'Content-Type': ['application/json'],
            }
        })
            .then(response => response.json()).then(()=>{
                // window.location.reload(false)
                // setLoad(false)

                getEventInfoService()
            })
            .then((data) => {
                // console.log("11111");
                // console.log(data);
                // console.log(JSON.stringify({
                //     "EventName": EventName,
                //     //meeting point
                //     "MeetingPoint": meetingPoint,
                //     "Dates": selected,
                //     //max pp
                //     "MaxPeople": maxPeople,
                //     "StartingTime":startingTime,
                //     "EndingTime":endingTime,
                //     "UserEmail": localStorage.getItem("email"),
                //     "UserGoogleID": localStorage.getItem("googleId"),
                //     "UserImg": localStorage.getItem("imageUrl"),
                //     "UserName": localStorage.getItem("name"),
                // }));
                // setPosts(data);
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const getEventInfoService = async ()=> {
        await fetch('https://ascykpjyrl.execute-api.ap-northeast-1.amazonaws.com/prod')
        .then((response) => response.json())
        .then((data) => {
            console.log("getddd")
            console.log(data)
            setEventInfo(JSON.parse(data.body).Items.sort(
                function (a, b) {
                    if (a.CreateDateTime < b.CreateDateTime) {
                        return 1;
                    }
                    if (a.CreateDateTime > b.CreateDateTime) {
                        return -1;
                    }
                    return 0;
                }
            ));
        }).then(setLoad(false))
        .catch((err) => {
            console.log(err.message);
        });
    };
    const handleSubmit = e => {
        setLoad(true)
        // e.preventDefault()
        // selected.sort(
        //     function (a, b) {
        //         if (a < b) {
        //             return -1;
        //         }
        //         if (a > b) {
        //             return 1;
        //         }
        //         return 0;
        //     }
        // );
        // selected.forEach((element, index) => {

        //     selected[index] = Moment(element).format('DD-MM-YYYY')
        // });
        // selected.sort(function(a,b) {
        //     a = a.split('-').reverse().join('');
        //     b = b.split('-').reverse().join('');
        //     return a > b ? 1 : a < b ? -1 : 0;
        //   });

        console.log("selected",selected)

        addPosts()
        console.log('handleSubmit')
    }

    const today = new Date();
    function isToday(date) {
        const today = new Date();
      
        // 👇️ Today's date
        console.log(today);
      
        if (today.toDateString() === date.toDateString()) {
          return true;
        }
      
        return false;
      }
      
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add An Event
            </Button>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add An Event</DialogTitle>
                <DialogContent>
                    
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Event Name"
                            placeholder="Event Name"
                            style={{ width: "100%" }}
                            onChange={(newValue) => (setEventName(newValue.target.value))}
                            error={EventNameError == true && EventName == ""}
                            helperText={(EventNameError == true && EventName == "") ? 'Empty field!' : ' '}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Meeting Point"
                            placeholder="Meeting Point"
                            style={{ width: "100%" }}
                            onChange={(newValue) => (setMeetingPoint(newValue.target.value))}
                            error={meetingPointError == true && meetingPoint == ""}
                            helperText={(meetingPointError == true && meetingPoint == "") ? 'Empty field!' : ' '}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DayPicker
                        // mode="multiple"
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        disabled={{ before: today }}
                        // footer={footer}
                    />
                    </div>


                    <p style={{ color: "red" }}>{ErrorMsg}</p>

<p >Max. people (including you):</p>

                    <Slider
  aria-label="Temperature"
  defaultValue={0}
  getAriaValueText={setMaxPeople}
  valueLabelDisplay="auto"
  step={1}
  marks
  min={0}
  max={20}
/>
{/* <p >Starting time:</p> */}
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<TimePicker label="Starting time" onChange={(newValue) => setStartingTime(newValue)}/>
<TimePicker label="Ending time" onChange={(newValue) => setEndingTime(newValue)}/>
</div>
{/* <DemoItem label="Digital clock"> */}
  {/* <DigitalClock /> */}
{/* </DemoItem> */}
{/* <DemoItem label="Digital clock"> */}
  {/* <DigitalClock /> */}
{/* </DemoItem> */}
{/* <p >Ending time:</p> */}

{/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}

<br></br>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<TextField
          id="outlined-multiline-static"
          label="More Information"
          multiline
          style={{ width: "100%" }}
          rows={4}
        //   defaultValue="Default Value"
          variant="outlined"
          onChange={(newValue) => (setMoreInformation(newValue.target.value))}
        />
                        </div>
                        
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#4caf50" }}
                        onClick={() => {
                            console.log('validation');
                            if (validation() == false) {
                                console.log("not close")
                            }
                            else {
                                //send api
                                handleSubmit();
                                cleanValue();
                                // window.location.reload(true)
                                handleClose();
                                //refresh

                                // window.location.reload(true)
                            }
                            //validation
                            //if validation ok->send api to back-end and close
                            //else, textfield css->red, don't close
                            //cancel-> clear all error and current value

                        }}
                    > Submit </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#ef5350" }}
                        onClick={() => {
                            cleanValue();
                            handleClose();
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    );


}
export default PopUpPage