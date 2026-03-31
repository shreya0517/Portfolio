// getDatoCmsToken.ts

const firstNonEmpty = (...values: Array<string | undefined>): string =>
  values.find((value) => Boolean(value?.trim())) ?? '';

export const getDatoCmsToken = (): string => {
  if (process.env.REACT_APP_DATOCMS_TOKEN) {
    return process.env.REACT_APP_DATOCMS_TOKEN;
  }

  const hostname = window.location.hostname;

  switch (hostname) {
    case 'ror.sheyagarg.com':
    case 'sheyagarg.com':
    case 'ror.localhost':
      return process.env.REACT_APP_DATOCMS_ROR_TOKEN ?? '';

    case 'java.sheyagarg.com':
    case 'java.localhost':
      return process.env.REACT_APP_DATOCMS_JAVA_TOKEN ?? '';

    case 'frontend.sheyagarg.com':
    case 'frontend.localhost':
      return process.env.REACT_APP_DATOCMS_FRONTEND_TOKEN ?? '';

    case 'node.sheyagarg.com':
    case 'node.localhost':
      return process.env.REACT_APP_DATOCMS_NODE_TOKEN ?? '';

    case 'localhost':
      return firstNonEmpty(
        process.env.REACT_APP_DATOCMS_ROR_TOKEN,
        process.env.REACT_APP_DATOCMS_NODE_TOKEN,
        process.env.REACT_APP_DATOCMS_JAVA_TOKEN,
        process.env.REACT_APP_DATOCMS_FRONTEND_TOKEN
      );

    default:
      return firstNonEmpty(
        process.env.REACT_APP_DATOCMS_FRONTEND_TOKEN,
        process.env.REACT_APP_DATOCMS_ROR_TOKEN,
        process.env.REACT_APP_DATOCMS_NODE_TOKEN,
        process.env.REACT_APP_DATOCMS_JAVA_TOKEN
      );
  }
};
