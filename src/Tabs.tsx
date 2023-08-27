import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Participant from './screens/container/participant/Participant';
import Events from './screens/container/event/Events';
import User from './screens/container/user/User';
import {View, Image} from 'react-native';
import Home from './screens/container/home/Home';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 55,
        },
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/home.png')}
                resizeMethod="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#8ac3ee' : '#d9d9d9',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/events.png')}
                resizeMethod="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#8ac3ee' : '#d9d9d9',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Participants"
        component={Participant}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/add-group.png')}
                resizeMethod="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#8ac3ee' : '#d9d9d9',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/user.png')}
                resizeMethod="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#8ac3ee' : '#d9d9d9',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
