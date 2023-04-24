import { UseFetchOptions } from 'nuxt/app';
import { KeysOf } from 'nuxt/dist/app/composables/asyncData';

export const $http = async (
  path: string,
  params: any
) => (await useFetch(path, params)).data.value;
