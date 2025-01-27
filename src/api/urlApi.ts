import axiosInstance from './axiosConfig';


export const shortenUrl = async (redirectURL: string, customAlias : string | undefined = undefined , isActive : boolean = true) => {
  try {
    const response = await axiosInstance.post('/url', { 
      redirectURL,
      customAlias,
      isActive
    });
    return response;
  } catch (error: any) {
    console.error('Login Error:', {
      message: error?.message,
      response: error?.response?.data
    });
    throw error;
  }
};

export const deleteUrl = async (shortID: string) => {
  return axiosInstance.delete(`/url/delete/${shortID}`);
};

export const getUrlAnalytics = async (shortId: string | undefined) => {
  return axiosInstance.get(`/url/analytics/${shortId}`);
};

export const toggleUrlStatus = async (shortID: string, isActive: boolean) => {
  return axiosInstance.post('/url/togglestatus', { shortID, isActive });
};

export const updateUrl = async (shortId: string, newUrl: string , isActive: boolean, customAlias : string | undefined) => {
  return axiosInstance.patch('/url/update', {
     shortID : shortId, 
     redirectURL : newUrl,
     isActive : isActive,
     customAlias : customAlias
    });
};

export const getUserUrls = async () => {
  try {
    const response = await axiosInstance.get('/user-analytics/analytics',);
    return response;
  } catch (error: any) {
    console.error('Login Error:', {
      message: error?.message,
      response: error?.response?.data
    });
    throw error;
  }
};

