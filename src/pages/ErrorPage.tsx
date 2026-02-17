import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import SentimentVeryDissatisfied from "@mui/icons-material/SentimentVeryDissatisfied"
import { useNavigate } from "react-router"


function ErrorPage() {
    const navigate = useNavigate()
    return (
        <>
        
            <div className='h-[70%] m-auto flex flex-col items-center p-5 text-center'>
            <SentimentVeryDissatisfied sx={{ 
                fontSize:{xs:150, lg:300}, color: 'gray', mb: 2 }}/>
            <Typography variant="h3" >Oops!</Typography>
            <Typography variant="h5" color="gray">Sorry</Typography>
            <Typography variant="body1" sx={{mt:3, color:'gray'}}>There was an error in our server.</Typography>

            <Stack direction="row" spacing={2} sx={{mt:3}}>
                <Button variant='contained' size="small" onClick={()=>{navigate(-1)}} >
                    Go back
                </Button>
                <Button variant='contained' size="small" onClick={()=>{navigate('/')}} >
                    Go back Home
                </Button>
            </Stack>
            </div>
        </>
    )
}
export default ErrorPage