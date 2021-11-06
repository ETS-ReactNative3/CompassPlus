import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import Button from '.';
import CenterView from '../CenterView';

//IMPORT COMPS FIRST
import LinkCompassCard from '../../../comps/LinkCompassCard';
import SignUpTransitCard from '../../../comps/SignUp/signUpTransitCard';
import TripPlannerTab from '../../../comps/TripPlannerTab';

import MobileCard from '../../../comps/CompassCardParent/cardManager';
import AddFundsTab from '../../../comps/CompassCardParent/addFunds';
import TransferBalanceTab from '../../../comps/CompassCardParent/transferFunds';

import NotificationCard from '../../../comps/Profile/notificationCard';
import SupportCard from '../../../comps/Profile/supportCard';
import ProfileCard from '../../../comps/Profile/profileCard';
import ProfileScreen from '../../../comps/Profile/ProfileScreen';
import ProfileCardUpdate from '../../../comps/Profile/ProfileCardUpdate';
import NotificationPreferences from '../../../comps/Profile/NotificationPreferences';
import BalanceHistoryCard from '../../../comps/BalanceHistory/BalanceHistoryCard';
import PickDestinations from '../../../screens/SignUp/pickDestinations';

//ADD COMPS IN STORYBOOK BELOW LIKE THIS
storiesOf('Button', module)
  //USUALLY GOES .add('label', () => <Comp />)
  .add('Add Compass Card', () => <LinkCompassCard />)
  .add('Transit Sign Up Card', () => <SignUpTransitCard />)
  .add('Trip Planner Tab', () => <TripPlannerTab />)
  .add('Mobile Card', () => <MobileCard />)
  .add('Add Funds Tab', () => <AddFundsTab />)
  .add('Transfer Balance Tab', () => <TransferBalanceTab />)
  .add('Notification Card', () => <NotificationCard />)
  .add('Support Card', () => <SupportCard />)
  .add('Profile Card', () => <ProfileCard />)
  .add('Profile Screen', () => <ProfileScreen />)
  .add('Profile Card Update', () => <ProfileCardUpdate />)
  .add('Notification Preferences', () => <NotificationPreferences />)
  .add('Balance History Card', () => <BalanceHistoryCard />)
  .add('Pick Destinations', () => <PickDestinations />)

  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  // .add('with text', () => (
  //   <Button onPress={action('clicked-text')}>
  //     <Text>{text('Button text', 'Hello Button')}</Text>
  //   </Button>
  // ))
  // .add('with some emoji', () => (
  //   <Button onPress={action('clicked-emoji')}>
  //     <Text>😀 😎 👍 💯</Text>
  //   </Button>
  // ));