import { useContext } from 'react';
import { UserContext } from '../context/userContext';

function useUserContext() {
    const context = useContext(UserContext);

    if(!context) {
        throw new Error('useUserContext deve ser usado dentro de um ContextProvider!');
    }

    return context;
}

export { useUserContext };