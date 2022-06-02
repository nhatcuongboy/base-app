import { useMutation } from 'react-query';
import { login } from 'src/api/authApi';
import { store } from 'src/app/store';
import { setToken } from 'src/features/auth/authSlice';

// export const useLogin = () => {
//   return useMutation((params: any) => login(params.username, params.password), {
//     onSuccess: (data) => {
//       store.dispatch(setToken({token: data?.access_token}))
//     },
//   });
// };
