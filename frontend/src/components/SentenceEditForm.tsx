import {
  VStack,
  Input,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  ButtonGroup,
  SlideFade,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { ISentence } from '../interfaces/sentence-with-input';
import { GrEdit } from 'react-icons/gr';
import { useEffect } from 'react';

interface ISentenceEditFormProps {
  sentence: ISentence;
}

export const SentenceEditForm = (
  props: ISentenceEditFormProps
): JSX.Element => {
  const { sentence } = props;
  const isEditButtonVisible = useDisclosure();
  const isFormOpen = useDisclosure();

  return (
    <>
      <HStack
        onMouseEnter={isEditButtonVisible.onOpen}
        onMouseLeave={isEditButtonVisible.onClose}
        minH={'32px'}
      >
        <IconButton
          display={'flex'}
          aria-label=""
          icon={<GrEdit />}
          size={'xs'}
          visibility={isEditButtonVisible.isOpen ? 'visible' : 'hidden'}
          variant={'unstyled'}
          onClick={isFormOpen.onToggle}
        />
        <Text>{sentence.sentence}</Text>
      </HStack>
      <SlideFade in={isFormOpen.isOpen}>
        <VStack
          display={isFormOpen.isOpen ? 'flex' : 'none'}
          paddingLeft={'calc(24px + 0.5rem)'}
        >
          {' '}
          <FormControl>
            <FormLabel>Sentence</FormLabel>
            <Input
              type="text"
              placeholder="sentence"
              colorScheme="secondary"
              defaultValue={sentence.sentence}
              size={'sm'}
              borderRadius={'40px'}
            />
            <FormLabel>Hint</FormLabel>
            <Input
              type="text"
              placeholder="hint"
              defaultValue={sentence.hint}
              size={'sm'}
              w={'min-content'}
              borderRadius={'40px'}
            />
            <FormLabel>Answer</FormLabel>
            <Input
              type="text"
              placeholder="answer"
              defaultValue={sentence.answer}
              size={'sm'}
              w={'min-content'}
              borderRadius={'40px'}
            />
          </FormControl>
          <ButtonGroup justifyContent={"center"}>
            <FormLabel>Options</FormLabel>
            {sentence.options?.map((option, index) => {
              return (
                <Input
                  type="text"
                  size={'sm'}
                  borderRadius={'40px'}
                  placeholder="option"
                  defaultValue={option}
                  key={`${option}option${index}`}
                />
              );
            })}
          </ButtonGroup>
        </VStack>
      </SlideFade>
    </>
  );
};
