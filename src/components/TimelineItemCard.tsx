import { Delete, Edit } from "@mui/icons-material"
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material"
import { type ITimelineItem } from "../pages/TimelineItemsPage"
import formatDate from "../utils/formatDate"

type TimelineItemCardProps = {
    timelineItem: ITimelineItem
    callbackOnClickTrash?: () => void
    callbackOnClickEdit?: () => void
}

function TimelineItemCard({ timelineItem, callbackOnClickTrash, callbackOnClickEdit }: TimelineItemCardProps) {

    // Common utility function to calculate days between dates
    const calculateDaysBetween = (startDate: string, endDate?: string): number => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date(); // If no end date provided, means event is still ongoing, so use current date as end date
        const diffTimeInMs = Math.abs(end.getTime() - start.getTime());
        return Math.floor(diffTimeInMs / (1000 * 60 * 60 * 24)); // Dividing by 1000 to 
    }

    // Format duration (for events) - shows actual breakdown of time
    const formatDuration = (days: number): string => {
        if (days <= 1) {
            return days === 1 ? '1 day' : '';
        }
        
        if (days <= 31) {
            return `${days} days`;
        }
        
        const years = Math.floor(days / 365);
        const remainingDaysAfterYears = days % 365;
        const months = Math.floor(remainingDaysAfterYears / 30);
        const remainingDays = remainingDaysAfterYears % 30;
        
        const parts = [];
        if (years > 0) {
            parts.push(years === 1 ? '1 year' : `${years} years`);
        }
        if (months > 0) {
            parts.push(months === 1 ? '1 month' : `${months} months`);
        }
        if (remainingDays > 0) {
            parts.push(remainingDays === 1 ? '1 day' : `${remainingDays} days`);
        }
        
        return parts.join(', ');
    }

    // Format time period (for "time ago") - shows approximate months/years
    const formatTimePeriod = (days: number): string => {
        if (days <= 31) {
            return days > 1 ? `${days} days` : days === 1 ? `${days} day` : '';
        }
        
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);
        
        if (months <= 12) {
            return months === 1 ? '1 month' : `${months} months`;
        }

        const remainingMonths = months % 12;
        if (remainingMonths === 0) {
            return years === 1 ? '1 year' : `${years} years`;
        }
        
        return years === 1 
            ? `1 year, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
            : `${years} years, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }

    const calculateEventDuration = (startDate: string, endDate?: string): string => {
        if (!endDate || !startDate) return ''; // No duration if dates are missing
        if (endDate === startDate) return ''; // No duration if is a one-day event
        
        const days = calculateDaysBetween(startDate, endDate) + 1; // +1 to include both start and end dates
        return formatDuration(days)
    }

    const calculateDaysSinceStartDate = (startDate?: string, endDate?: string): string => {
        if (!startDate) return '';
        
        const days = calculateDaysBetween(startDate, endDate);
        const prefix = endDate === null || endDate === undefined ? "Started: " : " "; // Only show "Started" if the event is ongoing
        const timePeriod = formatTimePeriod(days);
        
        if (days <= 31) {
            return prefix + (days > 1 ? `${days} days ago` : `${days} day ago`);
        }
        
        return prefix + timePeriod + ' ago';
    }

    const calculateAgeAtDate = (birthDateStr: string, targetDateStr: string) => {
        const birthDate = new Date(birthDateStr);
        const targetDate = new Date(targetDateStr);
        const ageInMilliseconds = targetDate.getTime() - birthDate.getTime();
        const ageInMonths = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 30.44));
        const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
        const remainingMonths = ageInMonths % 12;
        return ageInYears + " years" + (remainingMonths > 0 ? ` - ${remainingMonths}months` : '');
    }

    return (
        <Card key={timelineItem._id}
            sx={{
                // maxHeight: 480,
                minWidth: 280,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                padding:'20px 15px',
                alignItems: 'center',
                backgroundColor: '#e2e8f0',
                // justifyContent: 'space-between'
                // justifyContent: 'space-between'
            }}
        >
            {/* {   
                <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: '10px', fontSize: '0.7rem' }}>
                    
                    My age: {calculateAgeAtDate("12/16/1997",timelineItem.startDate )}
                </Typography>
            } */}

            {timelineItem.images.length !== 0 ?
                // <CardMedia
                //     component="img"
                //     image={
                //         timelineItem.images && timelineItem.images.length > 0
                //             ? timelineItem.images[0]
                //             : undefined
                //     }
                //     alt="Timeline image"
                //     sx={{
                //         maxHeight: 250,
                //         // maxWidth:400,
                //         objectFit: 'contain', //contain
                //         // backgroundColor: '#f5f5f5',
                //         padding: '20px 0px',
                //         boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)'
                //     }}
                // />
                <Box
                    component="img"
                    src={
                        timelineItem.images && timelineItem.images.length > 0
                            ? timelineItem.images[0]
                            : undefined
                    }
                    alt="Timeline image"
                    sx={{
                        maxHeight: 150,
                        justifySelf:'flex-start',
                        marginBottom:'10px',
                        // border:2,
                        flexGrow:1,
                        // maxWidth:400,
                        objectFit: 'contain', //contain
                        // backgroundColor: '#f5f5f5',
                        // border: '1px solid black',
                        // padding: '20px 0px',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.85)',
                        transform: 'translateZ(0)', /* helps with GPU rendering */
                        // transform: 'rotateY(15deg) rotateX(5deg)',
                        // transformStyle: 'preserve-3d',
                    }}
                >
                </Box>
                : ""
            }
            <CardContent sx={{
                display: 'flex',
                // alignSelf:'flex-end',
                // justifySelf:'flex-end !important',
                // marginTop:'auto',
                // marginTop:'10px',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '280px',
                width: '100%',
                padding:'10px',
                // backgroundColor: timelineItem.images.length === 0 ? '#f5f5f5' : 'transparent',
                flex: '1 1 auto',
                // border:1,
            }} className="">
                <Typography gutterBottom variant="h6" component="div"
                sx={{ marginBottom: '2px', textAlign: 'center', lineHeight:'1' }}>
                    {timelineItem.title}
                </Typography>
                <Typography variant="body2"
                    sx={{
                        fontSize: '0.8rem',
                        color: 'text.secondary',
                        textAlign: 'center',
                        paddingBottom: '8px',

                    }}>
                    {formatDate(timelineItem.startDate)}
                    {timelineItem.startDate === timelineItem.endDate
                    ? ""
                    : timelineItem.endDate
                        ? ` - ${formatDate(timelineItem.endDate)}
                          `
                        : ' - Present'
                    }
                </Typography>
                <Typography variant="body2"
                    sx={{
                        fontSize: '0.8rem',
                        color: 'text.secondary',
                        textAlign: 'center',
                        fontStyle: 'italic',
                    }}>
                    {calculateDaysSinceStartDate(timelineItem.startDate, timelineItem.endDate)}
                </Typography>
                <Typography variant="body2"
                    sx={{
                        fontSize: '0.8rem',
                        color: 'text.secondary',
                        textAlign: 'center',
                        fontStyle: 'italic',
                        paddingBottom: '8px',
                    }}>
                    {
                        // Show duration only if endDate exists (i.e., not ongoing event)
                        timelineItem.endDate &&
                        `Duration: ${calculateEventDuration(timelineItem.startDate, timelineItem.endDate)}`
                    }
                </Typography>
                <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    maxHeight: 100,
                    textAlign: 'justify',
                    // border:1,
                    // display: '-webkit-box',
                    // WebkitLineClamp: 2,
                    // WebkitBoxOrient: 'vertical',
                    // // overflowY: 'scroll',
                    overflow: 'hidden',
                    // textOverflow: 'ellipsis'
                }}>
                    {timelineItem.description}
                </Typography>
                <Box sx={{ marginTop: '10px' }}>
                    {timelineItem.tags.length === 0 ? null : (
                        <div className='flex flex-wrap gap-1'>
                            {timelineItem.tags.map(tag => (
                                <span key={tag._id} className='inline-block  border-slate-100 border-[1px]  bg-blue-100 text-blue-800 text-[10px] px-2 py-1 rounded-full max-w-[100px] truncate'>{tag.name}</span>
                            ))}
                        </div>
                    )}
                </Box>
            </CardContent>
            <Box sx={{
                display: 'flex',
                // marginTop: 'auto',
                alignSelf: 'flex-end',
                position: 'absolute',
                bottom: '10px',
                // left:'10px'
            }}
                className="">
                <IconButton
                    aria-label="Edit item"
                    onClick={callbackOnClickEdit}
                    // onClick={() => openDrawerEdit(timelineItem, 'right')}
                    size="small"
                    sx={{
                        alignSelf: 'flex-end',
                        justifySelf: 'flex-end',
                        color: '#a7a4a4ff',
                    }}
                >
                    <Edit fontSize="small" />
                </IconButton>
                <IconButton
                    aria-label="Delete item"
                    onClick={callbackOnClickTrash}
                    size="small"
                    sx={{
                        alignSelf: 'flex-end',
                        justifySelf: 'flex-end',
                        color: '#a7a4a4ff',
                    }}
                >
                    <Delete fontSize="small" />
                </IconButton>

            </Box>
        </Card>
    )
}
export default TimelineItemCard