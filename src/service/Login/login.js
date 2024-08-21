import { jwtInterceptor } from "../jwtInterceptor";



export const LoginAdmin = async (data) => {
    try {
      const response = await jwtInterceptor('Account/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error posting data:', error);
      return error;
    }
  };

export const ForgotPassword = async (data) => {
  try {
    const response = await jwtInterceptor('Account/ForgotPassword?email=' + data, {
      method: 'POST',
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    return error;
  }
};



  export const RegisterAdmin = async (data) => {
      try {
        const response = await jwtInterceptor('Account/register', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        console.error('Error posting data:', error);
        return error;
      }
    };
    