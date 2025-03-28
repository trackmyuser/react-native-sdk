import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import TrackMyUserSDK from '@trackmyuser/react-native-sdk';

TrackMyUserSDK.init()

AppRegistry.registerComponent(appName, () => App);
