import { jwtInterceptor } from "../jwtInterceptor";


export const createProduct = async (data) => {
  try {
    const response = await jwtInterceptor('Product/CreateProduct' ,{
      method: 'POST',
      body: data,
      
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
export const getDetailProduct = async (id) => {
  try {
    const response = await jwtInterceptor('Product/GetProducts?id=' + id );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};



export const GetAllProducts = async (body) => {
  try {
    const response = await jwtInterceptor('Product/GetAllProducts?' + `pageNumber=${body.page}&pageSize=${body.limit}`, {
      method: 'GET',
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