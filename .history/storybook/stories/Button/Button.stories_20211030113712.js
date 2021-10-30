import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import Button from '.';
import CenterView from '../CenterView';

import LinkCompassCard from '../../../comps/LinkCompassCard';
import SignUpTransitCard from '../../../comps/SignUpTransitCard';
import RideCard from '../../../comps/RideCardCont';

storiesOf('Button', module)
  .add('Add Compass Card', () => <LinkCompassCard />)
  .add('Transit Sign Up Card', () => <SignUpTransitCard />)
  .add('Trip Planner Tab', () => <RideCard />)

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
