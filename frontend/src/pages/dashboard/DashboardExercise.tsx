import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { SideBarMenu } from '../../components/SideBar/SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IExercise } from '../../interfaces/exercise';
import { ExerciseSentenceInput } from '../../components/ExerciseSentenceInput';
import { useDeleteExerciseMutation } from '../../store/main-api/mutations/deleteExercise';
import { APP_PATHS } from '../../constants/AppPaths';
import { ExerciseSelectInput } from '../../components/ExerciseSelectInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { MobileMenuDashBoard } from '../../components/MobileMenuDashboard';
import { ExerciseEditForm } from '../../components/ExerciseEditForm';

export const DashboardExercisePage = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ex, setEx] = useState<IExercise | null | undefined>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);

  const exerciseList = useSelector((state: RootState) => state.exerciseList);

  const [_, { data: deletedEx }] = useDeleteExerciseMutation({
    fixedCacheKey: 'deleteEx',
  });

  function toggleSideBar() {
    setIsSideBarOpen(!isSideBarOpen);
  }

  useEffect(() => {
    if (deletedEx?._id === id) {
      navigate(APP_PATHS.DASHBOARD);
    }
  }, [deletedEx]);

  useEffect(() => {
    const currentEx = exerciseList.find((item) => item._id === id);
    console.log(currentEx);
    if (!currentEx) {
      setIsNotFound(true);
      setEx(null);
      return;
    }
    setIsNotFound(false);
    setEx(currentEx);
  }, [exerciseList, id]);

  return (
    <Box minH={'100vh'}>
      <HStack alignItems={'flex-start'}>
        <SideBarMenu isOpen={isSideBarOpen} onToggle={toggleSideBar} />
        <HStack
          marginLeft={'auto'}
          flexDirection={['column', 'row']}
          minH={'100vh'}
          alignItems={['flex-start']}
          w={isSideBarOpen ? 'calc(100% - 320px)' : '100%'}
          justifyContent={['flex-start', 'center']}
          padding={['20px', '0']}
        >
          <Tabs
            mt={'40px'}
            isFitted
            variant="enclosed"
            size="md"
            minW={'600px'}
            colorScheme="secondary"
          >
            <TabList>
              <Tab>Edit</Tab>
              <Tab>Preview</Tab>
            </TabList>
            <TabPanels w={'100%'} minW={'600px'} maxW={'600px'}>
              <TabPanel p={0} borderTop={'none'}>
                {ex ? <ExerciseEditForm exercise={ex} /> : null}
              </TabPanel>
              <TabPanel p={0} borderTop={'none'}>
                {isNotFound ? (
                  <Text>Ooops! Seems The exercise isn't found</Text>
                ) : null}
                {ex?.type === 'fillInGaps' ? (
                  <ExerciseSentenceInput sentenceList={ex.sentenceList} />
                ) : null}
                {ex?.type === 'multipleChoice' ? (
                  <ExerciseSelectInput sentenceList={ex.sentenceList} />
                ) : null}
              </TabPanel>
            </TabPanels>
          </Tabs>
          <MobileMenuDashBoard />
        </HStack>
      </HStack>
    </Box>
  );
};
