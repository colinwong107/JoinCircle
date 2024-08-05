import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
function WhoJoined({ joinuser }) {
    return (
        <div>
            {
                joinuser.map((data) => (
                    <div>

                        <IconButton
                            sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={data.imageUrl} />
                        </IconButton>
                        &nbsp;&nbsp;
                        {data.name}
                        &nbsp;&nbsp;
                        {/* <div>
                        <ButtonGroup variant="text" aria-label="text secondary button group"  >
                            {data.selectedDates.map((data) => (<Button style={{ width: "102px",backgroundColor: "#ffffff"}} >&nbsp;{data}&nbsp;</Button>))}
                            </ButtonGroup>
                        </div> */}
                    </div>
                ))

            }
        </div>
    );
}
export default WhoJoined