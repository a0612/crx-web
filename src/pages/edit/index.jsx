import { useState, useRef, useEffect } from 'react'
import './index.scss'
import Logo from '../../assets/img/logo.png'
import duiIcon from '../../assets/img/dui.png'
import { Form, Input, Select, Switch, message, Upload, Modal } from 'antd';
import defaultIcon from "@/assets/img/default-icon.svg";
import plus from "@/assets/img/plus.svg"
import Tag from "./components/Tag";
import headerIconLoadingImg from "@/assets/img/header-icon-loading.svg";
import ellipsis from "@/assets/img/ellipsis.svg";
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import API from "@/api";

const stepList = [
  {
    step: 1,
    number: '01',
    font: 'Basic Info'
  },
  {
    step: 2,
    number: '02',
    font: 'Data Init'
  },
  {
    step: 3,
    number: '03',
    font: 'Finish'
  },
]

let dataPicker = {
  today: new Date(),
  config: {
      yearMax: 2023,
      yearMin: 1940,
  },
  year: {},
  yearList: [],
  monthList: [
    { label: 'January', value: 'January' },
    { label: 'July', value: 'July' },
    { label: 'February', value: 'February' },
    { label: 'August', value: 'August' },
    { label: 'March', value: 'March' },
    { label: 'September', value: 'September' },
    { label: 'April', value: 'April' },
    { label: 'October', value: 'October' },
    { label: 'May', value: 'May' },
    { label: 'November', value: 'November' },
    { label: 'June', value: 'June' },
    { label: 'December', value: 'December' }],
  month: {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  },
  monthMap: {
    'January': "01",
    'February': "02",
    'March': "03",
    'April': "04",
    'May': "05",
    'June': "06",
    'July': "07",
    'August': "08",
    'September': "09",
    'October': "10",
    'November': "11",
    'December': "12"
  },
  dayMap: {
    1: "01",
    2: "02",
    3: "03",
    4: "04",
    5: "05",
    6: "06",
    7: "07",
    8: "08",
    9: "09",
    10: "10",
    11: "11",
    12: "12",
    13: "13",
    14: "14",
    15: "15",
    16: "16",
    17: "17",
    18: "18",
    19: "19",
    20: "20",
    21: "01",
    22: "22",
    23: "23",
    24: "24",
    25: "25",
    26: "26",
    27: "27",
    28: "28",
    29: "29",
    30: "30",
    31: "31",
  },
  init: function () {
    let Year = {}
    let tempyearlist = []
    for (let i = this.config.yearMin; i <= this.config.yearMax; i++) {
      tempyearlist.push({ label: i, value: i })
      let Month = {
        'January': 0,
        'February': 0,
        'March': 0,
        'April': 0,
        'May': 0,
        'June': 0,
        'July': 0,
        'August': 0,
        'September': 0,
        'October': 0,
        'November': 0,
        'December': 0,
      }
      for (let prop in Month) {
        Month[prop] = this.getDaysInMonth(i, prop)
      }
      Year[i] = Month
    }
    this.year = Year
    this.yearList = tempyearlist.reverse()
  },
  isLeapYear: function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  },
  getDaysInMonth: function (year, Month) {
      switch (Month) {
          case 'January':
              return 31;
          case 'February':
              return this.isLeapYear(year) ? 29 : 28;
          case 'March':
              return 31;
          case 'April':
              return 30;
          case 'May':
              return 31;
          case 'June':
              return 30;
          case 'July':
              return 31;
          case 'August':
              return 31;
          case 'September':
              return 30;
          case 'October':
              return 31;
          case 'November':
              return 30;
          case 'December':
              return 31;
          default: 
            return
      }
      return 0
  },
  dataParse: function (year, month, day) {
      // @ts-ignore
      let birth = year + '-' + this.monthMap[month] + '-' + this.dayMap[day]
      return Date.parse(birth) / 1000
  }
}

