import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  ButtonGroup,
  Input,
} from '@chakra-ui/react';
import { IExercise } from '../interfaces/exercise';
import { SentenceEditForm } from './SentenceEditForm';

interface IExerciseEditForm {
  exercise: IExercise;
}

export const ExerciseEditForm = (props: IExerciseEditForm) => {
  const { exercise } = props;

  return (
    <Card>
      <CardHeader p={'20px 20px 0'}>
        <Input
          type="text"
          color={'primary'}
          fontWeight={'bold'}
          variant={'unstyled'}
          placeholder="Enter the title of your exercise"
        />
        <Input
          type="text"
          color={'primary'}
          fontWeight={'bold'}
          variant={'unstyled'}
          placeholder="Enter the task Description"
        />
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
