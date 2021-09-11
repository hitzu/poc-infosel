const JWT = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

interface AnyObject {
  [key: string]: any;
}

export interface TokenData {
  user_id: string;
  username: string;
  status: boolean;
  user_ip: string;
}

const lowerCaseObjectKeys = (obj: any): AnyObject => {
  const lower = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      lower[key.toLowerCase()] = obj[key];
    }
  }

  return lower;
};

export const generate = (
  user_id: string,
  username: string,
  status: boolean,
  person_id: string,
  ip: string
): string => {
  const data = {
    user_id: user_id as string,
    username: username as string,
    status: status as boolean,
    person_id: person_id as string,
    user_ip: ip as string
  };

  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.TOKEN_SECRET
  );

  return JWT.sign(
    { encrypted: encryptedData.toString() },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: '6h' }
  );
};

export const verify = (token: string, ip: string): Promise<TokenData> => {
  return new Promise<TokenData>((resolve, reject) => {
    try {
      const tokenEncryptedData = JWT.verify(
        token,
        process.env.TOKEN_SECRET_KEY
      );

      const bytes = CryptoJS.AES.decrypt(
        tokenEncryptedData.encrypted.toString(),
        process.env.TOKEN_SECRET
      );

      const tokenData: TokenData = JSON.parse(
        bytes.toString(CryptoJS.enc.Utf8)
      );

      if (tokenData.user_ip !== ip && process.env.NODE_ENV != 'test') {
        return reject({
          message: `Token IP does not match then current user's ip`
        });
      }

      resolve(tokenData);
    } catch (error) {
      reject(error);
    }
  });
};

export const decode = (token: string, ip: string): Promise<TokenData> => {
  return new Promise(async (resolve, reject) => {
    try {
      let verifiedToken: TokenData = await verify(token, ip);
      return resolve(verifiedToken);
    } catch (error) {
      return reject(error);
    }
  });
};
