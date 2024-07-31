
import authService from './authService';

const environment = {
  defaultauth: 'custom',
  host: 'https://apismartpc.developvn.click/api/',
};

export const jwtInterceptor = (url, options = {}) => {
  let modifiedUrl = url;
  let headers = options.headers || {};

  if (environment.defaultauth === 'firebase') {
    const currentUser = authService.currentUser();
    if (currentUser && currentUser?.tokenInformation?.accessToken) {
      headers['Authorization'] = `Bearer ${currentUser?.tokenInformation?.accessToken}`;
    }
  } else {
    if (!url.includes('http') && !url.includes('assets')) {
      modifiedUrl = environment.host + url;
    }
    const currentUser = authService.currentUser();
    if (currentUser && currentUser?.tokenInformation?.accessToken) {
      headers['Authorization'] = `Bearer ${currentUser?.tokenInformation?.accessToken}`;
    }
  }

  return fetch(modifiedUrl, {
    ...options,
    headers,
  });
};
