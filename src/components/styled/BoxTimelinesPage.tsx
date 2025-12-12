import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

//TODO: Check if styled with theme works, I think last time I tried it I had problems getting the desired result with theme.spacing.
// export const BoxTimelinesList2 = styled(Box)(({ theme }) => ({
//     border: '1px solid',
//     borderRadius: theme.spacing(1),
//     borderColor: theme.palette.grey[300],
//     width: 'fit-content', 
//     padding: theme.spacing(2), 
//     height: 'fit-content', 
//     flexShrink: 0
// }));
export const BoxTimelinesList = styled(Box)(({ }) => ({
    border: '1px solid',
    borderRadius: '8px',
    borderColor: 'grey.300',
    width: 'fit-content', 
    padding: '16px', 
    height: 'fit-content', 
    flexShrink: 0
}));