if (!import.meta.env.VITE_API_URL) {
  throw new Error(
    "Missing environment variable for app configuration: VITE_API_URL"
  );
}
export const config = {
  api: {
    url: import.meta.env.VITE_API_URL as string,
  },
};
