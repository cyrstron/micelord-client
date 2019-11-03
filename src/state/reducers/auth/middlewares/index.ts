import {handleInvalidToken} from './handle-invalid-token';
import {handleSignIn} from './handle-sign-in';
import {handleSignOut} from './handle-sign-out';

export const authMiddlewares = [
    handleInvalidToken,
    handleSignIn,
    handleSignOut,
];