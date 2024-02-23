import {
  RadioGroup,
  HStack,
  Radio,
  Card,
  CardBody,
  CardFooter,
  Button,
  Text,
  Input,
  VStack,
  Select,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCompleteChatMutation } from '../store/gpt-api/gpt.api';
import { useGeneratePrompt } from '../utils/generatePrompt';
import { LEARNER_AGE, LEARNER_LEVEL } from '../constants/prompt';
import { useDispatch } from 'react-redux';
import { addValues } from '../store/exercise-form/exercise-form-router';
import { ISentence } from '../interfaces/sentence-with-input';
import { useCreateExerciseMutation } from '../store/main-api/mutations/createExercise';
import { LSHandler } from '../utils/handleLocalStorage';
import { UserContext } from '../contexts/UserContext';
import { addExercise } from '../store/exerciseList/exercise-list-router';

interface IFormValues {
  skill: 'grammar' | 'vocabulary' | string;
  taskType: string;
  wordList: string;
  learnerLevel: string;
  learnerAge: string;
}

function ExerciseForm() {
  const [formValues, setFormValues] = useState<IFormValues>({
    skill: '',
    taskType: '',
    wordList: '',
    learnerLevel: '', // LEARNER_LEVEL.B1,
    learnerAge: '', // LEARNER_AGE.adults,
  });
  const [parsedData, setParsedData] = useState<ISentence[] | null>(null);
  const [isCreated, setIsFetched] = useState<boolean>(false);
  const dispatch = useDispatch();
  const token = LSHandler.getJwt();

  const [sendMessage, { isLoading, isSuccess, data }] = useCompleteChatMutation(
    {
      fixedCacheKey: 'shared-AI-answer',
    }
  );
  const [
    createExercise,
    {
      isLoading: isCreatingLoading,
      isSuccess: isCreatingSuccess,
      data: createdExercise,
    },
  ] = useCreateExerciseMutation();

  function handleSendMessage() {
    dispatch(addValues(formValues));
    sendMessage({ content: prompt });
  }
  const prompt = useGeneratePrompt(
    formValues.skill,
    formValues.taskType,
    formValues.wordList,
    formValues.learnerLevel,
    formValues.learnerAge
  );

  useEffect(() => {
    console.log(prompt);
  }, [prompt, formValues]);

  useEffect(() => {
    if (isSuccess && data && !parsedData) {
      setParsedData(JSON.parse(data.choices[0].message.content));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (parsedData) {
      console.log(parsedData);
      const isSetnteceListValid = parsedData.every((item) =>
        item.sentence.includes(item.answer)
      );
      console.log(isSetnteceListValid);
      if (!isSetnteceListValid) {
        handleSendMessage();
        setParsedData(null);
      } else {
        createExercise({
          token,
          body: {
            sentenceList: parsedData,
            skill: formValues.skill,
            type: formValues.taskType,
          },
        });
      }
    }
  }, [parsedData]);

  useEffect(() => {
    if (createdExercise) {
      dispatch(addExercise(createdExercise));
    }
  }, [createdExercise]);

  useEffect(() => {
    // Сброс parsedData при монтировании компонента
    setParsedData(null);
  }, []);

  return (
    <Card bgColor={'background'}>
      <CardBody display="flex" gap={'8px'} flexDirection={'column'}>
        <Text fontSize={'lg'}>Choose the skill:</Text>
        <RadioGroup
          name="skill"
          value={formValues.skill}
          onChange={(value) => setFormValues({ ...formValues, skill: value })}
        >
          <HStack>
            <Radio value="vocabulary">Vocabulary</Radio>
            <Radio value="grammar" isDisabled>
              Grammar
            </Radio>
            <Radio value="reading" isDisabled>
              Reading
            </Radio>
          </HStack>
        </RadioGroup>
        <Text fontSize={'lg'}>Type of exercise</Text>
        <RadioGroup
          name="task-type"
          value={formValues.taskType}
          onChange={(value) =>
            setFormValues({ ...formValues, taskType: value })
          }
        >
          <HStack>
            <Radio value="fillInGaps">Fill-in-gaps</Radio>
            <Radio value="multipleChoice">Multiple Choice</Radio>
            <Radio value="reading" isDisabled>
              Guessing the meaning
            </Radio>
          </HStack>
        </RadioGroup>
        <VStack alignItems={'flex-start'} spacing={0}>
          <Text fontSize={'lg'}>Words to practice</Text>
          <Text fontSize={'2xs'}>type words separeted by comas</Text>
        </VStack>
        <Input
          type="text"
          colorScheme="telegram"
          onChange={(e) =>
            setFormValues({ ...formValues, wordList: e.target.value })
          }
        />
        <Text fontSize={'lg'}>Learner's level</Text>
        <Select
          defaultValue={'B1'}
          onChange={(e) =>
            setFormValues({ ...formValues, learnerLevel: e.target.value })
          }
        >
          <option value={'A1'}>Beginner A1</option>
          <option value={'A2'}>Elementary A2</option>
          <option value={'B1'}>Intermediate B1</option>
          <option value={'B2'}>Upper-Intermediate B2</option>
          <option value={'C1'}>Advanced C1</option>
        </Select>
        <Text fontSize={'lg'}>Learner's age</Text>
        <Select
          defaultValue={'adults'}
          onChange={(e) =>
            setFormValues({ ...formValues, learnerAge: e.target.value })
          }
        >
          <option value={'children'}>Children 7-12 y.o.</option>
          <option value={'teenagers'}>Teenagers 13-20 y.o.</option>
          <option value={'adults'}>Adults 20+ y.o</option>
        </Select>
      </CardBody>
      <CardFooter justifyContent={'center'}>
        {' '}
        <Tooltip
          hasArrow
          label="It might take 5-10 seconds"
          placement={'top'}
          display={isLoading ? 'block' : 'none'}
        >
          <Button
            variant={'outline'}
            colorScheme={'telegram'}
            onClick={handleSendMessage}
            isLoading={isLoading}
            loadingText={'Generating...'}
          >
            Generate the exericse!
          </Button>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

export default ExerciseForm;
