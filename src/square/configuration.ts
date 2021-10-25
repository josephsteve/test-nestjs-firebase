import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import 'firebase-functions';
admin.initializeApp();

export default () => ({
  SquareApplicationId: functions.config().squareapi?.application_id,
  SquareAccessToken: functions.config().squareapi?.access_token,
  SquareLocationId: functions.config().squareapi?.location_id,
});
