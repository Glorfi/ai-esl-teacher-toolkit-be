import { Box, HStack, Text } from '@chakra-ui/react';
import ExerciseForm from '../../components/ExerciseForm';
import { SideBarMenu } from '../../components/SideBar/SideBar';

export const DashboardPage = (): JSX.Element => {
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
          <ExerciseForm />
        </HStack>
      </HStack>
    </Box>
  );
};
