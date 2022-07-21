import {  WebView } from 'react-native-webview';

const Iframe = () => {
  return (
    <WebView
      source={{
        html: '<iframe width="100%" height="50%" src="https://rebank.ge/application/1/mobile" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
      }}
      style={{ marginTop: 20 }}
    />
  );
};

export default Iframe;
