/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RNNeuraIntegration from 'react-native-neura';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const getSubs = async () => {
  try {
    const response = await RNNeuraIntegration.getSubscriptions();

    return response;
    } catch (err) {
    // handle errors
  }
};

const getUserID = async () => {
  try {
    console.log("reached_before: ");
    const response = await RNNeuraIntegration.getUserId();
    console.log("reached_after: ");

    return response;
    } catch (err) {
      console.log("reached_after: " + err);
  }
};

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
          <Button
          onPress={() => {
            res = RNNeuraIntegration.isAuthenticated();
            res2 = RNNeuraIntegration.getUserAccessToken();
            res.then(function(v) {
            console.log("isAuth after auth response: " + v);
            });
            res2.then(function(v) {
              console.log("token: " + v);
              });
          }}
          title="isAuth"
        />
        <Button
          onPress={() => {
            res = RNNeuraIntegration.authenticateAnon();
            res.then(function(v) {
              console.log("UserID after auth: " + v);
              //RNNeuraIntegration.subscribeToEventWithWebhook("userArrivedHome", "testJonwebhook", "second_webhook");
            })
          }}
          title="Authenticate!"
        />
        <Button
          onPress={() => {
            res = RNNeuraIntegration.getUserId();
            res.then(function(v) {
              console.log("userIDNew: " + v);
              RNNeuraIntegration.subscribeToEventWithWebhook("userArrivedHome", "testJonwebhook", "second_webhook");
            })
          }}
          title="subscribe webhook!"
        />
        <Button
          onPress={() => {
            res = RNNeuraIntegration.getUserId();
            res.then(function(v) {
              console.log("userIDNew: " + v);
              RNNeuraIntegration.subscribeToEventWithBraze("userGotUp", "JonBrazeTest2");
            })
          }}
          title="subscribe Braze!"
        />
        <Button
          onPress={() => {
            res = RNNeuraIntegration.getUserId();
            res.then(function(v) {
              console.log("userIDNew: " + v);
              RNNeuraIntegration.subscribeToEventWithSFMC("userArrivedHome", "JonSFMCTest");
            })
          }}
          title="subscribe SFMC!"
        />
        <Button
          onPress={() => {

          const required_moments = ["userArrivedHome", "userArrivedAtCafe"];
              
          subs = RNNeuraIntegration.getSubscriptions();

          subs.then(ret_subs => {
            required_moments.forEach(moment => {
              if(!ret_subs.includes(moment)) {
                RNNeuraIntegration.subscribeToEventWithBraze(moment, "BRAZE-" + moment);
              }
            });
          })
              


          }}
          title="subscribe to needed moments"
        />
        <Button
          onPress={() => {

            res = RNNeuraIntegration.getUserId();
            res.then(function(v) {
              console.log("simulate userIDNew: " + v);
              RNNeuraIntegration.simulateAnEvent("userArrivedHome");
            })
          }}
          title="simulate home!"
        />
        <Button
          onPress={() => {

            res = RNNeuraIntegration.getUserId();
            res.then(function(v) {
              console.log("simulate userIDNew: " + v);
              RNNeuraIntegration.simulateAnEvent("userArrivedAtCafe");
            })
          }}
          title="simulate cafe!"
        />
        <Button
          onPress={() => {
            //RNNeuraIntegration.setExternalId("jont-externalID-test");
            RNNeuraIntegration.setExternalId("jont-pickpack-test-11");
          }}
          title="setExternalId!"
        />
        <Button
          onPress={() => {
            data = { instanceId: "bla", value: "................................."};
            RNNeuraIntegration.tagEngagement("JonathansFirstFeature", data, "attempt");
          }}
          title="attempt!"
        />
        <Button
          onPress={() => {
            data = { instanceId: "bla", action: 'SUCCESS', value: "blue-sky" };
            RNNeuraIntegration.tagEngagement("JonathansFirstFeature", {})
          }}
          title="Feature!"
        />
        <Button
          onPress={() => {
            RNNeuraIntegration.setUserAttribute("newAttNiki", "nikiValue");
          }}
          title="setUserAttribute!"
        />
        <Button
          onPress={() => {
            RNNeuraIntegration.neuraLogout();
          }}
          title="logout!"
        />
        <Button
          onPress={() => {
            
              neura_id = getUserID();
              console.log(" userIDNew: " + neura_id);
          }}
          title="getuserID!"
        />

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
