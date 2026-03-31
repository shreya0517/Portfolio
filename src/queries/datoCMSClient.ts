import { GraphQLClient } from 'graphql-request';
import { getDatoCmsToken } from './getDatoCmsToken';

const DATO_CMS_ENDPOINT = 'https://graphql.datocms.com/';
const DATO_CMS_API_TOKEN = getDatoCmsToken();

if (!DATO_CMS_API_TOKEN) {
  console.warn('DatoCMS token is missing. Requests will fall back to local data.');
}

const datoCMSClient = new GraphQLClient(DATO_CMS_ENDPOINT, {
  headers: DATO_CMS_API_TOKEN
    ? { Authorization: `Bearer ${DATO_CMS_API_TOKEN}` }
    : {},
});

export default datoCMSClient;
