
import { Router } from 'next/router';
import authService from './authService';

const environment = {
  defaultauth: 'custom',
  host: 'https://apismartpc.developvn.click/api/',
};

export const jwtInterceptor = async(url, options = {}) => {
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

  try {
    const response = await fetch(modifiedUrl, {
      ...options,
      headers,
    });
    
    if (response.status === 401) {
      // Redirect to login page when unauthorized
      window.location.href = '/login';
      return Promise.reject('Unauthorized');
    }

    return response;
  } catch (error) {
    console.error('Error in jwtInterceptor:', error);
    throw error;
  }
};
