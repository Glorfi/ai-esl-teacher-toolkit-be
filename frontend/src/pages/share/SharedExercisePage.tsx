import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { ExerciseSelectInput } from '../../components/ExerciseSelectInput';
import { ExerciseSentenceInput } from '../../components/ExerciseSentenceInput';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { useGetExerciseByIdQuery } from '../../store/main-api/queries/getExerciseById';
import { useParams } from 'react-router-dom';
import { LSHandler } from '../../utils/handleLocalStorage';
import { APP_PATHS } from '../../constants/AppPaths';

export const SharedExercisePage = (): JSX.Element => {
  const { id } = useParams();
  const token = LSHandler.getJwt();
  const { data: ex, isError } = useGetExerciseByIdQuery({ token, id });

  return (
    <Box 
  //  minH={'100vh'} 
    bgColor={'white'} padding={'0 20px'}>
      <VStack
        alignItems={'flex-start'}
        w={'100%'}
        justifyContent={'center'}
        maxW={'800px'}
        margin={'auto'}
        mt={'40px'}
      >
        {ex?.title ? (
          <Text color={'primary'} fontWeight={'bold'} fontSize={'x-large'}>
            {ex?.title}
          </Text>
        ) : null}
        {isError ? <Text>Ooops! Seems The exercise isn't found</Text> : null}
        {ex?.type === 'fillInGaps' ? (
          <ExerciseSentenceInput
            sentenceList={ex.sentenceList}
            taskDescription={ex.taskDescription}
          />
        ) : null}
        {ex?.type === 'multipleChoice' ? (
          <ExerciseSelectInput
            sentenceList={ex.sentenceList}
            taskDescription={ex.taskDescription}
          />
        ) : null}
        <Text
          fontSize={'12px'}
          alignSelf={'flex-end'}
          color={'highlight.base'}
          fontWeight={'light'}
        >
          Powered by{' '}
          <ChakraLink
            as={ReactRouterLink}
            to={APP_PATHS.MAIN}
            fontSize={'12px'}
            // color="highlight.base"
            fontWeight={'medium'}
          >
            AI ESL teacher toolkit
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
};
