import circle from '../../assets/signin-elipse.svg';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';

import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { APP_PATHS } from '../../constants/AppPaths';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import validator from 'validator';
import { useDebounce } from '../../utils/useDebounce';
import { customError } from '../../interfaces/customError';
import { LSHandler } from '../../utils/handleLocalStorage';
import { useSignInMutation } from '../../store/main-api/mutations/signin';
import { UserContext } from '../../contexts/UserContext';
import { useLazyGetCurrentUserQuery } from '../../store/main-api/queries/auth';

interface ISignInForm {
  email: string;
  password: string;
}

interface IFormValid {
  isEmailValid: boolean | null;
  isPasswordValid: boolean | null;
}

const SignInPage = (): JSX.Element => {
  const [userData, setUserData] = useContext(UserContext);
  const [formValues, setFormValues] = useState<ISignInForm>({
    email: '',
    password: '',
  });

  const [isFormValid, setIsFormValid] = useState<IFormValid>({
    isEmailValid: null,
    isPasswordValid: null,
  });

  const [getUser, { data: usData, isLoading }] = useLazyGetCurrentUserQuery();

  const debounceEmail = useDebounce(formValues.email, 1000);
  const debouncePassword = useDebounce(formValues.password, 1000);

  const [signIn, { data, isSuccess, isError, error }] = useSignInMutation();
  const toast = useToast();

  const navigate = useNavigate();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = formValues;
    signIn({ email, password });
  }

  useEffect(() => {
    debounceEmail.length > 4
      ? setIsFormValid({
          ...isFormValid,
          isEmailValid: validator.isEmail(debounceEmail),
        })
      : setIsFormValid({
          ...isFormValid,
          isEmailValid: null,
        });
  }, [debounceEmail]);

  useEffect(() => {
    debouncePassword.length > 1
      ? setIsFormValid({
          ...isFormValid,
          isPasswordValid: validator.isLength(debouncePassword, {
            min: 4,
            max: 10,
          }),
        })
      : setIsFormValid({
          ...isFormValid,
          isPasswordValid: null,
        });
  }, [debouncePassword]);

  useEffect(() => {
    if (data) {
      LSHandler.setJwt(data.jwt);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      const customError = error as customError;
      const { code, message } = customError.data;
      toast({
        title: message,
        status: 'error',
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [error]);

  useEffect(() => {
    if (data && isSuccess) {
      toast({
        title: `You're logged in! Redirecting...`,
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
      getUser(data.jwt)
        .then(() => {
          setUserData(usData);
        })
        .then(() => navigate(APP_PATHS.DASHBOARD));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (userData) {
      navigate(APP_PATHS.DASHBOARD);
    }
  }, [userData]);

  return (
    <Stack minH={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <Card
        w={'100%'}
        maxW={['unset', '352px']}
        bgColor={'background'}
        position={'relative'}
      >
        <Image src={circle} maxW={'233px'} zIndex={'0'} position={'absolute'} />
        <CardBody position={'relative'}>
          <Text
            color={'primary'}
            fontSize={'36px'}
            fontWeight={900}
            maxW={'228px'}
            lineHeight={'43px'}
          >
            Welcome Back
          </Text>
          <Box
            as="form"
            mt={'48px'}
            display={'flex'}
            flexDir={'column'}
            action="none"
            id="signinform"
            onSubmit={handleSubmit}
          >
            <FormControl
              minH={'88px'}
              isInvalid={
                isFormValid.isEmailValid === false &&
                formValues.email.length != 0
                  ? true
                  : false
              }
            >
              <Input
                minH={'60px'}
                type="email"
                name="email"
                fontSize={'18px'}
                placeholder="Email"
                colorScheme="secondary"
                borderRadius={'20px'}
                _placeholder={{ color: 'secondary.base' }}
                bgColor={'gray.200'}
                color={'primary'}
                onChange={handleInputChange}
                isInvalid={isFormValid.isEmailValid === false ? true : false}
              />
              <FormErrorMessage padding={'0 16px'}>
                Enter Valid Email
              </FormErrorMessage>
            </FormControl>
            <FormControl
              minH={'85px'}
              isInvalid={
                isFormValid.isPasswordValid === false &&
                formValues.password.length != 0
                  ? true
                  : false
              }
            >
              <Input
                minH={'60px'}
                type="password"
                name="password"
                fontSize={'18px'}
                placeholder="Password"
                colorScheme="secondary"
                borderRadius={'20px'}
                _placeholder={{ color: 'secondary.base' }}
                bgColor={'gray.200'}
                onChange={handleInputChange}
                isInvalid={
                  isFormValid.isPasswordValid === false &&
                  formValues.password.length != 0
                    ? true
                    : false
                }
              />
              <FormErrorMessage padding={'0 16px'}>
                Your password must contain 4-10 symbols
              </FormErrorMessage>
            </FormControl>
          </Box>
          <HStack mt={'20px'} justifyContent={'space-between'}>
            <Text
              color="secondary.base"
              fontSize={'32px'}
              fontWeight={900}
              lineHeight={'43px'}
            >
              Sign in
            </Text>
            <IconButton
              isRound={true}
              aria-label={''}
              type="submit"
              form="signinform"
              bgColor={'secondary.base'}
              colorScheme="secondary"
              icon={<ArrowForwardIcon w={'24px'} h={'30px'} />}
              minW={'64px'}
              minH={'64px'}
              isDisabled={
                !Object.values(isFormValid).every((key) => key === true)
              }
            />
          </HStack>
          <Box mt={'125px'}>
            <Text fontSize={'20px'} color={'highlight'}>
              Don't have an account?
            </Text>
            <ChakraLink
              as={ReactRouterLink}
              to={APP_PATHS.SIGN_UP}
              fontSize={'24px'}
              fontWeight={900}
              color={'secondary.base'}
              // _hover={{ textDecoration: 'none' }}
            >
              Sign up
            </ChakraLink>
          </Box>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default SignInPage