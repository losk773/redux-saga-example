import { ValidationError, UnknownError } from 'api/errors';

export const apiCall = async request => {
  try {
    return await request;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 422) {
        throw { type: ValidationError, data: error.response.data.result, code: error.response.status };
      }
      throw { type: UnknownError, data: error.response.data, code: error.response.status };
    }
    throw { type: UnknownError, data: error.message, code: error };
  }
};
