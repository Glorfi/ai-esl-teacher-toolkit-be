import { Box, HStack, Text } from '@chakra-ui/react';
import { ExerciseSelectInput } from '../../components/ExerciseSelectInput';
import { ExerciseSentenceInput } from '../../components/ExerciseSentenceInput';
import { SideBarMenu } from '../../components/SideBar/SideBar';
import { useGetExerciseByIdQuery } from '../../store/main-api/queries/getExerciseById';
import { useParams } from 'react-router-dom';
import { LSHandler } from '../../utils/handleLocalStorage';

export const SharedExercisePage = (): JSX.Element => {
  const { id } = useParams();
  const token = LSHandler.getJwt();
  const { data: ex, isError } = useGetExerciseByIdQuery({ token, id });

  return (
    <Box minH={'100vh'} bgColor={'white'}>
      <HStack alignItems={'flex-start'}>
        <HStack alignItems={'center'} w={'100%'} justifyContent={'center'}>
          {isError ? <Text>Ooops! Seems The exercise isn't found</Text> : null}
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
