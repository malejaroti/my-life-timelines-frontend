import { useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/config.services';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import TimelineCard from '../components/TimelineCard';
import Drawer from '@mui/material/Drawer';
import AddButton from '../components/AddButton';
import type { DrawerState, ITimelineItem } from './TimelineItemsPage';
import TimelineForm from '../components/Forms/TimelineForm';
import type { FormType } from '../components/Forms/ItemForm';
import { AuthContext } from '../context/auth.context';
import DeleteModal from '../components/DeleteModal';
import { TimelinesCardsContainer } from '../components/styled/CardsContainer'
import type { IUser } from './UserProfilePage';
import CombinedLinearTimeline from '../components/CombinedLinearTimeline';
import { BoxTimelinesList } from '../components/styled/BoxTimelinesPage';
export interface ITimeline {
  _id: string;
  owner: IUser;
  title: string;
  icon?: string;
  description?: string;
  startDate?: string; // calculated in backend
  endDate?: string;   // calculated in backend
  collaborators?: IUser[];
  isPublic: boolean;
  color?: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

// Payload for creating a new timeline (server expects ids, not populated objects)
export type TimelineCreatePayload = {
  owner: string;               // owner id
  title: string;
  icon?: string;
  description?: string;
  collaborators?: string[];    // collaborator ids
  isPublic: boolean;
  color?: string;
};

function TimelinesPage() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('Timelines must be accessed within an AuthWrapper');
  }
  const { loggedUserId } = authContext;
  const [userTimelines, setUserTimelines] = useState<ITimeline[]>([]);
  const [allTimelineItems, setAllTimelineItems] = useState<ITimelineItem[]>([]);
  const [collaborationTimelines, setCollaborationTimelines] = useState<ITimeline[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState<ITimeline | null>(null);
  const [formType, setFormType] = useState<FormType>(null);
  const [openModal, setOpenModal] = useState(false);
  const [drawerState, setDrawerState] = useState<DrawerState>({
    position: 'right',
    open: false,
  });
  const [usersData, setUsersData] = useState<IUser[] | null>(null);
  const navigate = useNavigate()


  useEffect(() => {
    getAllTimelineItemsCurrentYear();
    getUserTimelines();
    getCollaborationTimelines();
    getUsersData();

  }, []);

  const getUserTimelines = async () => {
    try {
      const response = await api.get('/timelines');
      // console.log("user timelines", response)
      setUserTimelines(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTimelineItemsCurrentYear = async () => {
    try {
      const response = await api.get('/items');
      // console.log("all timeline items", response)
      setAllTimelineItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCollaborationTimelines = async () => {
    try {
      const response = await api.get('/timelines/collaborations');
      // console.log('timelines collaborations', response);
      setCollaborationTimelines(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersData = async () => {
    try {
      const response = await api.get('/users');
      console.log("All users data", response)
      setUsersData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const openDeleteModal = useCallback((timeline: ITimeline) => {
    setSelectedTimeline(timeline);
    setOpenModal(true)
  }, []);

  const openDrawerWithCreateForm = useCallback(() => {
    setFormType('create');
    setSelectedTimeline(null);
    setDrawerState((prev) => ({ ...prev, open: true }));
  }, []);

  const openDrawerWithEditForm = useCallback(
    (timeline: ITimeline) => {
      setFormType('edit');
      setSelectedTimeline(timeline);
      setDrawerState((prev) => ({ ...prev, open: true }));
    },
    []
  );

  const closeDrawer = useCallback(() => {
    setDrawerState((prev) => ({ ...prev, open: false }));
  }, []);

  const handleTimelineDelete = async () => {
    try {
      const response = await api.delete(`/timelines/${selectedTimeline?._id}`);
      console.log('Res DELETE item: ', response);
      getUserTimelines()
      setOpenModal(false)
    } catch (error) {
      navigate('/error');
    }
  }

  return (
    <main className='relative flex flex-col gap-8 m-auto'>
      <section className="user-timelines">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <Typography variant="h3">
            My timelines
          </Typography>
          <Stack direction="row" spacing={2}>
            <Box borderRadius={1} sx={{ p: 2, border: '1px solid grey' }}
            >
              {`${userTimelines.length} Own timelines`}
            </Box>

            <Button
              variant="contained"
              onClick={() => openDrawerWithCreateForm()}
              // size='large'
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.85rem", md: "1rem" },
                px: { xs: 1, sm: 2, md: 3 },
                py: { xs: 0.5, sm: 1 },
                bgcolor: 'primary.main', // use theme's color
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Add timeline
            </Button>
          </Stack>
        </Box>
        <Box>
          <CombinedLinearTimeline items={allTimelineItems} />
        </Box>
        
        {/* Container for timelines list (left) and timelines container(right) */}
        <Stack direction="row" spacing={2}
          sx={{ pt: 3 }}
        >
          {/* Left - Timelines list */}
          <Stack spacing={2}> 
            <Box
              sx={{    
                border: '1px solid',
                borderRadius: 1, // rounded-md
                borderColor: 'grey.300', // border-slate-200
                width:'fit-content', 
                p:2, 
                height: 'fit-content', 
                flexShrink: 0
              }}>
              <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>MY OWN TIMELINES</Typography>
              {userTimelines.map((timeline, index) => (
                <Typography
                  key={timeline._id}
                  variant="body1"
                  component="p"
                  sx={{ mb: 1, whiteSpace: 'nowrap' }}
                >
                  {index+1 + ". " + timeline.title}
                </Typography>
              ))}
            </Box>
            <BoxTimelinesList>
              <Typography sx={{ fontWeight: 'bold' }}>Collaboration timelines</Typography>
              {collaborationTimelines.map((timeline, index) => (
                <Typography
                  key={timeline._id}
                  variant="body1"
                  component="p"
                  sx={{ mb: 1, whiteSpace: 'nowrap' }}
                >
                  {index+1 + ". " + timeline.title}
                </Typography>
              ))}
            </BoxTimelinesList>
          </Stack>

          <TimelinesCardsContainer>
            {userTimelines.map((timeline) => (
              // {console.log(timeline)}
              <TimelineCard
                key={timeline._id}
                timelineOwner={timeline.owner._id === loggedUserId ? "loggedUser" : "collaborator"}
                timeline={timeline}
                onClickEditButton={() => openDrawerWithEditForm(timeline)}
                handleClickOnDeleteButton={() => openDeleteModal(timeline)}
                allUsers={usersData ?? []}
              />
            ))}
          </TimelinesCardsContainer>
        </Stack>
      </section>
      <section className="collaboration-timelines">
        <Typography variant="h3" component="h2">
          Collaboration timelines
        </Typography>
        <TimelinesCardsContainer>
          {collaborationTimelines.map((timeline) => (
            <TimelineCard
              key={timeline._id}
              timelineOwner="collaborator"
              timeline={timeline}
              onClickEditButton={() => openDrawerWithEditForm(timeline)}
              allUsers={usersData ?? []}

            />
          ))}
        </TimelinesCardsContainer>
      </section>

      <Drawer
        anchor={drawerState.position}
        open={drawerState.open}
        onClose={(_, __) => setDrawerState((prev) => ({ ...prev, open: false }))}
        // onClose={closeDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '90%', sm: 500, md: 600 },
          },
        }}
      >
        {formType === 'create' && (
          <TimelineForm
            formType="create"
            onSuccess={closeDrawer}
            onRefresh={getUserTimelines}
            onCancel={closeDrawer}
          />
        )}

        {formType === 'edit' && selectedTimeline && (
          <TimelineForm
            formType="edit"
            timeline={selectedTimeline}
            onSuccess={closeDrawer}
            onRefresh={getUserTimelines}
            onCancel={closeDrawer}

          />
        )}
      </Drawer>
      <DeleteModal modalState={openModal} modalStateSetter={setOpenModal} handleDelete={handleTimelineDelete} modalMessage={"timeline"} />
    </main>
  );
}
export default TimelinesPage;
