import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/auth.context';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Stack,
    useTheme,
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import ComputerIcon from '@mui/icons-material/Computer';
import CompressIcon from '@mui/icons-material/Compress';
import Grid from '@mui/material/Grid';
import {
    Timeline as TimelineIcon,
    Memory as MemoryIcon,
    Visibility as VisibilityIcon,
    AutoStories as StoriesIcon,
} from '@mui/icons-material';
import CombinedVisTimeline from '../components/vis-timeline/CombinedVisTimeline';
import { demoTimelinesWithItems } from '../assets/data/demoTimelineData';

type timelineConfig = {
        timelineName: string | null,
        windowStart: Date,
        windowEnd: Date,
        imageVisibility?: boolean
    }
    const BooksTimelineConfig: timelineConfig = {
        timelineName: "Books",
        windowStart: new Date('2025-01-01'),
        windowEnd: new Date(),
        imageVisibility: true
    }
    const ProfessionalExperienceTimelineConfig: timelineConfig = {
        timelineName: "Professional Experience",
        windowStart: new Date('2020-12-01'),
        windowEnd: new Date(),
        imageVisibility: false
    }

    const AllTimelinesConfig: timelineConfig = {
        timelineName: null,
        windowStart: new Date('2025-01-01'),
        windowEnd: new Date(),
        imageVisibility: false
    }

