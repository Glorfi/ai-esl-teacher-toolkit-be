import { useState, ReactNode } from 'react';
import { UserContext } from './UserContext';
import { IUserData } from '../interfaces/userData';

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({
  children,
}: UserContextProviderProps): any => {
  const [state, setState] = useState<IUserData | null>(null);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};
