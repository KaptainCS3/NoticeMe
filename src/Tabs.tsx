import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Participant from './screens/container/participant/Participant';
import Events from './screens/container/event/Events';
import User from './screens/container/user/User';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
const Tab = createBottomTabNavigator();
import {Screens} from './App';
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
        name="Home"
        component={Screens}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Ionicons
                name="home"
                size={28}
                color={focused ? '#8ac3ee' : '#d9d9d9'}
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
              <MaterialIcons
              name='event'
                size={28}
                color={focused ? '#8ac3ee' : '#d9d9d9'}
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
              <Feather
                name="users"
                size={28}
                color={focused ? '#8ac3ee' : '#d9d9d9'}
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
              <Feather
                name="user"
                size={28}
                color={focused ? '#8ac3ee' : '#d9d9d9'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
