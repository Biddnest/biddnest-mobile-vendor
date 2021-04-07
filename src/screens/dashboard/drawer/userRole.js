import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Linking,
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
import {useSelector} from 'react-redux';
import {APICall} from '../../../redux/actions/user';
import {CustomAlert} from '../../../constant/commonFun';
import {STORE} from '../../../redux';

const UserRole = (props) => {
  const userData = useSelector((state) => state.Login?.loginData) || {};
  const configData =
    useSelector((state) => state.Login?.configData?.enums?.vendor?.roles) || {};
  const vendorStatus =
    useSelector((state) => state.Login?.configData?.enums?.vendor?.status) ||
    {};
  const [isLoading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('manager');
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [detailsData, setDetailsData] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterData, setFilterData] = useState({
    status: 1,
    branch: 15,
  });
  const [switchValue, setSwitchValue] = useState(false);
  const [deActivateUser, setDeActivateUser] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  let filterStatusOptions = [];
  let filterBranchOptions = [];
  Object.keys(vendorStatus)?.forEach((item, index) => {
    filterStatusOptions.push({
      label: item?.replace('_', ' '),
      value: Object.values(vendorStatus)[index],
    });
  });

  useEffect(() => {
    if (userData?.token) {
      setLoading(true);
      getUserRoleList();
    }
  }, [selectedTab]);

  const getUserRoleList = (data = {}, pageNo = 1) => {
    let obj = {
      url:
        Object.keys(data)?.length > 0
          ? `user/${selectedTab}?page=${pageNo}&status=${data?.status}&branch=${data?.branch}`
          : `user/${selectedTab}?page=${pageNo}`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
      },
    };
    APICall(obj)
      .then((res) => {
        setLoading(false);
        if (res?.data?.status === 'success') {
          setUserRoles(res?.data?.data);
        } else {
          CustomAlert(res?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        CustomAlert(err?.data?.message);
      });
  };

  const changeStatus = (item) => {
    setLoading(true);
    let obj = {
      url: `user?id=${item?.id}&status=${item?.status === 1 ? 0 : 1}`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
      },
    };
    APICall(obj)
      .then((res) => {
        setLoading(false);
        if (res?.data?.status === 'success') {
          getUserRoleList();
        } else {
          CustomAlert(res?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        CustomAlert(err?.data?.message);
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          setDetailsVisible(true);
          setDetailsData(item);
        }}
        key={index}
        style={{
          flexDirection: 'row',
          flex: 1,
          paddingHorizontal: hp(2),
          paddingVertical: hp(2),
          alignItems: 'center',
          backgroundColor: Colors.white,
        }}>
        <Text
          style={[
            STYLES.headerText,
            {
              width:
                configData?.admin === userData?.vendor?.user_role
                  ? '45%'
                  : '50%',
            },
          ]}>
          {item?.fname} {item?.lname}
        </Text>
        <Text
          style={[
            STYLES.headerText,
            {
              width:
                configData?.admin === userData?.vendor?.user_role
                  ? '35%'
                  : '50%',
            },
          ]}>
          {item?.organization?.city}
        </Text>
        {configData?.admin === userData?.vendor?.user_role && (
          <View style={{width: '20%', alignItems: 'center'}}>
            <Switch
              switchValue={item?.status}
              onChange={() => {
                if (!switchValue === false) {
                  setDeActivateUser(true);
                } else {
                  changeStatus(item);
                }
              }}
            />
          </View>
        )}
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
        {[
          {title: 'Managers', value: 'manager'},
          {title: 'Admins', value: 'admin'},
          {title: 'Drivers', value: 'driver'},
        ].map((item, index) => {
          return (
            <Pressable
              key={index}
              style={{
                ...STYLES.common,
                flex: 1,
                borderColor:
                  selectedTab === item.value ? Colors.darkBlue : '#ACABCD',
                borderBottomWidth: selectedTab === item.value ? 2 : 0.8,
              }}
              onPress={() => setSelectedTab(item.value)}>
              <Text
                style={{
                  ...STYLES.tabText,
                  color:
                    selectedTab === item.value ? Colors.darkBlue : '#ACABCD',
                }}>
                {item?.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {(!!isLoading && (
        <View style={{flex: 1, marginTop: hp(25)}}>
          <ActivityIndicator size="large" color={Colors.darkBlue} />
        </View>
      )) || (
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            borderWidth: userRoles?.user_role?.length > 0 ? 1 : 0,
            borderColor: Colors.silver,
            overflow: 'hidden',
            margin: hp(2),
          }}
          data={userRoles?.user_role}
          onRefresh={() =>
            getUserRoleList({}, userRoles?.paging?.next_page || 1)
          }
          ListHeaderComponent={() => {
            if (userRoles?.user_role?.length > 0) {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: hp(2),
                    paddingVertical: hp(1.5),
                    backgroundColor: Colors.darkBlue,
                  }}>
                  <Text
                    style={[
                      STYLES.headerText,
                      {
                        width:
                          configData?.admin === userData?.vendor?.user_role
                            ? '45%'
                            : '50%',
                        color: Colors.white,
                      },
                    ]}>
                    Name
                  </Text>
                  <Text
                    style={[
                      STYLES.headerText,
                      {
                        width:
                          configData?.admin === userData?.vendor?.user_role
                            ? '35%'
                            : '50%',
                        color: Colors.white,
                      },
                    ]}>
                    Branch
                  </Text>
                  {configData?.admin === userData?.vendor?.user_role && (
                    <Text
                      style={[
                        STYLES.headerText,
                        {
                          width: '20%',
                          color: Colors.white,
                        },
                      ]}>
                      Status
                    </Text>
                  )}
                </View>
              );
            }
            return null;
          }}
          refreshing={isLoading}
          extraData={userRoles?.user_role}
          onEndReachedThreshold={0.5}
          // onEndReached={() =>
          //   getUserRoleList({}, userRoles?.paging?.next_page || 1)
          // }
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={[STYLES.separatorView, {marginTop: 0}]} />
          )}
          ListEmptyComponent={() => (
            <Text
              style={{
                fontFamily: 'Roboto-Italic',
                fontSize: wp(3.5),
                color: '#99A0A5',
                textAlign: 'center',
                marginHorizontal: 20,
                marginVertical: hp(5),
                textTransform: 'capitalize',
              }}>
              No {selectedTab} orders!
            </Text>
          )}
        />
      )}
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
        <Text style={STYLES.modalHeaderText}>USER DETAILS</Text>
        <CloseIcon onPress={() => setDetailsVisible(false)} />
        <View style={styles.flexBox}>
          <Text style={styles.topText}>Name</Text>
          <Text style={[styles.bottomText, {textTransform: 'capitalize'}]}>
            {detailsData?.fname} {detailsData?.lname}
          </Text>
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <View style={styles.flexBox}>
          <Text style={styles.topText}>Phone Number</Text>
          <Text style={styles.bottomText}>+91 {detailsData?.phone}</Text>
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <View style={styles.flexBox}>
          <Text style={styles.topText}>Email</Text>
          <Text style={styles.bottomText}>{detailsData?.email}</Text>
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: '85%',
            marginTop: hp(2),
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.topText}>Employee Id</Text>
            <Text style={styles.bottomText}>#{detailsData?.id}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.topText}>Role</Text>
            <Text style={[styles.bottomText, {textTransform: 'capitalize'}]}>
              {Object.keys(configData)[
                Object.values(configData).findIndex(
                  (ele) => ele === detailsData?.user_role,
                )
              ]?.replace('_', ' ')}
            </Text>
          </View>
        </View>
        <View style={{marginTop: hp(2)}}>
          <FlatButton
            label={'call'}
            onPress={() => Linking.openURL(`tel:${detailsData?.phone}`)}
          />
        </View>
      </CustomModalAndroid>
      <CustomModalAndroid
        visible={filterVisible}
        onPress={() => setFilterVisible(false)}>
        <Text style={STYLES.modalHeaderText}>FILTERS</Text>
        <CloseIcon onPress={() => setFilterVisible(false)} />
        <View
          style={[
            {marginVertical: hp(2)},
            Platform.OS !== 'android' && {zIndex: 5001},
          ]}>
          <DropDownAndroid
            label={'Branch'}
            width={wp(90)}
            items={[{label: 'Commercial', value: 'Commercial'}]}
            onChangeItem={(text) => {
              setFilterData({
                ...filterData,
                branch: text,
              });
            }}
          />
        </View>
        <View
          style={[
            {marginBottom: hp(2)},
            Platform.OS !== 'android' && {zIndex: 5001},
          ]}>
          <DropDownAndroid
            value={filterData?.status}
            label={'Status'}
            width={wp(90)}
            items={filterStatusOptions}
            onChangeItem={(text) => {
              setFilterData({
                ...filterData,
                status: text,
              });
            }}
          />
        </View>
        <FlatButton
          label={'apply'}
          onPress={() => {
            getUserRoleList(filterData);
            setFilterVisible(false);
          }}
        />
      </CustomModalAndroid>
      <CustomModalAndroid
        visible={deActivateUser}
        onPress={() => setDeActivateUser(false)}>
        <Text style={STYLES.modalHeaderText}>TURN OF NOTIFICATIONS</Text>
        <CloseIcon onPress={() => setDeActivateUser(false)} />
        <Text style={[STYLES.rejectText, {marginTop: hp(5)}]}>
          Do you want to deactivate this user?
        </Text>
        <TwoButton
          leftLabel={'NO'}
          rightLabel={'Yes'}
          leftOnPress={() => setDeActivateUser(false)}
          rightOnPress={() => {
            setDeActivateUser(false);
            changeStatus(detailsData);
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
    fontFamily: 'Gilroy-SemiBold',
    color: Colors.inputTextColor,
    fontSize: wp(3.5),
  },
  bottomText: {
    fontFamily: 'Roboto-Bold',
    color: Colors.inputTextColor,
    fontSize: wp(4),
  },
  flexBox: {marginTop: hp(2), alignItems: 'flex-start', width: '85%'},
});
