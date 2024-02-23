import {
  HStack,
  VStack,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from '@chakra-ui/react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IExercise } from '../interfaces/exercise';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_PATHS } from '../constants/AppPaths';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ExThumbnailButton } from './ExThumbNailButton';
import { ExThumbnailMenu } from './ExThumbnailMenu';

interface IExerciseThumbnailProps {
  data: IExercise;
}

export const ExerciseThumbnail = (
  props: IExerciseThumbnailProps
): JSX.Element => {
  const navigate = useNavigate();
  const { data } = props;
  const keywords = data.sentenceList.map((item) => {
    return item.answer;
  });
  const typeMap = {
    fillInGaps: 'Fill-in-gaps',
    multipleChoice: 'Multiple choice',
  };
  const type = typeMap[data.type];
  const redirectPath = APP_PATHS.DASHBOARD_EXERCISE.replace('/:id', '/');

  function handleThumbnailClick(e: any) {
    if (e.target.classList.contains('thumbNailButton')) {
      return;
    }
    navigate(`${redirectPath}${data._id}`);
  }

  return (
    <HStack
      w={'100%'}
      as={'article'}
      justifyContent={'space-between'}
      minH={'max-content'}
      padding={'8px 12px 8px 16px'}
      _hover={{ backgroundColor: 'whiteOpacity.50' }}
      cursor={'pointer'}
      borderRadius={'0.375rem'}
      onClick={handleThumbnailClick}
    >
      <VStack>
        <HStack width={'100%'}>
          <Text fontSize={'12px'} color={'background'} fontWeight={'light'}>
            Keywords:
          </Text>
          <Text
            fontSize={'12px'}
            color={'background'}
            fontWeight={'semibold'}
            noOfLines={1}
          >
            {keywords.join(', ')}
          </Text>
        </HStack>
        <HStack w={'100%'}>
          <Text fontSize={'12px'} color={'background'} fontWeight={'light'}>
            Skill:
          </Text>
          <Text
            fontSize={'12px'}
            color={'background'}
            fontWeight={'semibold'}
            noOfLines={1}
          >
            {data.skill}
          </Text>
          <Text fontSize={'12px'} color={'background'} fontWeight={'light'}>
            Type:
          </Text>
          <Text
            fontSize={'12px'}
            color={'background'}
            fontWeight={'semibold'}
            noOfLines={1}
          >
            {type}
          </Text>
        </HStack>
      </VStack>
      <ExThumbnailMenu exData={data} />
    </HStack>
  );
};