const getDays = (year, Month) => {
  let day = dataPicker.year[year][Month]
  let days = []
  for (let i = 1; i <= day; i++) {
      days.push({ label: i, value: i },)
  }
  return days
}


function Home() {
  dataPicker.init()
  const [step, setStep] = useState(1)
  const [currentYear, setCurrentYear] = useState(dataPicker.today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState('September')
  const [currentDay, setCurrentDay] = useState(24)
  const [currentDayList, setCurrentDayList] = useState(getDays(dataPicker.today.getFullYear(), 'June'))
  const interestsRef = useRef()
  const expertiseRef = useRef()
  const select2Ref = useRef()
  const select3Ref = useRef()
  const select4Ref = useRef()
  const userIconRef = useRef()

  const [canSave, setCanSave] = useState(false)
  const [expertiseTags, setExpertiseTags] = useState([])
  const [ifEPlus, setIfEPlus] = useState(true);
  const [expertiseActive, setExpertiseActive] = useState(false)
  const [interestsTags, setInterestsTags] = useState([])
  const [ifIPlus, setIfIPlus] = useState(true);
  const [expertisePlus, setExpertisePlus] = useState(false)
  const [interestsPlus, setInterestsPlus] = useState(false)
  const [interestsActive, setInterestsActive] = useState(false)
  const [iconMask, setIconMask] = useState(false)
  const [floatOptions, setFloatOptions] = useState(false)
  const [userIconLoadingFlag, setUserIconLoadingFlag] = useState(true);
  const [imgsList, setImgsList] = useState([defaultIcon]);
  const [imageUrl, setImageUrl] = useState('');

  const [twitterIconActive, setTwitterIconActive] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('t');
    if (token) {
      // 设置cookie值
      Cookies.set('token', token);
      history.replace('/edit');
    } else {
      const token = Cookies.get('token');
      console.log('token === ', token);
      getSelectData()
    }
  }, [location.search]);


  const [uInfo, setUInfo] = useState({
    birthday: 0,
    expertises: '',
    icon: '',
    id: 0,
    interests: '',
    intro: '',
    self_introduction: '',
    location: '',
    name: '',
    nick_name: '',
    sex: '',
    allow_data_for_training: true
  })
  const [curUInfo, setCurUInfo] = useState({
    icon: '',
    name: '',
    nick_name: '',
  })

  const formRef = useRef(null);

  const handleClick = (flag) => {
    console.log('uInfo ==== ', uInfo)
    console.log('expertiseTags ==== ', expertiseTags)
    console.log('interestsTags ==== ', interestsTags)

    if (flag > 0) {
      switch (step) {
        case 1:
          setStep(2)
          break;
        case 2:
          updateInfo()
          break;
        default:
          break;
      }
    } else {
      setStep(step + flag)
    }
  }
  const updateInfo = async () => {
    const res = await API.createBot({
      allow_data_for_training: uInfo.allow_data_for_training,
      birthday: uInfo.birthday,
      expertises: uInfo.expertises,
      icon: uInfo.icon,
      interests: uInfo.interests,
      intro: uInfo.intro,
      location: uInfo.location,
      name: uInfo.nick_name,
      self_introduction: uInfo.self_introduction,
      sex: uInfo.sex
    })
    const {code, data} = res.data
    if (code === 200) {
      console.log('创建成功 === ', data)
      // 跳转到finish步骤
      finishHandle()
    } else {
      console.error('创建失败 === ', data)
    }
  }

  const finishHandle = async () => {
    const res = await API.getBot({})
    const {code, data} = res.data
    if (code === 200) {
      console.log('拿到创建成功的机器人信息 === ', data)
      // 跳转到finish步骤
      setStep(3)
      // todo 展示finish机器人信息
    } else {
      console.error('创建失败 === ', data)
    }
  }

  const getSelectData = async () => {
    const res = await API.getUserInfo({})
    const { code, data } = res.data
    if (code === 200) {
      if (data.birthday) {
        const year = data.birthday.getFullYear(); // 获取年份
        const month = data.birthday.getMonth() + 1; // 获取月份（注意：月份是从0开始计数，所以需要加1）
        const day = data.birthday.getDate(); // 获取日期
        selectYearOnchange(year)
        selectMonthOnchange(dataPicker.monthList[month])
        selectDayOnchange(day)
      }
      if (data.expertises) {
        const str = data.expertises.split(',')
        const arr = str.map(item => {return {label: item, value: item}})
        setExpertiseTags(arr)
      }
      if (data.interests) {
        const str = data.interests.split(',')
        const arr = str.map(item => {return {label: item, value: item}})
        setInterestsTags(arr)
      }
      setUInfo({
        ...data,
      })
      setCurUInfo({
        icon: data.icon,
        nick_name: data.nick_name,
        name: data.name,
      })
    }
  }

  const subTags = (value) => {
    const result = expertiseTags.filter((item, index) => {
        return value !== index
    })
    setExpertiseTags(result)

    let tempUinfo = { ...uInfo }
    let tempInterest = ''
    result?.forEach((item) => {
      if (tempInterest === '') {
          tempInterest = tempInterest + item.value
      } else {
          tempInterest = tempInterest + ',' + item.value
      }
    })
    tempUinfo.expertises = tempInterest
    setUInfo(tempUinfo)

    userInfoCheck(uInfo.sex)
    scrollwToRight()
    setIfEPlus(true)
  }

  const selectMonthOnchange = (value) => {
    setCurrentMonth(value)
    setCurrentDayList(getDays(currentYear, value))
    let day = dataPicker.year[currentYear][value]
    let tempUinfo = { ...uInfo }

    if (currentDay > day) {
        setCurrentDay(day)
        tempUinfo.birthday = dataPicker.dataParse(currentYear, value, day)
    } else {
        tempUinfo.birthday = dataPicker.dataParse(currentYear, value, currentDay)
    }
    setUInfo(tempUinfo)
    userInfoCheck(uInfo.sex)
  }

  const selectDayOnchange = (value) => {
    setCurrentDay(value)
    let tempUinfo = { ...uInfo }
    tempUinfo.birthday = dataPicker.dataParse(currentYear, currentMonth, value)
    setUInfo(tempUinfo)
    userInfoCheck(uInfo.sex)
  }

  const selectYearOnchange = (value) => {
    setCurrentYear(value)
    setCurrentDayList(getDays(value, currentMonth))
    // @ts-ignore
    let day = dataPicker.year[value][currentMonth]
    let tempUinfo = { ...uInfo }
    if (currentDay > day) {
        setCurrentDay(day)
        tempUinfo.birthday = dataPicker.dataParse(value, currentMonth, day)
    } else {
        tempUinfo.birthday = dataPicker.dataParse(value, currentMonth, currentDay)
    }
    setUInfo(tempUinfo)
    userInfoCheck(uInfo.sex)
  }

  const userInfoCheck = (sex) => {
    if (uInfo.nick_name.trim() === '' || fillterAllSpace(uInfo.nick_name).length > 25) {
        setCanSave(false)
        // message.warning('The nick_name does not comply with the check rule');
        return;
    }
    if (sex === 0) {
        setCanSave(false)
        return;
    }

    if (uInfo.intro.trim() === '' || fillterAllSpace(uInfo.intro).length > 200) {
        setCanSave(false)
        message.warning('The intro does not comply with the check rule');
        return
    }

    const reg = new RegExp(/^[a-zA-Z0-9_]*$/g);
    if ((uInfo.name?.trim() === '') || ((uInfo.name?.trim()?.length || 0) < 5) || fillterAllSpace(uInfo.name || '').length > 25 || (!reg.test(uInfo.name || ""))) {
        setCanSave(false)
        message.warning('The name does not comply with the check rule');
        return;
    }


    if (fillterAllSpace(uInfo.location).length > 25) {
        setCanSave(false)
        message.warning('The location does not comply with the check rule');
        return
    }

    setCanSave(true)
  }

  const fillterAllSpace = (str) => {
    return str.replaceAll(" ", "")
  }

  const addexpertiseTags = () => {
    if (expertiseTags.length > 0) {
      if (expertiseTags[expertiseTags.length - 1].value === '') {
          return
      }
      if (expertiseTags.length >= 3) {
          setIfEPlus(false)
          message.warning('Expertise over the limit')
          return
      } else {
          setIfEPlus(true)
      }
    }

    let temptags = [...expertiseTags, { label: '', value: '' }]
    setExpertiseTags(temptags)

    let tempUinfo = { ...uInfo }
    let tempInterest = ''
    temptags?.forEach((item) => {
      if (tempInterest === '') {
          tempInterest = tempInterest + item.value
      } else {
          tempInterest = tempInterest + ',' + item.value
      }
    })
    tempUinfo.expertises = tempInterest
    setUInfo(tempUinfo)
    scrollwToRight()
  }

  const scrollwToRight = () => {
    setTimeout(() => {
      interestsRef.current.scrollLeft = interestsRef.current.scrollWidth;
      expertiseRef.current.scrollLeft = expertiseRef.current.scrollWidth;
    }, 100)
  }

  const inputObul = (value, index) => {
    let temptag = [...expertiseTags]
    if (temptag.length >= 3) {
      setIfEPlus(false)
    } else {
      setIfEPlus(true)
    }
    temptag[index] = { label: value, value: value }
    setExpertiseTags(temptag)

    let tempUinfo = { ...uInfo }
    let tempInterest = ''
    temptag?.forEach((item) => {
      if (item.value.trim() !== '') {
        if (tempInterest === '') {
          tempInterest = tempInterest + item.value
        } else {
          tempInterest = tempInterest + ',' + item.value
        }
      }
    })
    tempUinfo.expertises = tempInterest
    setUInfo(tempUinfo)
    userInfoCheck(uInfo.sex)
    setExpertiseActive(false)
    scrollwToRight()
  }

  const addIntrestTags = () => {
    if (interestsTags.length > 0) {
        if (interestsTags[interestsTags.length - 1].value === '') {
            return
        }
        if (interestsTags.length >= 3) {
            setIfIPlus(false)
            message.warning('Interests over the limit');
            return
        } else {
            setIfIPlus(true)
        }
    }
    let temptags = [...interestsTags, { label: '', value: '' }]
    console.log('当前的tags ===== ', JSON.stringify(temptags))
    setInterestsTags(temptags)
    let tempUinfo = { ...uInfo }
    let tempInterest = ''
    temptags?.forEach((item) => {
        if (tempInterest === '') {
            tempInterest = tempInterest + item.value
        } else {
            tempInterest = tempInterest + ',' + item.value
        }
    })
    tempUinfo.interests = tempInterest
    setUInfo(tempUinfo)
    scrollwToRight()
  }

  const poPTag = (type) => {
    if (type === 'expertises') {
        let tempTags = [...expertiseTags]
        tempTags.pop()
        setExpertiseTags(tempTags)

        let tempUinfo = { ...uInfo }
        let tempExperise = ''
        tempTags?.forEach((item) => {
            if (tempExperise === '') {
                tempExperise = tempExperise + item.value
            } else {
                tempExperise = tempExperise + ',' + item.value
            }
        })
        tempUinfo.expertises = tempExperise
        setUInfo(tempUinfo)
        setIfEPlus(true)
    } else if (type === 'interests') {
        let tempTags = [...interestsTags]
        tempTags.pop()
        setInterestsTags(tempTags)
        let tempUinfo = { ...uInfo }
        let tempInterest = ''
        tempTags?.forEach((item) => {
            if (tempInterest === '') {
                tempInterest = tempInterest + item.value
            } else {
                tempInterest = tempInterest + ',' + item.value
            }
        })
        tempUinfo.interests = tempInterest
        setUInfo(tempUinfo)
        setIfIPlus(true)
    }
  }

  const inputIntrestOburl = (value, index) => {
    let temptag = [...interestsTags]
    if (temptag.length >= 3) {
        setIfIPlus(false)
    } else {
        setIfIPlus(true)
    }
    temptag[index] = { label: value, value: value }
    setInterestsTags(temptag)
    let tempUinfo = { ...uInfo }
    let tempInterest = ''
    temptag?.forEach((item) => {
        if (item.value.trim() !== '') {
            if (tempInterest === '') {
                tempInterest = tempInterest + item.value
            } else {
                tempInterest = tempInterest + ',' + item.value
            }
        }

    })
    tempUinfo.interests = tempInterest
    setUInfo(tempUinfo)
    userInfoCheck(uInfo.sex)
    setInterestsActive(false)
    scrollwToRight()
  }

  const subIntrestTags = (value) => {
    const result = interestsTags.filter((item, index) => {
        return value !== index
    })
    setInterestsTags(result)
    let tempUinfo = { ...uInfo }
    let tempInterest = ''
    result?.forEach((item) => {
        if (tempInterest === '') {
            tempInterest = tempInterest + item.value
        } else {
            tempInterest = tempInterest + ',' + item.value
        }
    })
    tempUinfo.interests = tempInterest
    setUInfo(tempUinfo)
    userInfoCheck(uInfo.sex)
    scrollwToRight()
    setIfIPlus(true)
  }

  const handleChange = (info) => {
    const {file} = info
    if (file.status === 'done' && file.response.code === 200) {
      const {url} = file.response.data
      setImageUrl(url);
    }
  };

  const uploadButton = (
    <div style={{width: '100%', height: '100%'}} />
  );

  const handleInputChange = (e, objKey) => {
    const infoFlag = {
      ...uInfo
    }
    infoFlag[objKey] = e.target.value
    setUInfo(infoFlag)
  }

  useEffect(() => {
    if (uInfo.icon) {
      setUserIconLoadingFlag(true);
      let image = new Image();
      image.src = uInfo.icon;
      image.onload = function () {
        setUserIconLoadingFlag(false);
      }
    }
  }, [uInfo.icon])

  const handleChangeTwitterIconActive = () => {
    setModalVisible(true)
  }

  const handleChangeIconActive = (state) => {
    setTwitterIconActive(state)
    setModalVisible(false)
  }

  const getBot = async () => {
    const res = await API.getBot({})
    const {code, data} = res.data
    if (code === 200) {
      console.log('获取机器人信息 === ', data)
    } else {
      console.error('获取 === ', data)
    }
  }
  
  const platformBind = async (action) => {
    const res = await API.platformBind({
      is_delete: action,
      platform: 1,  // 推特1，ins:2
      // token: string, // token应该在header会自带，参数是否还需要
      // verify: string // 这个是什么
    })
    const {code, data} = res.data
    if (code === 200) {
      console.log('获取机器人信息 === ', data)
      // todo,解绑成功,更新绑定状态icon
    } else {
      console.error('获取 === ', data)
    }
  }

  return <div className="page-edit">
    <div className="page-edit-header">
      <div className="crx-logo">
        <img src={Logo} alt="" />
      </div>
      <div className="user-infos">
        <div className="user-avatar">
          <img src={curUInfo.icon} alt="" />
        </div>
        <div className="user-desc">
          <div className="user-name">
            {curUInfo.name}
          </div>
          <div className="user-id">
            {curUInfo.nick_name}
          </div>
        </div>
      </div>
    </div>
    <div className="page-edit-container">
      <div className="page-container-box">
        {/* 进度条 */}
        <div className="process-box">
          <div className="process-title">
            Create Your AI Social Avatar
          </div>
          <div className="process-desc">
            <div className="process-list">
              {
                stepList.map(item => {
                  return <div className={`process-item${item.step <= step ? ' active' : ''}`} key={item.step}>
                  <div className="process-item-circle">
                    {item.number}
                  </div>
                  <div className="process-item-text">
                    {item.font}
                  </div>
                </div>
                })
              }
            </div>
            <div className='process-line'>
              <div className={`process-line-active avtive-${step}`}></div>
            </div>
          </div>
        </div>
        {/* 头像 */}
        {
          step === 1 ? (
            <div className="form-avatar-container">
              <div className='edit-user-icon'
                onMouseEnter={() => { setIconMask(true) }}
                onMouseLeave={() => { setIconMask(floatOptions) }}
                ref={userIconRef}
              >
                  {
                    userIconLoadingFlag
                        ?
                        <img className='loading-img' src={headerIconLoadingImg} alt="" />
                        :
                        <img src={uInfo.icon} alt={''} />
                  }
                  {
                      iconMask &&
                      <div className='icon-mask' onClick={(e) => { e.stopPropagation(); setFloatOptions(!floatOptions) }} >
                          <img alt={''} src={ellipsis} />
                      </div>
                  }
                  {
                      floatOptions &&
                      <div className='float-options'>
                          <div className='options'>
                              <span>System Avatar</span>
                              <div className='icons'>
                                  {
                                      imgsList?.map((item, index) => {
                                          return (
                                              <img key={index} src={item} alt={''}
                                                  onClick={(e) => {
                                                      e.stopPropagation()
                                                      let tempUinfo = { ...uInfo }
                                                      tempUinfo.icon = item
                                                      setUInfo(tempUinfo)
                                                      setFloatOptions(false)
                                                      setIconMask(false)
                                                  }}
                                              />
                                          )
                                      })
                                  }
                              </div>
                          </div>
                          <div className='customization'>
                              <span>Custom</span>
                              <div className='upload-icon' >
                                <Upload
                                  accept="image/*"
                                  action="/app/file/upload"
                                  name="avatar"
                                  className="avatar-uploader"
                                  showUploadList={false}
                                  headers={
                                    {
                                      'Content-Type': 'multipart/form-data',
                                      'token': Cookies.get('token')
                                    }
                                  }
                                  onChange={handleChange}
                                >
                                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>

                                {/* <input accept="image/*"
                                  action='https://pre.wwttxx2.online/app/file/upload'
                                  onClick={(event) => { event.target.value = null }}
                                  onChange={(e) => { imgUploadSuccess(e) }}
                                  className='upload-file' 
                                  type="file" 
                                /> */}
                              </div>
                          </div>
                      </div>
                  }
              </div>

                <div className='my-form-item'>
                  <div className="form-title require">
                    Name
                  </div>
                  <div className="form-desc">
                    <Input value={uInfo.nick_name} onChange={e => handleInputChange(e, 'nick_name')} />
                  </div>
                </div>

                <div className='my-form-item'>
                  <div className="form-title require">
                    Sex
                  </div>
                  <div className="form-desc">
                    <Select 
                      defaultValue={uInfo.sex || ''}
                      options={[
                        { value: 1, label: 'Male' },
                        { value: 2, label: 'Female' },
                        { value: 3, label: 'Non-binary' },
                        { value: 4, label: 'Bigender' },
                        { value: 5, label: 'Agender' },
                      ]}
                      onChange={(value) => {
                        const infoFlag = {
                          ...uInfo
                        }
                        infoFlag.sex = value
                        setUInfo(infoFlag)
                      }}
                    />
                  </div>
                </div>

                <div className='my-form-item'>
                  <div className="form-title require">
                    Bio
                  </div>
                  <div className="form-desc">
                    <Input.TextArea defaultValue={uInfo.intro} onChange={e => handleInputChange(e, 'intro')}/>
                  </div>
                </div>

                <div className="tip-text">
                  More information to meet more people
                </div>

                <div className='my-form-item'>
                  <div className="form-title require">
                    Self-introduction
                  </div>
                  <div className='sub-tip-text'>
                    Use a few sentences to describe yourself in detail
                  </div>
                  <div className="form-desc">
                    <Input.TextArea onChange={e => handleInputChange(e, 'self_introduction')} />
                  </div>
                </div>


                <div className='my-form-item'>
                  <div className="form-title">
                    Birthday
                  </div>
                  <div className="form-desc">
                    <div className='birthday'>
                      <div className='month' ref={select2Ref}>
                        <Select
                          defaultValue={currentMonth}
                          height={47}
                          width={50}
                          options={dataPicker.monthList}
                          placeholder={"Month"}
                          onChange={selectMonthOnchange} />
                      </div>
                      <div className='day' ref={select3Ref}>
                        <Select
                          defaultValue={currentDay}
                          height={47}
                          options={currentDayList}
                          placeholder={"Day"}
                          onChange={selectDayOnchange} />
                      </div>
                      <div className='year' ref={select4Ref}>
                        <Select
                          defaultValue={currentYear}
                          height={47}
                          options={dataPicker.yearList}
                          placeholder={"Year"}
                          onChange={selectYearOnchange} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='my-form-item'>
                  <div className="form-title">
                    Location
                  </div>
                  <div className="form-desc">
                    <Input defaultValue={uInfo.location} onChange={e => handleInputChange(e, 'location')}/>
                  </div>
                </div>
                <div className="tip-text">
                  Expertise
                </div>
                <span className='sub-tip-text'>Currently display up to three expertise</span>
                <div className='expertise'>
                  <div ref={expertiseRef} className='expertise-tag'>
                    {
                      expertiseTags?.map((item, index) => {
                        return (
                          <Tag key={index + item.label + item.value}
                            value={item.value}
                            index={index}
                            onblur={inputObul}
                            onFocus={() => {
                                setExpertiseActive(true)
                            }}
                            closeTagAction={subTags} />
                        )
                      })
                    }
                    {
                      ifEPlus &&
                      <div className={`tag-plus${expertiseActive ? ' active' : ''}`}
                        onMouseEnter={() => {
                          if (expertiseActive) {
                              setExpertisePlus(true)
                          }
                        }}
                        onMouseLeave={() => {
                            setExpertisePlus(false)
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (expertisePlus) {
                                poPTag('expertises')
                            } else {
                                addexpertiseTags()
                            }
                        }}>
                        <img src={plus} alt={''} />
                      </div>
                    }
                  </div>
                  {/* <span className='input-limit'>{inputNum.expertises}<span>/25</span></span> */}
                </div>
                <div className='bank-expertise'>Interests</div>
                  <span className='sub-tip-text'>Currently display up to three interests</span>
                  <div className='interests'>
                      <div className='expertise'>
                          <div ref={interestsRef}
                              className='expertise-tag'>
                              {
                                interestsTags?.map((item, index) => {
                                  return (
                                    <Tag
                                      key={index + item.label + item.value}
                                      value={item.value}
                                      index={index}
                                      onblur={inputIntrestOburl}
                                      onFocus={() => { setInterestsActive(true) }}
                                      closeTagAction={subIntrestTags} />
                                  )
                                })
                              }
                              {
                                ifIPlus &&
                                <div className={`tag-plus${interestsActive ? ' active' : ''}`}
                                  onMouseEnter={() => {
                                    if (interestsActive) {
                                      setInterestsPlus(true)
                                    }
                                  }}
                                  onMouseLeave={() => {
                                    setInterestsPlus(false)
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (interestsPlus) {
                                        poPTag('interests')
                                    } else {
                                        addIntrestTags();
                                    }
                                  }}>
                                  <img src={plus} alt={''} />
                                </div>
                              }
                          </div>
                          {/* <span className='input-limit'>{inputNum.interests}<span>/25</span></span> */}
                      </div>
                  </div>
            </div>
          ) : step === 2 ? 
          <div className='step-2-container'>
            <div className="tips-item">
              <div className="step-tip-title">
                Using the data you generated in Grown
              </div>
              <div className="step-tip-content">
                The content and social behaviors you generate in Grown will help <span className='color-orange'>XXX(AI Name)</span> gradually master your skills.
              </div>
            </div>
            <div className="tips-item">
              <div className="step-tip-title">
                Link your social media and authorize use
              </div>
              <div className="step-tip-content">
                This will make <span className='color-orange'>XXX(AI Name)</span> more like you. About data privacy <span className='color-green'>Policy</span>
              </div>
            </div>
            <div className="step-2-icons">
              <div className="step-2-twitter">
                {
                  twitterIconActive ? <>
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect y="2" width="40" height="40" rx="20" fill="black"/>
                      <path d="M13.375 31.5H10L26.625 12.5H30L13.375 31.5Z" fill="white"/>
                      <path d="M24.7403 30.75L11.0397 13.25H15.2597L28.9603 30.75H24.7403Z" fill="black" stroke="white"/>
                      <circle cx="34" cy="8" r="8" fill="#FF4040"/>
                      <rect x="38.9365" y="7.20048" width="1.62073" height="9.72438" transform="rotate(90 38.9365 7.20048)" fill="white"/>
                    </svg>
                    <div className="icon-close-btn can-click" onClick={handleChangeTwitterIconActive}></div>
                  </> : <svg className='can-click' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => platformBind(true)}>
                  <rect width="40" height="40" rx="20" fill="#A0A7AF"/>
                  <path d="M13.375 29.5H10L26.625 10.5H30L13.375 29.5Z" fill="white"/>
                  <path d="M24.7403 28.75L11.0397 11.25H15.2597L28.9603 28.75H24.7403Z" fill="#A0A7AF" stroke="white"/>
                  </svg>
                }
              </div>
            </div>
            <div className="switch-container">
              <Switch checked={uInfo.allow_data_for_training} className='green-switch' onChange={(value) => {
                let tempUinfo = { ...uInfo }
                tempUinfo.allow_data_for_training = value
                setUInfo({...tempUinfo})
              }}/>
            </div>
          </div> : 
          <div className='step-3-container'>
            <div className='finish-user-info'>
              <div className="finish-user-avatar">

              </div>
              <div className="finish-user-name">
                Jaen Cooper
              </div>
            </div>
            <div className="finish-result">
              <div className="result-icon">
                <img src={duiIcon} alt="" />
              </div>
              Your social avatar has successfully gone live
            </div>
          </div>
        }
      </div>
    </div>
    {
      step !== 3 && (
        <div className="page-footer">
          <div className="foot-btns">
            { step < 3 && <div className="can-click button-item green" onClick={() => handleClick(1)}>Next</div> }
            {/* <div className="can-click button-item">Close</div> */}
            {step > 1 && <div className="can-click button-item" onClick={() => handleClick(-1)}>Back</div>}
          </div>
        </div>
      )
    }
    <Modal open={modalVisible} footer={null} onCancel={() => {setModalVisible(false)}}>
      <div className="modal-container">
        <div className="modal-title">
          Discard changes?
        </div>
        <div className="modal-desc">
          Do you want to disconnect your Twitter account?
        </div>
        <div className="modal-btns">
          <div className="modal-btn-item can-click" onClick={() => {setModalVisible(false)}}>
            Cancel
          </div>
          <div className="modal-btn-item color-red can-click" onClick={() => platformBind(false)}>
            Disconnect
          </div>
        </div>
      </div>
    </Modal>
  </div>
}

export default Home