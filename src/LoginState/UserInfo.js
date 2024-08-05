import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
function UserInfo() {
    return (
        <div>
            <IconButton>
                <Avatar alt="Remy Sharp" src={localStorage.getItem("imageUrl")} sx={{ width: 100, height: 100 }} />
            </IconButton>
            <div className="flex flex-wrap w-full p-8 space-x-4">
            </div>
            <h3>Hello {localStorage.getItem("name")}</h3>
        </div>
    )
}
export default UserInfo