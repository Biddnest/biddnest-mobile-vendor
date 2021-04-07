import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {Colors} from '../../../constant/colors';
import SimpleHeader from '../../../components/simpleHeader';
import LinearGradient from 'react-native-linear-gradient';
import {LoadingScreen} from '../../../constant/commonFun';

const ChatRedirect = (props) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'Virtual Assistance'}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      {isLoading && <LoadingScreen />}
      <WebView
        onLoadEnd={() => setLoading(false)}
        source={{
          uri: 'https://tawk.to/chat/606d768b067c2605c0c001d9/1f2lpe585',
        }}
      />
    </LinearGradient>
  );
};

export default ChatRedirect;
