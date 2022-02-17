import { Box } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import notification from "@utils/notification";
import React from "react";
import GoogleLogin from "react-google-login";

export default function Oauth({ onSuccess, text, mb = 4 }) {
  const onFailure = ({ error }) => {
    notification(error);
  };

  return (
    <Box mb={mb} textAlign="center" lineHeight={1}>
      <GoogleLogin
        clientId={SITE_CONFIG.TOKENS.OAUTH_GOOGLE}
        onAutoLoadFinished={() => null}
        buttonText={text}
        theme="dark"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
      />
    </Box>
  );
}
