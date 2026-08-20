export const MULTIPART_FORMDATA_KEY = 'multipart/form-data';

export const MaxFileCounts = { PRODUCT_IMAGES: 5 } as const satisfies Record<
  string,
  number
>;

export const FilePath = {
  Products: {
    BASE: 'products',
    IMAGES: 'images',
  },
} as const satisfies Record<string, { [key: string]: string }>;
