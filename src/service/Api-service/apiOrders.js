import { jwtInterceptor } from "../jwtInterceptor";


export const createOrders = async (data) => {
  try {
    const response = await jwtInterceptor('Order/AddOrder' ,{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    } );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};
export const getListOrders = async (id) => {
  try {
    const response = await jwtInterceptor('Order/ListOrderCustomer' ,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    } );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};



export const filterProducts = async (body) => {
  try {
    const response = await jwtInterceptor('Product/FilterProductsHome', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.log(response)
    }
    return response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    return error;
  }
};


export const searchProductbyDes = async (searchProduct) => {
  try {
    if(searchProduct){
    const response = await jwtInterceptor(`Product/SearchProducts?keyword=${searchProduct}&pageNumber=1&pageSize=50` );
    if (!response.ok) {
      console.log('Network response was not ok');
    }
    return response.json();
  }
   
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};


export const postData = async (data) => {
  try {
    const response = await jwtInterceptor('/data', {
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
export const FilterProducts = async (id) => {
  try {
    const response = await jwtInterceptor('BuildPc/categories/filter/' + id );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};