const me = {
  client_id:
    "Your client id from google console developer ",
  project_id: "Your project id from google console developer",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: "Your client secret from google console developer",
  redirect_uris: ["https://localhost:3000"],
  javascript_origins: ["https://localhost:3000"],
  scope: "https://www.googleapis.com/auth/drive",
};

export default me;
