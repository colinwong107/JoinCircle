import * as React from 'react';
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import SelectDates from './SelectDates';
import WhoJoined from './WhoJoined';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ReactLoading from 'react-loading';
function JoinEventList({ load,setLoad,EventInfo,setEventInfo,isLogin }) {
    useEffect(() => {
        console.log("useEffecrt")
        getEventInfoService()
    }, []);
    const getEventInfoService = async ()=> {
        await fetch('https://ascykpjyrl.execute-api.ap-northeast-1.amazonaws.com/prod')
        .then((response) => response.json())
        .then((data) => {
            console.log("get")
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
        })
        .catch((err) => {
            console.log(err.message);
        });
    };
    const [open, setOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState("");
    function handleClickOpen(data) {
        console.log("setCurrentEvent:",data)
        setCurrentEvent(data)
        //get api

        setOpen(true);
        setErrorMsg("")
    };
    const [joinedOpen, setJoinedOpen] = useState(false);
    const handleJoinedOpen = () => {
        setJoinedOpen(true);
      };
      const handleJoinedYesClose = () => {

                            // () => {

                                // setErrorMsg("")
                                // handleClose();
                                // //sorting date ok
                                // selectedDates.sort(function (a, b) {
                                //     a = a.split('-').reverse().join('');
                                //     b = b.split('-').reverse().join('');
                                //     return a > b ? 1 : a < b ? -1 : 0;
                                // });

                                // //post api

                                setLoad(true)
                                UpdateJoinDetail()
                                handleClose()
                                // setSelectedDates([])

                        // }




        handleJoinedClose()
      };
      const handleJoinedNoClose = () => {
        handleJoinedClose()
      };
      const handleJoinedClose = () => {
        setJoinedOpen(false);
      };
    const handleClose = () => {
        setOpen(false);
    };
    const [selectedDates, setSelectedDates] = useState([]);


    const UpdateJoinDetail = () => {
        const joinedUser = {
            "googleId": localStorage.getItem("googleId"),
            "imageUrl": localStorage.getItem("imageUrl"),
            "email": localStorage.getItem("email"),
            "name": localStorage.getItem("name"),
            "givenName": localStorage.getItem("givenName"),
            "familyName": localStorage.getItem("familyName"),
            // "selectedDates": selectedDates,

        }
        postJoinDetail(joinedUser)
    }
    const postJoinDetail = async (joinedUser) => {
        await fetch('https://s7yqj5cd1h.execute-api.ap-northeast-1.amazonaws.com/prod', {
            method: 'POST',
            body:
                JSON.stringify({
                    "joinedUser": joinedUser,
                    // "selectedDates": selectedDates,
                    // "createDateTime": currentEvent.CreateDateTime,
                    "uuid":currentEvent.uuid
                })
            ,
            headers: {
                'Content-Type': ['application/json'],
            }
        })
            .then(response => response.json())
            .then((data) => {
                setLoad(false)
                // window.location.reload(false)
                // setPosts(data);
                getEventInfoService()
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const [ErrorMsg, setErrorMsg] = useState("")


    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                {
                    EventInfo.length == 0 || load==true ?  <ReactLoading type={"spin"} color={"#FF6262"} height={'5%'} width={'5%'} />:
                    EventInfo.map((data) => (
                        <div>
                            <Card sx={{
                                minWidth: '0.6',
                                margin: 1,
                                borderRadius: 3
                            }}
                                onClick={() => handleClickOpen(data)}
                            >
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {data.EventName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            holding by {data.UserName}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        </div>
                    ))
                }
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {currentEvent.EventName}
                </DialogTitle>
                <DialogContent>
                    
                    
                    {currentEvent.Dates}
                    <br />
                    {currentEvent.StartingTime} - {currentEvent.EndingTime}
                    <br />
                    Meeting Point:&nbsp;{currentEvent.MeetingPoint}
                    <br />
                    {currentEvent.MoreInformation}
                    <br />
                    <br />
                    <br />
                    {/* holding by  &nbsp;
                    <IconButton
                        sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={currentEvent.UserImg} />
                    </IconButton>
                    &nbsp; {currentEvent.UserName} */}
                    <br />
                    
                    {/* <SelectDates dates={currentEvent.Dates} setSelectedDates={setSelectedDates} /> */}
                    {/* <DayPicker /> */}
                    {/* show who join */}
                    <p style={{ color: "red" }}>{ErrorMsg}</p>
                    Joined:
                    <WhoJoined joinuser={currentEvent.JoinUser}></WhoJoined>
                </DialogContent>
                <DialogActions>
                    {isLogin==true?<Button
                        variant="contained"
                        style={{ backgroundColor: "#4caf50" }}
                        onClick={handleJoinedOpen
                            // () => {

                                // setErrorMsg("")
                                // handleClose();
                                // //sorting date ok
                                // selectedDates.sort(function (a, b) {
                                //     a = a.split('-').reverse().join('');
                                //     b = b.split('-').reverse().join('');
                                //     return a > b ? 1 : a < b ? -1 : 0;
                                // });

                                // //post api

                                // setLoad(true)
                                // UpdateJoinDetail()

                                // setSelectedDates([])

                        // }
                    }
                    > Submit </Button>:null}
                    {/* <Button
                        variant="contained"
                        style={{ backgroundColor: "#4caf50" }}
                        onClick={handleJoinedOpen
                            // () => {

                                // setErrorMsg("")
                                // handleClose();
                                // //sorting date ok
                                // selectedDates.sort(function (a, b) {
                                //     a = a.split('-').reverse().join('');
                                //     b = b.split('-').reverse().join('');
                                //     return a > b ? 1 : a < b ? -1 : 0;
                                // });

                                // //post api

                                // setLoad(true)
                                // UpdateJoinDetail()

                                // setSelectedDates([])

                        // }
                    }
                    > Submit </Button> */}
                        <Dialog
        open={joinedOpen}
        onClose={handleJoinedClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to join this event?"}
        </DialogTitle>
        {/* <DialogContent> */}
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        {/* </DialogContent> */}
        <DialogActions>
          <Button variant="contained" style={{ backgroundColor: "#4caf50" }} onClick={handleJoinedYesClose}>YES</Button>
          <Button variant="contained" style={{ backgroundColor: "#ef5350" }} onClick={handleJoinedNoClose}>
            NO
          </Button>
        </DialogActions>
      </Dialog>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#ef5350" }}
                        onClick={() => {
                            // cleanValue();
                            setErrorMsg("")
                            setSelectedDates([])
                            handleClose();
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    )




}
export default JoinEventList