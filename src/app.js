/* import { message } from 'antd';

export function config() {
  return {
    onError(err) {
      err.preventDefault();
      message.error(err.message);
    },
  };
}
 */


export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

