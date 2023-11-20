declare global {
    namespace NodeJS {
      interface ProcessEnv {
        APP_ID: number;
        APP_HASH: string;
        PHONE_NUMBER: string
        // NODE_ENV: 'development' | 'production';
        // PORT?: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}