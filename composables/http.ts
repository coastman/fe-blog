import { UseFetchOptions } from 'nuxt/app';
import { KeysOf } from 'nuxt/dist/app/composables/asyncData';

export const $http = async (
  path: string,
  params: UseFetchOptions<
    unknown,
    unknown,
    KeysOf<unknown>,
    string, 'get'
  > | undefined
) => (await useFetch(path, params)).data.value;
