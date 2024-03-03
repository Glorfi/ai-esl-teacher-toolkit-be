import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  ButtonGroup,
  Input,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react';
import { IExercise } from '../interfaces/exercise';
import { SentenceEditForm } from './SentenceEditForm';
import { useEffect, useState } from 'react';

interface IExerciseEditForm {
  exercise: IExercise;
}

export const ExerciseEditForm = (props: IExerciseEditForm) => {
  const { exercise } = props;
  const [exData, setExData] = useState<IExercise>(exercise);

  useEffect(() => {
    setExData(exercise);
  }, [exercise]);

  return (
    <Card>
      <CardHeader p={'20px 20px 0'}>
        <Editable
          key={`${exData._id}_title`}
          defaultValue={exData.title ? exData.title : 'Enter the task title'}
          fontWeight={'bold'}
          fontSize={'x-large'}
          color={'primary'}
        >
          <EditablePreview />
          <EditableInput _focusVisible={{ style: { boxShadow: 'none' } }} />
        </Editable>
        <Editable
          defaultValue="Enter the task description"
          fontSize={'16px'}
          fontWeight={'bold'}
          color={'primary'}
          key={`${exData._id}_description`}
        >
          <EditablePreview />
          <EditableInput _focusVisible={{ style: { boxShadow: 'none' } }} />
        </Editable>
      </CardHeader>
      <CardBody display={'flex'} flexDirection={'column'}>
        {exercise.sentenceList.map((item, index) => {
          return (
            <SentenceEditForm
              sentence={item}
              key={`${item._id}editform-${index}`}
            />
          );
        })}
      </CardBody>
      <CardFooter
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <ButtonGroup>
          {/* <Button
            colorScheme={'highlight'}
            size={'sm'}
            variant={'outline'}
            onClick={() => setIsCheckActive(true)}
            rightIcon={<IoMdCheckmarkCircleOutline />}
          >
            Check Answers
          </Button>
          <Button
            rightIcon={<GrPowerReset />}
            colorScheme={'highlight'}
            size={'sm'}
            variant={'outline'}
            onClick={() => setIsCheckActive(false)}
            aria-label={''}
          >
            Reset Checking
          </Button> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
