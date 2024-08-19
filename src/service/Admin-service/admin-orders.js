import { jwtInterceptor } from "../jwtInterceptor";

export const getListOrdersAdmin = async () => {
    try {
      const response = await jwtInterceptor('Order/ListOrderAdmin');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return error;
    }
  };
export const ListAccountForAdmin = async (id) => {
    try {
      const response = await jwtInterceptor('Account/ListAccountForAdmin');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return error;
    }
  };
  export const changeStatus = async (data) => {
   
    try {
      const response = await jwtInterceptor('Account/ChangeStatus' ,{
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      } );
      if (!response.ok) {
       
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      alert('ok')
      console.error('Error fetching data:', error);
      return error;
    }
  };
