import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { APP_PATHS } from '../constants/AppPaths';
import { HamburgerIcon } from '@chakra-ui/icons';

export const MobileMenu = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton
        aria-label=""
        colorScheme="secondary"
        variant={'outline'}
        borderRadius={'40px'}
        onClick={onOpen}
        icon={<HamburgerIcon />}
        display={['inline-flex', 'none']}
      />

      <Drawer isOpen={isOpen} placement="top" onClose={onClose} size={'lg'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody
            display="flex"
            flexDirection={'column'}
            // justifyContent={'space-evenly'}
            alignItems={'center'}
            gap={'16px'}
            padding={'8px 24px 24px'}
          >
            <ChakraLink
              as={ReactRouterLink}
              to={APP_PATHS.MAIN}
              color={'secondary.base'}
              border={'1px solid transparent'}
              _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
              fontSize={'24px'}
            >
              Home
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to={APP_PATHS.DASHBOARD}
              color={'secondary.base'}
              border={'1px solid transparent'}
              _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
              fontSize={'24px'}
            >
              Dashboard
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to={'#'}
              color={'secondary.base'}
              border={'1px solid transparent'}
              _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
              fontSize={'24px'}
            >
              Profile
            </ChakraLink>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
