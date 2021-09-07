import Joi, { Schema } from 'joi';
import 'joi-extract-type';

interface AnyObject {
  [key: string]: any;
}

/**
 * Validates input against the provided JOI schema
 * @param input (object)
 * @param schema (Schema)
 * @returns (Promise) Resolves input validation
 */
export const validate = (input: AnyObject, schema: Schema): Promise<any> => {
  if (!input || !schema) {
    throw new Error('Cannot validate, please verify input and schema');
  }

  const { value, error } = schema.validate(input, {
    allowUnknown: true,
    stripUnknown: true
  });

  if (error) {
    throw error;
  }

  return value;
};

const { ValidationError } = Joi;

export { Joi, ValidationError };
