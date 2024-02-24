import { Box, HStack, Text } from '@chakra-ui/react';
import ExerciseForm from '../../components/ExerciseForm';
import { SideBarMenu } from '../../components/SideBar/SideBar';
import { MobileMenuDashBoard } from '../../components/MobileMenuDashboard';

export const DashboardPage = (): JSX.Element => {
  return (
    <Box minH={'100vh'}>
      <HStack alignItems={'flex-start'}>
        <SideBarMenu />
        <HStack
          flexDirection={['column', 'row']}
          minH={'100vh'}
          alignItems={['flex-start', 'center']}
          w={'100%'}
          justifyContent={['flex-start', 'center']}
          padding={['20px', '0']}
        >
          <MobileMenuDashBoard />
          <ExerciseForm />
        </HStack>
      </HStack>
    </Box>
  );
};
