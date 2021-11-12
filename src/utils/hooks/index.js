import { useContext } from 'react';
import { AuthContext } from '../../firebase/contexts/AuthContext';

export const useAuth = () => {
  return useContext(AuthContext);
};
