import './sideBar.css';
import {
  HStack,
  VStack,
  IconButton,
  Box,
  useDisclosure,
  Text,
  Button,
  Link,
} from '@chakra-ui/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { PiNotePencil } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import { ExerciseThumbnail } from '../SideBarExerciseThumbnail';
import { UserContext } from '../../contexts/UserContext';
import { Link as ReactRouterLink } from 'react-router-dom';
import { APP_PATHS } from '../../constants/AppPaths';
import { LSHandler } from '../../utils/handleLocalStorage';
import { IExercise } from '../../interfaces/exercise';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';

interface ISideBarMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SideBarMenu = (props: ISideBarMenuProps): JSX.Element => {
  const jwt = LSHandler.getJwt();
  const { isOpen, onToggle } = props;
  const [userData, setUserData] = useContext(UserContext);
  const newExList = useSelector((state: RootState) => state.exerciseList);
  const dispatch = useDispatch();

  const exercisesToDisplay: IExercise[] = useMemo(() => {
    const exsSorted = [...newExList].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    console.log('Sorting');
    return exsSorted;
  }, [newExList]);

  return (
    <HStack gap={0} display={['none', 'flex']} position={'fixed'}>
      <Box
        display={['none', 'flex']}
        minH={'100vh'}
        height={'100%'}
        bgColor={'primary'}
        className={`sliderMenu ${
          isOpen ? 'sliderMenu_isOpened' : 'sliderMenu_isClosed'
        }`}
      >
        {isOpen ? (
          <VStack p={'20px'} minH={'100vh'}>
            <Link as={ReactRouterLink} to={APP_PATHS.DASHBOARD} w={'100%'}>
              <Button
                w={'100%'}
                rightIcon={<PiNotePencil />}
                variant={'ghost'}
                colorScheme={'whiteOpacity'}
                justifyContent={'space-between'}
                fontWeight={600}
                size={'lg'}
                fontSize={'16px'}
                padding={'0 16px'}
              >
                Create Exercise
              </Button>
            </Link>
            <Text
              fontSize={'14px'}
              color={'background'}
              fontWeight={'medium'}
              textAlign={'left'}
              w={'100%'}
              padding={'0 16px'}
            >
              Recent exercises:
            </Text>
            <VStack
              maxH={'calc(100vh - 174px)'}
              overflowY={'scroll'}
              className="thumbnailStack"
              w={'100%'}
            >
              {exercisesToDisplay?.map((ex) => {
                return <ExerciseThumbnail data={ex} key={ex._id} />;
              })}
            </VStack>
            <HStack
              w={'100%'}
              as={'article'}
              justifyContent={'space-between'}
              minH={'max-content'}
              padding={'8px 12px 8px 16px'}
              _hover={{ backgroundColor: 'whiteOpacity.50' }}
              cursor={'pointer'}
              borderRadius={'0.375rem'}
              mt={'auto'}
            >
              <Text
                fontSize={'16px'}
                color={'background'}
                fontWeight={'semibold'}
              >
                {userData?.email}
              </Text>
            </HStack>
          </VStack>
        ) : null}
      </Box>
      <IconButton
        onClick={onToggle}
        variant={'ghost'}
        borderRadius={'0'}
        minW={'20px'}
        p={0}
        minH={'100vh'}
        aria-label=""
        icon={
          <IoIosArrowForward
            className={`slidemenuButton ${
              isOpen ? 'slidemenuButton_isOpen' : null
            }`}
          />
        }
      ></IconButton>
    </HStack>
  );
};
