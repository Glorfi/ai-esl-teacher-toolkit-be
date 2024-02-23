import { Box, HStack, Text } from '@chakra-ui/react';
import ExerciseForm from '../../components/ExerciseForm';
import { SideBarMenu } from '../../components/SideBar/SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { IExercise } from '../../interfaces/exercise';
import { ExerciseSentenceInput } from '../../components/ExerciseSentenceInput';
import { useDeleteExerciseMutation } from '../../store/main-api/mutations/deleteExercise';
import { APP_PATHS } from '../../constants/AppPaths';
import { ExerciseSelectInput } from '../../components/ExerciseSelectInput';
import { useGetExerciseByIdQuery } from '../../store/main-api/queries/getExerciseById';
import { LSHandler } from '../../utils/handleLocalStorage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const DashboardExercisePage = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ex, setEx] = useState<IExercise | null | undefined>(null);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const exerciseList = useSelector((state: RootState) => state.exerciseList);

  const [_, { data: deletedEx }] = useDeleteExerciseMutation({
    fixedCacheKey: 'deleteEx',
  });

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
        <SideBarMenu />
        <HStack
          minH={'100vh'}
          alignItems={'center'}
          w={'100%'}
          justifyContent={'center'}
        >
          {isNotFound ? (
            <Text>Ooops! Seems The exercise isn't found</Text>
          ) : null}
          {ex?.type === 'fillInGaps' ? (
            <ExerciseSentenceInput sentenceList={ex.sentenceList} />
          ) : null}
          {ex?.type === 'multipleChoice' ? (
            <ExerciseSelectInput sentenceList={ex.sentenceList} />
          ) : null}
        </HStack>
      </HStack>
    </Box>
  );
};
