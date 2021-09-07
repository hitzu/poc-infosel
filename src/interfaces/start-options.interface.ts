export type TypeCase = 'camel' | 'snake' | false;

export interface StartOptions {
    useToken?: boolean;
    basePath?: string;
    typeCase?: TypeCase;
    loggerOptions?: {
      obfuscatePlaceholder?: string;
      obfuscateBody?: {
        [key: string]: {
          [key: string]: boolean;
        };
      };
    };
  }