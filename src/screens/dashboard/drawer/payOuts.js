import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import SimpleHeader from '../../../components/simpleHeader';
import {STYLES} from '../../../constant/commonStyle';
import FilterButton from '../../../components/filterButton';
import CloseIcon from '../../../components/closeIcon';
import CustomModalAndroid from '../../../components/customModal';
import FlatButton from '../../../components/flatButton';
import DropDownAndroid from '../../../components/dropDown';
import {STORE} from '../../../redux';
import {APICall} from '../../../redux/actions/user';
import {CustomAlert} from '../../../constant/commonFun';
import moment from 'moment';
import {useSelector} from 'react-redux';
import PayOutDetails from './payOutDetails';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-datepicker';

const PayOuts = (props) => {
  const statusData =
    useSelector((state) => state.Login?.configData?.enums?.payout?.status) ||
    {};
  const [isLoading, setLoading] = useState(false);
  const [payoutList, setPayOutList] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterData, setFilterData] = useState({
    from: new Date(),
    to: new Date(),
    status: 0,
  });
  const [payoutDetailsVisible, setPayoutDetailsVisible] = useState(false);
  const [payoutDetailsData, setPayoutDetailsData] = useState({});
  let filterOptions = [];
  Object.keys(statusData).forEach((item, index) => {
    filterOptions.push({
      label: item,
      value: Object.values(statusData)[index],
    });
  });
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  const fetchData = (data = {}, pageNo = 1) => {
    let obj = {
      url:
        Object.keys(data)?.length > 0
          ? `payouts?page=${pageNo}&from=${moment(data?.from).format(
              'yyyy/MM/DD',
            )}&to=${moment(data?.to).format('yyyy/MM/DD')}&status=${
              data?.status
            }`
          : `payouts?page=${pageNo}`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
      },
    };
    APICall(obj)
      .then((res) => {
        setLoading(false);
        if (res?.data?.status === 'success') {
          setPayOutList(res?.data?.data);
        } else {
          CustomAlert(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        CustomAlert(err?.message);
      });
  };
  const renderStatus = (item) => {
    if (statusData?.scheduled === item?.status) {
      return (
        <Text style={[styles.transferView, {backgroundColor: Colors.btnBG}]}>
          scheduled
        </Text>
      );
    } else if (statusData?.processing === item?.status) {
      return (
        <Text style={[styles.transferView, {backgroundColor: Colors.btnBG}]}>
          processing
        </Text>
      );
    } else if (statusData?.transferred === item?.status) {
      return (
        <Text
          style={[styles.transferView, {backgroundColor: Colors.lightGreen}]}>
          transferred
        </Text>
      );
    } else if (statusData?.suspended === item?.status) {
      return (
        <Text style={[styles.transferView, {backgroundColor: Colors.red}]}>
          suspended
        </Text>
      );
    } else if (statusData?.cancelled === item?.status) {
      return (
        <Text style={[styles.transferView, {backgroundColor: Colors.red}]}>
          cancelled
        </Text>
      );
    }
    return null;
  };
  const renderItem = ({item, index}) => {
    let total_bookings = item?.meta && JSON.parse(item?.meta?.toString());
    return (
      <Pressable
        onPress={() => {
          setPayoutDetailsVisible(true);
          setPayoutDetailsData(item);
        }}
        key={index}
        style={{
          flex: 1,
          paddingHorizontal: hp(2),
          paddingVertical: hp(2),
          alignItems: 'center',
          backgroundColor: Colors.white,
        }}>
        <View style={styles.flexBox}>
          <Text style={styles.topText}>
            {moment(item?.dispatch_at).format('Do MMM YYYY')}
          </Text>
          <Text style={[styles.topText, {color: Colors.darkBlue}]}>
            Rs. {item?.final_payout}
          </Text>
        </View>
        <Text style={[styles.bottomText, {width: '100%', marginTop: hp(1)}]}>
          Number of Orders: {total_bookings?.total_bookings}
        </Text>
        <View style={styles.flexBox}>
          <Text style={[styles.bottomText, {width: '65%'}]}>
            Transaction Id: {item?.bank_transaction_id}
          </Text>
          {renderStatus(item)}
        </View>
      </Pressable>
    );
  };
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'PayOuts'}
        right={true}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.tableView}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={payoutList?.payouts}
            extraData={payoutList?.payouts}
            onEndReachedThreshold={0.5}
            onRefresh={() => fetchData({}, payoutList?.paging?.next_page || 1)}
            refreshing={isLoading}
            onEndReached={() =>
              fetchData({}, payoutList?.paging?.next_page || 1)
            }
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <View style={[STYLES.separatorView, {marginTop: 0}]} />
            )}
            ListEmptyComponent={() => (
              <View style={{marginTop: hp(20), ...STYLES.common}}>
                <Image
                  source={require('../../../assets/images/empty_payouts.png')}
                  style={{height: wp(30), width: wp(30)}}
                  resizeMode={'contain'}
                />
                <Text style={STYLES.emptyText}>
                  There are no reports generated.
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
      <FilterButton onPress={() => setFilterVisible(true)} />
      <PayOutDetails
        visible={payoutDetailsVisible}
        data={payoutDetailsData}
        onCloseIcon={() => {
          setPayoutDetailsVisible(false);
          setPayoutDetailsData({});
        }}
      />
      <CustomModalAndroid
        visible={filterVisible}
        onPress={() => setFilterVisible(false)}>
        <Text style={STYLES.modalHeaderText}>FILTERS</Text>
        <CloseIcon onPress={() => setFilterVisible(false)} />
        <View style={{marginTop: hp(2)}}>
          <View
            style={{
              flexDirection: 'row',
              width: wp(85),
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            {['from', 'to'].map((item, index) => {
              return (
                <View style={{width: '46%'}} key={index}>
                  <Text
                    style={[
                      STYLES.inputTextLabel,
                      {textTransform: 'capitalize'},
                    ]}>
                    {item} Date
                  </Text>
                  <View style={STYLES.dateView}>
                    <DatePicker
                      style={STYLES.datePicker}
                      date={moment(
                        item === 'from' ? filterData?.from : filterData?.to,
                      ).format('D MMM yyyy')}
                      mode="date"
                      placeholder="Select date"
                      format="D MMM yyyy"
                      maxDate={new Date()}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      iconComponent={
                        <Entypo
                          name={'calendar'}
                          size={hp(3)}
                          color={Colors.inputTextColor}
                          style={{
                            position: 'relative',
                            right: hp(1),
                          }}
                        />
                      }
                      customStyles={{
                        dateInput: STYLES.dateInput,
                        dateText: STYLES.dateText,
                      }}
                      onDateChange={(date) => {
                        setFilterData({
                          ...filterData,
                          [item]: date,
                        });
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={[
            {marginVertical: hp(2)},
            Platform.OS !== 'android' && {zIndex: 5001},
          ]}>
          <DropDownAndroid
            label={'Status'}
            value={filterData?.status}
            width={wp(90)}
            items={filterOptions}
            onChangeItem={(text) =>
              setFilterData({
                ...filterData,
                status: text,
              })
            }
          />
        </View>
        <FlatButton
          label={'apply'}
          onPress={() => {
            fetchData(filterData);
            setFilterVisible(false);
          }}
        />
      </CustomModalAndroid>
    </LinearGradient>
  );
};

export default PayOuts;

const styles = StyleSheet.create({
  tableView: {
    borderWidth: 1,
    borderColor: Colors.silver,
    overflow: 'hidden',
    flex: 1,
  },
  topText: {
    fontFamily: 'Roboto-Bold',
    color: Colors.inputTextColor,
    fontSize: wp(4),
  },
  bottomText: {
    fontFamily: 'Roboto-Light',
    color: Colors.inputTextColor,
    fontSize: wp(3.8),
  },
  transferView: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontFamily: 'Gilroy-SemiBold',
    // borderWidth: 0.5,
    // borderColor: Colors.inputTextColor,
    borderRadius: 5,
    fontSize: wp(3.8),
    maxWidth: '35%',
    textTransform: 'uppercase',
    color: Colors.white,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  sliderStyle: {
    width: wp(48),
    alignSelf: 'center',
    marginHorizontal: wp(2),
  },
  manPowerView: {
    borderWidth: 2,
    borderRadius: 10,
    height: wp(12),
    width: wp(16),
    marginVertical: hp(1),
    borderColor: Colors.silver,
    ...STYLES.common,
  },
  dateBottomText: {
    fontFamily: 'Roboto-Regular',
    marginTop: 0,
    fontSize: wp(3.5),
    color: '#99A0A5',
    marginLeft: wp(2),
  },
});
