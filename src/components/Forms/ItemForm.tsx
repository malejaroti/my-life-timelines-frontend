import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// MUI imports
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// React-Select imports
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
// Custom components and context imports
import { FormContainer, FormGrid, FormHeader } from './FormSubcomponents/FormStyledSubcomponents';
import { AuthContext } from '../../context/auth.context';
import ImageUploader from '../ImageUploader';
import api from '../../services/config.services';
import dayjs, { Dayjs } from 'dayjs';
import { responsiveStyles } from '../../shared-theme/themePrimitives';
import type { ITimelineItem, TimelineItemCreateDTO} from '../../pages/TimelineItemsPage';
import type { ITag, SelectOption } from '../../types/index';
import type { MultiValue, ActionMeta } from 'react-select';
import { Alert } from '@mui/material';
import { AxiosError } from 'axios';

export type FormType = 'edit' | 'create' | null; //union

// discriminated union
type ItemFormProps =
  | { formType: 'create'; timelineId: string; item?: never; onSuccess: () => void; onRefresh: () => void; onCancel: () => void }
  | { formType: 'edit'; item: ITimelineItem; timelineId: string; onSuccess: () => void; onRefresh: () => void; onCancel: () => void };


export default function ItemForm(props: ItemFormProps) {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('Item creation must be done within an AuthWrapper');
  }
  const { loggedUserId } = authContext;

  const defaultFormData: TimelineItemCreateDTO = {
    creator: loggedUserId !== null ? loggedUserId : '',
    timeline: props.timelineId,
    // kind: "",
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    images: [],
    impact: '',
    tags: [],
  };

  const [formData, setFormData] = useState<TimelineItemCreateDTO>(
    props.formType === 'edit' && props.item
      ? { ...props.item }
      : { ...defaultFormData }
  );
  console.log("props.item: ", props.item)
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect while image uploads to cloudinary and URL is generated
  const [startDateValue, setStartDateValue] = useState<Dayjs | null>(
    props.formType === 'edit' && props.item?.startDate
      ? dayjs(props.item.startDate)
      : dayjs()
  );
  const [endDateValue, setEndDateValue] = useState<Dayjs | null>(
    props.formType === 'edit' && props.item?.endDate
      ? dayjs(props.item.endDate)
      : null
  );
  const [oneDayEvent, setOneDayEvent] = useState(
    props.formType === 'edit' && props.item
      ? props.item.startDate === props.item.endDate
      : false
  );
  const [ongoingEvent, setOngoingEvent] = useState( 
    props.formType === 'edit' && props.item?.endDate === ''
  );
  const navigate = useNavigate();
  const [tagsForTimelineItems, setTagsForTimelineItems] = useState<ITag[]>([])
  const [selectedTags, setSelectedTags] = useState<SelectOption[]>(    
    props.formType === 'edit' && props.item && props.item.tags && props.item.tags.length > 0
      ?   props.item.tags.map((tag: ITag) => ({ value: tag.name, label: tag.name, _id: tag._id}))
      : []
    )
  const animatedComponents = makeAnimated();
  const requiredFieldsFilled = formData.title.trim() !== '' && startDateValue !== null;
  const [errorMsgServer, setErrorMsgServer] = useState(""); //state for server error messages

  useEffect(() => {
    getTags()
  }, [])
  const getTags = async () => {
    try {
      const response = await api.get("/tags")
      setTagsForTimelineItems(response.data)
      // console.log("tagsForTimelineItems: ", response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const options: SelectOption[] = tagsForTimelineItems.map((tag) => ({ value: tag.name, label: tag.name, id:tag._id }));

  const datePickerSlotProps = {
      popper: {
          disablePortal: false,              // ensure it portals to <body>
          placement: 'bottom-start',
          modifiers: [
          { name: 'preventOverflow', options: { altBoundary: true, rootBoundary: 'viewport', padding: 8 } },
          { name: 'flip', options: { altBoundary: true } }
          ],
          style: { zIndex: 1800 }            // higher than drawer/content
      },
      textField: { fullWidth: true }
  };
  const handleFormDataChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >
  ) => {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTagsSelection = (newValue: MultiValue<SelectOption>) => {
    setSelectedTags([...newValue]);
  }

  const handleFileUpload = async (file: File) => {
    console.log('The file to be uploaded is: ', file);
    setIsUploading(true); // to start the loading animation
    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append('image', file);
    console.log('The upload data to be passed to Backend is: ', uploadData);

    try {
      const response = await api.post('/upload', uploadData);
      // backend sends the image to the frontend => res.json({ imageUrl: req.file.path });
      console.log('response to POST upload: ', response);
      setIsUploading(false); // to stop the loading animation

      // Return the image URL instead of updating state here
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error while uploading the image: ', error);
      setIsUploading(false); // to stop the loading animation
      if (error instanceof AxiosError) {
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
          setErrorMsgServer(error.response.data.errorMessage || "An error occurred during image upload. Please try again.");
          navigate('/error');
        }
      } else {
        // Handle non-axios errors
        setErrorMsgServer("An unexpected error occurred during image upload. Please try again.");
        navigate('/error');
      }
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    let uploadedImageUrl = null;

    // Wait for file upload to complete before creating the item
    if (file !== null) {
      try {
        uploadedImageUrl = await handleFileUpload(file);
      } catch (error) {
        console.error('Image upload failed:', error);
        return; // Stop submission if image upload fails
      }
    }

    // Build the images array including any newly uploaded image
    const finalImages = uploadedImageUrl
      ? [...formData.images, uploadedImageUrl]
      : formData.images;

    console.log("selectedTags: ", selectedTags)
    const finalTags = selectedTags.map(tag => tag.id ? { _id: tag.id } : { name: tag.value });
    console.log("finalTags: ", finalTags)

    const newItem = {
      ...formData,
      startDate: startDateValue ? startDateValue.format('YYYY-MM-DD') : '',
      endDate: oneDayEvent
        ? startDateValue
          ? startDateValue.format('YYYY-MM-DD')
          : ''
        : ongoingEvent
          ? null // Ongoing events have no end date
          : endDateValue
            ? endDateValue.format('YYYY-MM-DD')
            : '',
      images: finalImages, // Use the final images array
      tags: finalTags,
      impact: 'positive',
    };
    // console.log('new item: ', newItem);

    try {
      const response = await api.post(
        `/timelines/${formData.timeline}/items`,
        newItem
      );
      console.log('Res POST new item: ', response);

      // Call the success callbacks
      props.onRefresh(); // Refresh the timeline items
      props.onSuccess(); // Close the drawer
    } catch (error) {
      console.log('Error response item creation: ', error);
        if (error instanceof AxiosError) {
          console.log("Axios error detected")
          if (error.response && error.response.status >= 400 && error.response.status < 500) {
            setErrorMsgServer(error.response.data.errorMessage);
          }else{
            navigate('/error'); // If it's not a 4xx error, navigate to error page
          }
        } else {
          // Handle non-axios errors
          setErrorMsgServer("An unexpected error occurred. Please try again.");
          navigate('/error');
        }
  };
}

  const handleItemUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    let uploadedImageUrl = formData.images[0];

    // Wait for file upload to complete before creating the item
    if (file !== null) {
      try {
        uploadedImageUrl = await handleFileUpload(file);
      } catch (error) {
        console.error('Image upload failed:', error);
        return; // Stop submission if image upload fails
      }
    }

    // Build the images array including any newly uploaded image
    const finalImages = uploadedImageUrl
      ? [uploadedImageUrl]
      : formData.images;

    const updatedItem = {
      ...formData,
      startDate: startDateValue ? startDateValue.format('YYYY-MM-DD') : '',
      endDate: oneDayEvent
        ? startDateValue
          ? startDateValue.format('YYYY-MM-DD')
          : ''
        : ongoingEvent
          ? '' // Ongoing events have no end date
          : endDateValue
            ? endDateValue.format('YYYY-MM-DD')
            : '',
      images: finalImages, // Use the final images array
      // impact: 'positive',
    };
    console.log('Upadted item: ', updatedItem);
    try {
      const response = await api.put(
        `/timelines/${formData.timeline}/items/${props.item?._id}`,
        updatedItem
      );
      console.log('Res PUT updated item: ', response);

      // Call the success callbacks
      props.onRefresh(); // Refresh the timeline items
      props.onSuccess(); // Close the drawer
    } catch (error) {
      navigate('/error');
    }
  }

  const handleCancel = () => {
    // Call the parent's cancel handler to close the drawer/modal
    props.onCancel();
  };

  return (
    <>
      <FormHeader>
        <Typography gutterBottom variant="h4" component="div">
          {props.formType === 'create' ? '➕ Add a new item' : ' ✒️ Edit item'}
        </Typography>
      </FormHeader>

      <FormContainer>
        <Grid container spacing={3}>
        <FormControl fullWidth>
            <FormLabel htmlFor="title" required sx={responsiveStyles.formLabel}>
              Item title
            </FormLabel>
            <OutlinedInput
              id="title"
              name="title"
              type="name"
              placeholder="Title"
              autoComplete="item title"
              required
              // error={formData.title.trim() === ''}
              fullWidth
              size="small"
              sx={responsiveStyles.formInput}
              value={formData.title}
              onChange={handleFormDataChange}
            />
          {/* </FormGrid> */}
        </FormControl>
          {/* <FormGrid size={{ xs: 12, md: 6 }}> */}

          <FormGrid size={{ xs: 12 }}>
            <FormLabel htmlFor="description" sx={responsiveStyles.formLabel}>
              Description
            </FormLabel>
            <OutlinedInput
              id="description"
              name="description"
              type="description"
              placeholder="Item description"
              autoComplete="description"
              size="small"
              sx={responsiveStyles.formInput}
              multiline
              value={formData.description}
              onChange={handleFormDataChange}
            />
          </FormGrid>
          <FormGrid size={{ xs: 12 }} >
            <FormLabel htmlFor="tags" sx={responsiveStyles.formLabel}>
                Tags
            </FormLabel>
            {/* <OutlinedInput
                id="tags"
                name="tags"
                type="tags"
                placeholder=""
                size="small" //makes the placeholder look closer to the top border of the input
                sx={responsiveStyles.formInput}
                value={formData.tags}
                onChange={handleFormDataChange}
            /> */}
            <CreatableSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options}
              value={selectedTags}
              onChange={handleTagsSelection}
              className="mb-3"
            />
          </FormGrid>

          <FormGrid className=''>
            <FormLabel htmlFor="start-date" required sx={responsiveStyles.formLabel}>
              {oneDayEvent ? 'Date' : ongoingEvent ? 'Start Date (ongoing)' : 'Start Date'}
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                // label="Start date"
                name="startDate"
                value={startDateValue}
                onChange={(newValue) => setStartDateValue(newValue)}
                // onChange={handleFormDataChange}
                slotProps={{ textField: { fullWidth: true, id: 'start-date', size:'small' } }}
              />
            </LocalizationProvider>
          </FormGrid>

          {!oneDayEvent && !ongoingEvent && (
            <FormGrid>
              <FormLabel htmlFor="end-date" required sx={responsiveStyles.formLabel}>
                End Date
              </FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // label="End date"
                  name="EndDate"
                  value={endDateValue}
                  onChange={(newValue) => setEndDateValue(newValue)}
                  slotProps={{ textField: { fullWidth: true, id: 'end-date', size:'small' } }}
                // sx={allDayEvent ? { display: "inline-block" } : { display: "none" }}
                />
              </LocalizationProvider>
            </FormGrid>
          )}
          <FormGrid className='items-left ml-[3px]'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={oneDayEvent}
                  onChange={(_event, checked) => {
                    setOneDayEvent(checked);
                    if (checked) setOngoingEvent(false); // Can't be both one-day and ongoing
                  }}
                />
              }
              label="One day event"
              sx={{
                '& .MuiFormControlLabel-label': responsiveStyles.formLabel
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={ongoingEvent}
                  onChange={(_event, checked) => {
                    setOngoingEvent(checked);
                    if (checked) setOneDayEvent(false); // Can't be both ongoing and one-day
                  }}
                />
              }
              label="Ongoing event (no end date yet)"
              sx={{
                '& .MuiFormControlLabel-label': responsiveStyles.formLabel,
                alignSelf: 'flex-end'
              }}
            />
          </FormGrid>

          {/* Image uploader */}
          <FormGrid size={{ xs: 12 }}>
            <ImageUploader onFileSelect={setFile} imageTimelineItem={props.item?.images[0]} />
          </FormGrid>
        </Grid>

        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            // marginTop: { xs: 2, sm: 5, md: 10 },
          }}
          className=''
        >
          <Button
            variant="outlined"
            type="button"
            size="medium"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            // disabled={!requiredFieldsFilled || isUploading}
            variant="contained"
            type="submit"
            size="medium"
            onClick={props.formType === "create" ? handleSubmit : handleItemUpdate}
            loading={isUploading}
          >
            {props.formType === 'create' ? 'Create item' : 'Save changes'}
          </Button>
        </Box>
        {errorMsgServer !== "" && (
            <Alert 
            severity="error"
            onClose={() => setErrorMsgServer("")}
            >
            An error occurred in the item creation. {errorMsgServer}. Please verify the fields and try again.
            </Alert>
        )}
      </FormContainer>
    </>
  );
}
