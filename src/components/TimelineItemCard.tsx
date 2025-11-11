import { Delete, Edit } from "@mui/icons-material"
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import { type ITimelineItem } from "../pages/TimelineItemsPage"
import formatDate from "../utils/formatDate"

type TimelineItemCardProps = {
    timelineItem: ITimelineItem
    callbackOnClickTrash?: () => void
    callbackOnClickEdit?: () => void
}

function TimelineItemCard({ timelineItem, callbackOnClickTrash, callbackOnClickEdit }: TimelineItemCardProps) {

    const calculateEventDuration = (startDate?: string, endDate?: string) => {
        if (!endDate) return 0; // ongoing event, duration is already covered by "since start date"
        if (!startDate) return 0;
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // convert to days
        const months = Math.floor(days / 30);
        if (days <= 31) {
            return days > 1 ? `${days} days` : ``;
        }
        return months > 1 ? `${days} days (${months} months)` : ``;
    }
    const calculateDaysSinceStartDate = (startDate?: string, endDate?: string) => {
        if (!startDate) return 0;
        const start = new Date(startDate);
        const todayDate =  new Date();
        const diffTime = Math.abs(todayDate.getTime() - start.getTime());
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // convert to days
        const months = Math.floor(days / 30);
        const previousWord = endDate === null || endDate === undefined ? "Started: " : " ";
        if (days <= 31) {
            return previousWord + (days > 1 ? `${days} days ago` : ``);
        }
        return previousWord + (months > 1 ? `${days} days (${months} months) ago` : `${days} days ago`);
    }

    const calculateAgeAtDate = (birthDateStr: string, targetDateStr: string) => {
        const birthDate = new Date(birthDateStr);
        const targetDate = new Date(targetDateStr);
        const ageInMilliseconds = targetDate.getTime() - birthDate.getTime();
        const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
        return ageInYears;
    }

    return (
        <Card key={timelineItem._id}
            sx={{
                // maxHeight: 480,
                minWidth: 280,
                position: 'relative',
                display: 'flex',
                padding:'20px 15px',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#e2e8f0',
                // justifyContent: 'space-between'
                // justifyContent: 'space-between'
            }}
        >
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
                    {(() => {
                        const eventDuration = calculateEventDuration(timelineItem.startDate, timelineItem.endDate);
                        return eventDuration ? "Duration: " + eventDuration : null;
                    })()}
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
            <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', position: 'absolute', top: 10, left: 10, fontSize: '0.7rem' }}>
                    My age: {calculateAgeAtDate("12/16/1997",timelineItem.startDate )} yrs
                </Typography>
            </Box>
        </Card>
    )
}
export default TimelineItemCard