import {
  VStack,
  Text,
  HStack,
  ButtonGroup,
  Button,
  textDecoration,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ExerciseForm from '../../components/ExerciseForm';
import { ExerciseSelectInput } from '../../components/ExerciseSelectInput';
import { ExerciseSentenceInput } from '../../components/ExerciseSentenceInput';
import { ISentence } from '../../interfaces/sentence-with-input';
import { useCompleteChatMutation } from '../../store/gpt-api/gpt.api';
import { RootState } from '../../store/store';
import { APP_PATHS } from '../../constants/AppPaths';
import { MobileMenu } from '../../components/MobileMenu';

export const MainPage = (): JSX.Element => {
  const [sendMessage, { isSuccess, isLoading, data }] = useCompleteChatMutation(
    { fixedCacheKey: 'shared-AI-answer' }
  );
  const [parsedData, setParsedData] = useState<ISentence[]>([
    {
      sentence: '',
      answer: '',
      hint: '',
      options: [],
    },
  ]);

  const formData = useSelector((state: RootState) => state.exerciseForm);

  function handleSendMessage() {
    sendMessage({
      content: `You are a tutor creating a vocabulary worksheet. The sentences will provide vocabulary practice.
    Compose sentences to practice the following words and phrases:
    exhausted, pleased, furious, stressed, upset, guilty, in a good mood, a bit down, pleasantly surprised, fed up
    The sentence should be appropriate for the intermediate B1 level.
    The learners are adults from 25 to 50 years old.
    The sentences should use casual language.
    In your reply write nothing else but the sentence.`,
    }).then((res) => {
      console.log(res);
    });
  }

  useEffect(() => {
    if (isSuccess && data) {
      setParsedData(JSON.parse(data.choices[0].message.content));
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <VStack
      minHeight={'100vh'}
      m={'0 auto'}
      maxW={'800px'}
      padding={['0 20px', '0 20px', '0 20px', '0']}
    >
      <HStack
        justifyContent={'space-between'}
        w={'100%'}
        margin={'16px 0 0 0'}
        color={'highlight.base'}
      >
        <ButtonGroup display={['none', 'inline-flex']}>
          <ChakraLink
            as={ReactRouterLink}
            to={APP_PATHS.MAIN}
            color={'secondary.base'}
            border={'1px solid transparent'}
            _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
          >
            Home
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to={APP_PATHS.DASHBOARD}
            color={'secondary.base'}
            border={'1px solid transparent'}
            _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
          >
            Dashboard
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to={'#'}
            color={'secondary.base'}
            border={'1px solid transparent'}
            _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
          >
            Profile
          </ChakraLink>
        </ButtonGroup>
        <MobileMenu />
        <ButtonGroup alignItems={'center'}>
          <ChakraLink
            as={ReactRouterLink}
            to={APP_PATHS.SIGN_IN}
            color={'secondary.base'}
            border={'1px solid transparent'}
            _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
          >
            Sign In
          </ChakraLink>
          <ChakraLink as={ReactRouterLink} to={APP_PATHS.SIGN_UP}>
            <Button
              variant={'ghost'}
              colorScheme="secondary"
              borderRadius={'40px'}
            >
              SIGN UP
            </Button>
          </ChakraLink>
        </ButtonGroup>
      </HStack>
      <VStack
        gap={0}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        mt={'80px'}
        w={'100%'}
      >
        <Text color={'primary'} fontSize={'24px'}>
          Welcome to
        </Text>
        <Text
          as="h1"
          color={'primary'}
          fontSize={'80px'}
          fontWeight={'bold'}
          lineHeight={'80px'}
        >
          ESL Teacher ToolKit
        </Text>
      </VStack>
      {isSuccess && parsedData && formData.taskType === 'fillInGaps' ? (
        <ExerciseSentenceInput sentenceList={parsedData} />
      ) : null}
      {isSuccess && parsedData && formData.taskType === 'multipleChoice' ? (
        <ExerciseSelectInput sentenceList={parsedData} />
      ) : null}
      {/* <ExerciseSentenceInput sentenceList={sampleData2} />
      <ExerciseSelectInput sentenceList={sampleDataSelect}/> */}
    </VStack>
  );
};
