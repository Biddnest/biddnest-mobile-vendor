import {Colors, hp, wp} from './colors';

export const STYLES = {
  textHeader: {
    fontFamily: 'Gilroy-Light',
    fontSize: wp(3.5),
    color: Colors.inputTextColor,
    textAlign: 'center',
  },
  common: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Roboto-Italic',
    fontSize: wp(3.6),
    color: Colors.darkBlue
  },
  authScreenHeader: {
    fontFamily: 'Gilroy-Semibold',
    color: Colors.inputTextColor,
    fontSize: wp(4),
    marginBottom: hp(4),
    textTransform: 'uppercase',
  },
  modalHeaderView: {
    flexDirection: 'row',
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  modalHeaderText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(4),
  },
  tabView: {
    height: hp(7),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 0.8,
    borderColor: '#ACABCD',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.pageBG,
  },
  tabText: {
    fontSize: wp(4),
    fontFamily: 'Roboto-Medium',
  },
  inputForm: {
    marginHorizontal: wp(5),
    paddingVertical: wp(5),
    paddingHorizontal: wp(5),
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: '#DEE6ED',
    marginTop: hp(2),
  },
  locationText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(4.5),
    marginTop: hp(1),
  },
  separatorView: {
    borderWidth: 0.8,
    borderColor: Colors.silver,
    width: '100%',
    marginTop: hp(2),
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  leftText: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp(4.3),
    color: Colors.inputTextColor,
    textTransform: 'uppercase',
  },
  rightText: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(4.5),
    color: Colors.inputTextColor,
    width: '50%',
    textAlign: 'right',
  },
  statusView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.lightGreen,
    color: Colors.white,
    borderRadius: 5,
    textTransform: 'uppercase',
    fontFamily: 'Gilroy-Semibold',
    fontSize: wp(4),
  },
  priceView: {
    backgroundColor: Colors.pageBG,
    width: '45%',
    height: hp(5),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  participatedText: {
    color: Colors.darkBlue,
    fontSize: wp(5),
    fontFamily: 'Roboto-Bold',
  },
  flexBoxOrders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    width: '45%',
    color: Colors.inputTextColor,
    fontSize: wp(3.6),
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
    marginTop: 3,
  },
  staticLabel: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(4),
    color: Colors.inputTextColor,
  },
  inputTextLabel: {
    fontFamily: 'Roboto-Bold',
    color: Colors.inputTextColor,
    fontSize: wp(4),
  },
  inputTextStyle: {
    fontSize: wp(4),
    backgroundColor: Colors.textBG,
    color: Colors.inputTextColor,
    fontFamily: 'Roboto-Regular',
    height: '99%',
  },
  mapPinCircle: {
    height: wp(12),
    width: wp(12),
    borderRadius: wp(6),
    backgroundColor: Colors.pageBG,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sliderRail: {
    borderWidth: 2,
    borderColor: Colors.darkBlue,
    height: 2,
  },
  sliderThumb: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#C6DFFA',
  },
  sliderText: {
    fontFamily: 'Roboto-Light',
    fontSize: wp(3.5),
    color: Colors.inputTextColor,
  },
  sliderLabel: {
    backgroundColor: Colors.darkBlue,
    paddingVertical: 4,
    paddingHorizontal: 10,
    color: Colors.white,
    borderRadius: 3,
    overflow: 'hidden',
  },
  circleBtnView: {
    height: wp(15),
    width: wp(15),
    borderRadius: wp(7.5),
    backgroundColor: Colors.pageBG,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleBottomText: {
    fontFamily: 'Roboto-Light',
    fontSize: wp(3.8),
    color: Colors.inputTextColor,
    marginTop: 3,
  },
  rejectText: {
    marginVertical: hp(3),
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(4),
    marginHorizontal: wp(5),
    textAlign: 'center',
  }
};
