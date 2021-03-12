import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import SimpleHeader from '../../../components/simpleHeader';
import {STYLES} from '../../../constant/commonStyle';
import Switch from '../../../components/switch';
import FilterButton from '../../../components/filterButton';
import CloseIcon from '../../../components/closeIcon';
import CustomModalAndroid from '../../../components/customModal';
import TwoButton from '../../../components/twoButton';
import FlatButton from '../../../components/flatButton';
import DropDownAndroid from '../../../components/dropDown';

const UserRole = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [deActivateUser, setDeActivateUser] = useState(false);

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => setDetailsVisible(true)}
        key={index}
        style={{
          flexDirection: 'row',
          flex: 1,
          paddingHorizontal: hp(2),
          paddingVertical: hp(1.5),
          alignItems: 'center',
        }}>
        <Text
          style={[
            STYLES.modalHeaderText,
            {
              textAlign: 'left',
              width: '45%',
              fontFamily: 'Roboto-Bold',
            },
          ]}>
          Rohit Kole
        </Text>
        <Text
          style={[
            STYLES.modalHeaderText,
            {
              textAlign: 'left',
              width: '35%',
              fontFamily: 'Roboto-Bold',
            },
          ]}>
          Branch {index}
        </Text>
        <View style={{width: '20%', alignItems: 'center'}}>
          <Switch
            switchValue={switchValue}
            onChange={() => {
              if (!switchValue === false) {
                setDeActivateUser(true);
              } else {
                setSwitchValue(true);
              }
            }}
          />
        </View>
      </Pressable>
    );
  };
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'User roles'}
        right={true}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      <View style={STYLES.tabView}>
        {['Managers', 'Admins', 'Drivers'].map((item, index) => {
          return (
            <Pressable
              key={index}
              style={{
                ...STYLES.common,
                flex: 1,
                borderColor:
                  selectedTab === index ? Colors.darkBlue : '#ACABCD',
                borderBottomWidth: selectedTab === index ? 2 : 0.8,
              }}
              onPress={() => setSelectedTab(index)}>
              <Text
                style={{
                  ...STYLES.tabText,
                  color: selectedTab === index ? Colors.darkBlue : '#ACABCD',
                }}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          padding: hp(2),
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.tableView}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: hp(2),
              paddingVertical: hp(1.5),
            }}>
            <Text
              style={[
                STYLES.modalHeaderText,
                {
                  textAlign: 'left',
                  width: '45%',
                  color: Colors.white,
                },
              ]}>
              Name
            </Text>
            <Text
              style={[
                STYLES.modalHeaderText,
                {
                  textAlign: 'left',
                  width: '35%',
                  color: Colors.white,
                },
              ]}>
              Branch
            </Text>
            <Text
              style={[
                STYLES.modalHeaderText,
                {
                  width: '20%',
                  color: Colors.white,
                },
              ]}>
              Status
            </Text>
          </View>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{backgroundColor: Colors.white}}
            data={[1, 2, 3, 4, 5, 6, 17, 8, 9, 10, 11]}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <View style={[STYLES.separatorView, {marginTop: 0}]} />
            )}
          />
        </View>
      </ScrollView>
      <FilterButton onPress={() => setFilterVisible(true)} />
      <CustomModalAndroid visible={false} onPress={() => {}}>
        <View style={STYLES.modalHeaderView}>
          <Text style={STYLES.modalHeaderText}>DEACTIVATE USER</Text>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => {}}
          />
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <Text style={[STYLES.rejectText, {marginTop: hp(6)}]}>
          Do you want to deactivate this user?
        </Text>
        <TwoButton
          leftLabel={'NO'}
          rightLabel={'YES'}
          leftOnPress={() => {}}
          rightOnPress={() => {}}
        />
      </CustomModalAndroid>
      <CustomModalAndroid
        visible={detailsVisible}
        onPress={() => setDetailsVisible(false)}>
        <View style={STYLES.modalHeaderView}>
          <Text style={STYLES.modalHeaderText}>USER DETAILS</Text>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setDetailsVisible(false)}
          />
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <View style={styles.flexBox}>
          <Text style={styles.topText}>Name</Text>
          <Text style={styles.bottomText}>Amit Patel</Text>
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <View style={styles.flexBox}>
          <Text style={styles.topText}>Phone Number</Text>
          <Text style={styles.bottomText}>+91 90909090</Text>
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <View style={styles.flexBox}>
          <Text style={styles.topText}>Employee Id</Text>
          <Text style={styles.bottomText}>#0112</Text>
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <View style={styles.flexBox}>
          <Text style={styles.topText}>Role</Text>
          <Text style={styles.bottomText}>Manager</Text>
        </View>
        <View style={{marginTop: hp(2)}}>
          <FlatButton label={'call'} onPress={() => {}} />
        </View>
      </CustomModalAndroid>
      <CustomModalAndroid
        visible={filterVisible}
        onPress={() => setFilterVisible(false)}>
        <View style={STYLES.modalHeaderView}>
          <Text style={STYLES.modalHeaderText}>FILTERS</Text>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setFilterVisible(false)}
          />
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <View style={[{marginVertical: hp(2)}, Platform.OS !== 'android' && {zIndex: 5001},]}>
          <DropDownAndroid
            label={'Branch'}
            width={wp(90)}
            items={[{label: 'Commercial', value: 'Commercial'}]}
            onChangeItem={(text) => {}}
          />
        </View>
        <View style={[{marginBottom: hp(2)}, Platform.OS !== 'android' && {zIndex: 5001},]}>
          <DropDownAndroid
            label={'Status'}
            width={wp(90)}
            items={[
              {label: 'Active', value: 'active'},
              {label: 'Inactive', value: 'inactive'},
            ]}
            onChangeItem={(text) => {}}
          />
        </View>
        <FlatButton label={'apply'} onPress={() => setFilterVisible(false)} />
      </CustomModalAndroid>
      <CustomModalAndroid
        visible={deActivateUser}
        onPress={() => setDeActivateUser(false)}>
        <View style={STYLES.modalHeaderView}>
          <Text style={STYLES.modalHeaderText}>TURN OF NOTIFICATIONS</Text>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setDeActivateUser(false)}
          />
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <Text style={[STYLES.rejectText, {marginTop: hp(5)}]}>
          Do you want to deactivate this user?
        </Text>
        <TwoButton
          leftLabel={'NO'}
          rightLabel={'Yes'}
          leftOnPress={() => setDeActivateUser(false)}
          rightOnPress={() => {
            setDeActivateUser(false);
            setSwitchValue(false);
          }}
        />
      </CustomModalAndroid>
    </LinearGradient>
  );
};

export default UserRole;

const styles = StyleSheet.create({
  tableView: {
    borderWidth: 1,
    borderColor: Colors.silver,
    backgroundColor: Colors.darkBlue,
    overflow: 'hidden',
    flex: 1,
  },
  topText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(3.2),
  },
  bottomText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(4),
  },
  flexBox: {marginTop: hp(2), alignItems: 'flex-start', width: '85%'},
});
