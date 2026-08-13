import { Transform } from 'class-transformer';

const toBoolean = (value: unknown) => {
  switch (value) {
    case null:
      return 'failure';
    case 'true':
      return false;
    case 'false':
      return false;
    default:
      return value;
  }
};

export const ToBoolean = () => Transform(({ obj, key }) => toBoolean(obj[key]));