function Home() {
    const theme = useTheme();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('This page must be used within an AuthWrapper');
    }

    const { isLoggedIn } = authContext;
    const handleGetStarted = () => {
        if (isLoggedIn) {
            navigate('/lifetimeline');
        } else {
            navigate('/sign-up');
        }
    };
    const features = [
        {
            icon: <TimelineIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "Full-Stack TypeScript",
            description: "React 19 + Node.js/Express, all in TypeScript end-to-end."
        },
        {
            icon: <MemoryIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "JWT Auth & Protected Routes",
            description: "Secure authentication with JSON Web Tokens, React Context for global auth state, and route guards for private pages."
        },
        {
            icon: <VisibilityIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "vis-timeline Integration",
            description: "Complex third-party DOM library integrated into React with useRef and useEffect, supporting dynamic grouped timelines."
        },
        {
            icon: <StoriesIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: "REST API + MongoDB",
            description: "Express REST API with Mongoose models, Cloudinary image uploads, and bcrypt password hashing."
        }
    ];
    
    const [selectedTimelineConfig, setSelectedTimelineConfig] = useState<timelineConfig | null>(BooksTimelineConfig);
    const [selectedTimelineWithItems, setSelectedTimelineWithItems] = useState<any>(null);
    
    function setTimelineConfiguration (timelineConfig: timelineConfig) {
        setSelectedTimelineConfig(timelineConfig);
        getDataForSelectedTimeline(timelineConfig.timelineName);
    }

    useEffect(() => {
        // Set default timeline configuration on initial load
        setTimelineConfiguration(BooksTimelineConfig);
    }, []);

    function getDataForSelectedTimeline(timelineName: string | null) {
        if (timelineName === null) {
            setSelectedTimelineWithItems(demoTimelinesWithItems);
        } else {
            const timelineData = demoTimelinesWithItems.find(timeline => timeline.timelineTitle === timelineName);
            setSelectedTimelineWithItems([timelineData]);
        }
    }
    return (
        <Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>
            {/* Hero Section */}
            <section id='hero'>
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
                        minHeight: { xs: '40vh', md: '30vh' },
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        paddingTop: '64px', // offset for fixed navbar
                    }}
                >
                    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, justifyContent: 'center', display: 'flex' }}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid>
                                <Stack spacing={3} sx={{justifyContent:'center'}}>
                                    <Typography
                                        variant="h2"
                                        component="h1"
                                        sx={{
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: { xs: '2.5rem', md: '2.5rem' },
                                            lineHeight: 1.1,
                                            color: 'white',
                                        }}
                                    >
                                        Create a <Box component="span" sx={{ fontWeight: 'bold', color: '#facc15' }}>Visual Timeline</Box> of anything in your life 
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            textAlign: 'center',
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            fontWeight: 400,
                                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                                            lineHeight: 1.4
                                        }}
                                    >
                                        Transform events into themed timelines and combine them into a single visual story.
                                    </Typography>

                                    {/* <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Button
                                            onClick={handleGetStarted}
                                            variant="contained"
                                            size="medium"
                                            sx={{
                                                fontSize: '1rem',
                                                borderRadius: 3,
                                                textTransform: 'none',
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                color: '#1e3a8a',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    backgroundColor: 'white',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {isLoggedIn ? 'Go to Your Timeline' : 'Create your own timelines'}
                                        </Button>
                                        <Button
                                            onClick={handleGetStarted}
                                            variant="contained"
                                            size="medium"
                                            sx={{
                                                fontSize: '1rem',
                                                borderRadius: 3,
                                                textTransform: 'none',
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                color: '#1e3a8a',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    backgroundColor: 'white',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            Try the Demo 👇
                                        </Button>
                                    </Box> */}
                                </Stack>
                            </Grid>

                        </Grid>
                    </Container>

                    {/* Background decorative elements */}
                    <Box
                        sx={{
                            position: 'absolute',
                            right: '-10%',
                            top: '20%',
                            width: '40%',
                            height: '60%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            filter: 'blur(100px)',
                            zIndex: 1
                        }}
                    />
                </Box>
            </section>
            <section id="demo" style={{ scrollMarginTop: '64px' }}>
                <Stack>
                    {/* Explanation buttons use */}
                    <Typography variant="h6" sx={{textAlign: 'center', mt: 2, color: '#1e3a8a', width: '80%', mx: 'auto'}}>
                        Explore the Demo Timelines by clicking the buttons below 👇
                    </Typography>
                    {/* Buttons to select timeline */}
                    <Box sx={{
                        margin: 'auto',
                        display: 'flex',
                        padding: 2,
                        justifyContent: 'center',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 2, md: 8 }
                    }}>
                        <Button sx={{border: '0.1px solid #d4d4d4'}}
                            onClick={() => setTimelineConfiguration(BooksTimelineConfig)}
                            startIcon={<BookIcon />}
                            >Books Read in 2025</Button>
                        <Button sx={{border: '0.1px solid #d4d4d4'}}
                            onClick={() => setTimelineConfiguration(ProfessionalExperienceTimelineConfig)}
                            startIcon={<ComputerIcon />}
                        >Professional Experience</Button>
                        <Button sx={{border: '0.1px solid #d4d4d4'}} 
                            onClick={() => setTimelineConfiguration(AllTimelinesConfig)}
                            startIcon={<CompressIcon />}
                        >Both timelines combined</Button>
                    </Box>
                    <Box sx={{ 
                    width: '100%', 
                    maxWidth: '1200px',
                    mx: 'auto',
                    boxShadow: 3,
                    borderRadius: 4,
                    // minHeight: '300px',
                    }}>
                        <CombinedVisTimeline 
                            timelinesWithItems={selectedTimelineWithItems ? selectedTimelineWithItems : demoTimelinesWithItems} 
                            windowStart={selectedTimelineConfig ? selectedTimelineConfig.windowStart : new Date('2025-01-01')}
                            windowEnd={selectedTimelineConfig ? selectedTimelineConfig.windowEnd : new Date()}
                            imageVisibility={selectedTimelineConfig ? selectedTimelineConfig.imageVisibility : true}
                        />
                    </Box>
                </Stack>
            </section>

            {/* Features Section */}
            <section id="features" style={{ scrollMarginTop: '64px' }}>
                <Container sx={{ py: { xs: 6, md: 10 }, width:'100%'}}>
                    <Stack spacing={8}>
                        <Box textAlign="center">
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 2,
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    color: '#1e3a8a'
                                }}
                            >
                                🛠️ What's Under the Hood
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#475569',
                                    fontSize: { xs: '1.1rem', md: '1.3rem' }
                                }}
                            >
                                Built as a portfolio project — full-stack, production-ready architecture
                            </Typography>
                        </Box>

                        <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
                            {features.map((feature, index) => (
                                <div className='flex' key={index}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            p: 3,
                                            borderRadius: 4,
                                            border: '1px solid rgba(59, 130, 246, 0.2)',
                                            backgroundColor: 'rgba(230, 230, 250, 0.3)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)',
                                                borderColor: '#3b82f6',
                                                backgroundColor: 'rgba(204, 229, 255, 0.4)'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: 0 }}>
                                            <Stack spacing={2} alignItems="center" textAlign="center">
                                                <Box sx={{
                                                    '& svg': {
                                                        color: '#3b82f6',
                                                        fontSize: 40
                                                    }
                                                }}>
                                                    {feature.icon}
                                                </Box>
                                                <Typography
                                                    variant="h6"
                                                    component="h3"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: '#1e3a8a',
                                                        fontSize: '1.1rem'
                                                    }}
                                                >
                                                    {feature.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: '#475569',
                                                        fontSize: '0.95rem',
                                                        lineHeight: 1.5
                                                    }}
                                                >
                                                    {feature.description}
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </Stack>
                </Container>
            </section>

            {/* CTA Section */}
            <Box sx={{
                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                py: { xs: 6, md: 8 }
            }}>
                <Container maxWidth="md">
                    <Stack spacing={4} alignItems="center" textAlign="center">
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                color: '#1e3a8a'
                            }}
                        >
                            👉 Ready to create your visual story?
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                color: '#475569',
                                fontSize: { xs: '1.1rem', md: '1.3rem' },
                                maxWidth: { xs: '20rem', md: '60rem' },
                            }}
                        >
                            Create your account and start building your own visual timelines today. It's free, fun, and a unique way to reflect on your life's journey!
                        </Typography>

                        <Button
                            onClick={handleGetStarted}
                            variant="contained"
                            size="large"
                            sx={{
                                py: 2.5,
                                px: 6,
                                fontSize: '1.3rem',
                                borderRadius: 4,
                                textTransform: 'none',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#1e3a8a',
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0 12px 30px rgba(59, 130, 246, 0.4)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isLoggedIn ? 'View Your Timeline' : 'Create Your Timeline'}
                        </Button>

                        {!isLoggedIn && (
                            <Typography variant="body2" sx={{ color: '#475569' }}>
                                Already have an account?{' '}
                                <Link
                                    to="/sign-in"
                                    style={{
                                        color: '#3b82f6',
                                        textDecoration: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Sign in here
                                </Link>
                            </Typography>
                        )}
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}

export default Home;