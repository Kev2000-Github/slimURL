export const isValidURL = (url: string) => {
  // Regular expression to validate HTTP/HTTPS URLs
  const urlPattern =
    /^(https?:\/\/)?((?!.*\.\.)[\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*(\?[\/\w \.-=&]*)?(\#[\w \.-]*)?$/;

  return urlPattern.test(url);
};
