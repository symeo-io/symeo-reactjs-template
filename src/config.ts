checkEnvironmentVariablesArePresent("VITE_API_URL", "VITE_GOOGLE_CLIENT_ID");

export const config = {
  authentication: {
    google: {
      authority: "https://accounts.google.com",
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
      clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET as string,
      responseType: "code",
      scope: "openid email profile",
      redirectUri: window.location.origin,
      autoSignIn: false,
    },
  },
  api: {
    url: import.meta.env.VITE_API_URL as string,
  },
};

function checkEnvironmentVariablesArePresent(...variables: string[]) {
  const missingKeys: string[] = [];
  for (const key of variables) {
    if (!import.meta.env[key]) {
      missingKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing environment variable for app configuration: ${missingKeys.join(
        ","
      )}`
    );
  }
}
