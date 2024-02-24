import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Link as ChakraLink,
  HStack,
  LinkProps,
  useConst,
} from '@chakra-ui/react';
import { APP_PATHS } from '../constants/AppPaths';
import { MobileMenu } from './MobileMenu';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const Header = (): JSX.Element => {
  const [userData, _] = useContext(UserContext);
  return (
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
      {!userData ? (
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
      ) : null}
    </HStack>
  );
};
