import { jwtInterceptor } from "../jwtInterceptor";



export const SendData = async (data) => {
  try {
    const response = await jwtInterceptor('/Chatbox/Send', {
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
