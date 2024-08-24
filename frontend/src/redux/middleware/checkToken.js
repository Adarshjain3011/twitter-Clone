
import Cookies from 'js-cookie';

const checkTokenMiddleware = store => next => action => {
    // Call the next middleware or reducer first
    const result = next(action);

    const token = Cookies.get('AccessToken');

    console.log("middleware triggered ",token);

  
    // // Perform the token check after the action has been processed

    // if (!token && store.getState().auth.isAuthenticated) {
    //   // Dispatch the clear user data action only if not already dispatching
    //   if (action.type !== 'auth/clearUserData') {
    //     store.dispatch({ type: 'auth/clearUserData' });
    //   }
    // }
    
    // return result;
    
  };
  
  export default checkTokenMiddleware;
  

