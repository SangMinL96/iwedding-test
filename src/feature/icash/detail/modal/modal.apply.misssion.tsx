import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import coinIcon from '@images/common/coin_icon.png';
import theme from '@styles/theme';
import { CommonModalProps } from '@modules/CommonInterface';
import { IcashAPI } from '@modules/mypage/icash/IcashAPI';
import { logIcashCompleteApply } from '@modules/user/UserLogAPI';
import { uploadFile } from '@service/FileUploadService';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  MissionType1,
  IcashMission,
  IcashMissionPt,
  IcashMissionType12Category,
  getType12CategoryName,
} from '@modules/mypage/icash/IcashInterface';
import { RadioboxItem } from '@components/core/checkboxes';
import { InputWithClear } from '@components/core/inputs';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { OnlyNumberRegex } from '@utils/Regex';
import { showPrice } from '@utils/util';
interface MissionApplyProps extends CommonModalProps {
  type1: MissionType1;
  mission: IcashMission;
}

const ModalApplyMission = ({ visible, onClose, type1, mission, isFullSize }: MissionApplyProps) => {
  const missionPt = useRef<IcashMissionPt>();
  const [type7Name, setType7Name] = useState('');
  const [type8Name, setType8Name] = useState('');
  // 타입 12 업종 선택 부분
  const [type12Ctagories, setType12Ctagories] = useState<IcashMissionType12Category[]>(
    Object.values(IcashMissionType12Category).map(val => val as IcashMissionType12Category),
  );

  const [tmpSelectedCategory, setTmpCategory] = useState<IcashMissionType12Category[]>([]);
  const tmpSelectCategory = (cate: IcashMissionType12Category) => () => {
    //제거
    if (tmpSelectedCategory.includes(cate)) {
      setTmpCategory(tmpSelectedCategory.filter(scate => scate != cate));
    } else {
      //추가
      // console.log('add');
      setTmpCategory(tmpSelectedCategory.concat(cate));
    }
  };

  // useEffect(() => {
  //   console.log(tmpSelectedCategory.length);
  // }, [tmpSelectedCategory]);

  const router = useRouter();

  useEffect(() => {
    if (visible) {
      const pt = new IcashMissionPt();
      pt.icashMissionNo = mission.no;
      missionPt.current = pt;
    }
  }, [visible]);

  const clear = () => {
    missionPt.current = undefined;
    setType7Name('');
    setType8Name('');
  };

  useEffect(() => {
    if (!visible) {
      clear();
    }
  }, [visible]);

  const invalidApplyInfoAlert = () => {
    return alert('미션 신청 정보를 확인해주세요.');
  };

  const confirm = useCallback(() => {
    if (missionPt.current) {
      if (type1.type1) {
        if (!missionPt.current.participantName || !missionPt.current.participantPhone) {
          return invalidApplyInfoAlert();
        }

        if (
          !/[0-9]{9,13}$/.test(missionPt.current.participantPhone) ||
          !(missionPt.current.participantPhone.length == 11 || missionPt.current.participantPhone.length == 10)
        ) {
          return alert('번호를 확인해주세요');
        }
      }

      if (type1.type2) {
        if (!missionPt.current.introSdName || !missionPt.current.introSdPhone) {
          return invalidApplyInfoAlert();
        }

        if (
          !/[0-9]{9,13}$/.test(missionPt.current.introSdPhone) ||
          !(missionPt.current.introSdPhone.length == 11 || missionPt.current.introSdPhone.length == 10)
        ) {
          return alert('번호를 확인해주세요');
        }
      }

      if (type1.type3) {
        if (!missionPt.current.introRcvPhone || !missionPt.current.introRcvName) {
          return invalidApplyInfoAlert();
        }
      }

      if (type1.type4) {
        if (!missionPt.current.storeId) {
          return invalidApplyInfoAlert();
        }
      }

      if (type1.type5) {
        if (missionPt.current.deviceType == null) {
          return invalidApplyInfoAlert();
        }
      }

      if (type1.type6) {
        if (missionPt.current.snsType == null) {
          return invalidApplyInfoAlert();
        }
      }

      if (type1.type7) {
        if (!missionPt.current.imgFileName) {
          return invalidApplyInfoAlert();
        }
      }

      if (type1.type8) {
        if (!missionPt.current.url) {
          return invalidApplyInfoAlert();
        }
      }
      if (type1.type9) {
        if (!missionPt.current.affiliateDoc) {
          return invalidApplyInfoAlert();
        }
      }
      if (type1.type12) {
        if (tmpSelectedCategory.length === 0) {
          return invalidApplyInfoAlert();
        }
      }

      missionPt.current.mission = mission;
      missionPt.current.category = tmpSelectedCategory.join(',');

      IcashAPI.applyMission(missionPt.current)
        .then(r => {
          logIcashCompleteApply(mission.name, type1.type12 ? missionPt.current?.category : '');
          router.push('/icash/mission/complete');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [missionPt.current, type1, tmpSelectedCategory]);

  const type7FileInput = (e: any) => {
    const file = e.target.files[0];
    const fileName = file.name;
    if (missionPt.current) {
      // missionPt.current.imgFileName = fileName;
      uploadFile(file)
        .then(r => {
          if (missionPt.current) missionPt.current.imgFileName = r.data.url;
          setType7Name(fileName);
        })
        .catch(err => {
          alert(err.response.data.message);
          console.log(err);
        });
    }
  };

  const type9FileInput = (e: any) => {
    const file = e.target.files[0];
    const fileName = file.name;
    if (missionPt.current) {
      // missionPt.current.imgFileName = fileName;

      uploadFile(file)
        .then(r => {
          if (missionPt.current) missionPt.current.affiliateDoc = r.data.url;
          setType8Name(fileName);
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    }
  };

  const onDeleteFile = (type7: boolean) => {
    if (type7) {
      if (missionPt.current) missionPt.current.imgFileName = '';
      setType7Name('');
    } else {
      if (missionPt.current) missionPt.current.affiliateDoc = '';
      setType8Name('');
    }
  };

  return (
    <AbstractModal
      noPadding
      visible={visible}
      onClose={onClose}
      title={'미션 신청'}
      canConfirm={true}
      onConfirm={confirm}
      isFullSize={isFullSize}
      disableMaskClick
      noFooter={false}
      isIcash={true}
    >
      <Container>
        <div>
          <div className='apply_header'>
            <p>{mission.name}</p>
            <div className='cash_text'>
              <span className='coin_img'>
                <Image unoptimized src={coinIcon} alt='coin icon' />
              </span>
              <p className='cash_num'>
                {showPrice(mission.cash)}
                <span>({mission.duplication ? '중복 가능' : '1회만'})</span>
              </p>
            </div>
          </div>

          <div className='apply_form'>
            <div className='apply_form_header'>
              <p>미션 신청 정보</p>
            </div>
            <div className='apply_form_sub_header'>
              <p>참여 정보 등록하기</p>
            </div>

            {/*신청자*/}
            {type1.type1 ? (
              <>
                <div className='form_item'>
                  <p className='item_title'>이름</p>
                  <InputWithClear
                    placeHolder='실명을 입력해주세요'
                    onChangeText={text => {
                      if (missionPt.current) missionPt.current.participantName = text;
                    }}
                    clearComplete={() => {
                      if (missionPt.current) missionPt.current.participantName = '';
                    }}
                  />
                </div>
                <div className='form_item'>
                  <p className='item_title'>연락처</p>
                  <InputWithClear
                    placeHolder='-없이 입력해 주세요.'
                    onChangeText={text => {
                      if (missionPt.current) missionPt.current.participantPhone = text;
                    }}
                    canUpdate={v => OnlyNumberRegex.test(v)}
                    clearComplete={() => {
                      if (missionPt.current) missionPt.current.participantPhone = '';
                    }}
                  />
                </div>
              </>
            ) : null}

            {type1.type2 ? (
              <>
                <div className='form_item'>
                  <p className='item_title'>이름(소개하신 분)</p>
                  <InputWithClear
                    placeHolder='실명을 입력해주세요'
                    onChangeText={text => {
                      if (missionPt.current) missionPt.current.introSdName = text;
                    }}
                    clearComplete={() => {
                      if (missionPt.current) missionPt.current.introSdName = '';
                    }}
                  />
                </div>
                <div className='form_item'>
                  <p className='item_title'>연락처(소개하신 분)</p>
                  <InputWithClear
                    placeHolder='-없이 입력해 주세요.'
                    onChangeText={text => {
                      if (missionPt.current) missionPt.current.introSdPhone = text;
                    }}
                    canUpdate={v => OnlyNumberRegex.test(v)}
                    clearComplete={() => {
                      if (missionPt.current) missionPt.current.introSdPhone = '';
                    }}
                  />
                </div>
              </>
            ) : null}

            {type1.type3 ? (
              <>
                <div className='form_item'>
                  <p className='item_title'>이름(소개 받으신 분)</p>
                  <InputWithClear
                    placeHolder='실명을 입력해주세요'
                    onChangeText={text => {
                      if (missionPt.current) missionPt.current.introRcvName = text;
                    }}
                    clearComplete={() => {
                      if (missionPt.current) missionPt.current.introRcvName = '';
                    }}
                  />
                </div>
                <div className='form_item'>
                  <p className='item_title'>연락처(소개 받으신 분)</p>
                  <InputWithClear
                    placeHolder='-없이 입력해 주세요.'
                    onChangeText={text => {
                      if (missionPt.current) missionPt.current.introRcvPhone = text;
                    }}
                    canUpdate={v => OnlyNumberRegex.test(v)}
                    clearComplete={() => {
                      if (missionPt.current) missionPt.current.introRcvPhone = '';
                    }}
                  />
                </div>
              </>
            ) : null}

            {type1.type4 ? (
              <div className='form_item'>
                <p className='item_title'>스토어 ID</p>
                <InputWithClear
                  placeHolder='스토어 ID를 입력해주세요.'
                  onChangeText={text => {
                    if (missionPt.current) missionPt.current.storeId = text;
                  }}
                  clearComplete={() => {
                    if (missionPt.current) missionPt.current.storeId = '';
                  }}
                />
              </div>
            ) : null}

            {type1.type5 ? (
              <div className='form_item'>
                <p className='item_title'>기기유형</p>
                <RadioboxItem
                  title='구글 플레이 스토어(안드로이드)'
                  onSelect={() => {
                    if (missionPt.current) missionPt.current.deviceType = 1;
                  }}
                  id='android'
                  name='platform'
                />
                <RadioboxItem
                  title='앱스토어(IOS)'
                  onSelect={() => {
                    if (missionPt.current) missionPt.current.deviceType = 2;
                  }}
                  id='ios'
                  name='platform'
                />
              </div>
            ) : null}

            {type1.type6 ? (
              <div className='form_item'>
                <p className='item_title'>SNS 유형</p>
                <RadioboxItem
                  id={'blog'}
                  name='sns'
                  title='블로그'
                  onSelect={() => {
                    if (missionPt.current) missionPt.current.snsType = 1;
                  }}
                />
                <RadioboxItem
                  id={'insta'}
                  name='sns'
                  title='인스타그램'
                  onSelect={() => {
                    if (missionPt.current) missionPt.current.snsType = 2;
                  }}
                />
                <RadioboxItem
                  id={'face'}
                  name='sns'
                  title='페이스북'
                  onSelect={() => {
                    if (missionPt.current) missionPt.current.snsType = 3;
                  }}
                />
                <RadioboxItem
                  id={'etc'}
                  name='sns'
                  title='카페/기타 커뮤니티'
                  onSelect={() => {
                    if (missionPt.current) missionPt.current.snsType = 4;
                  }}
                />
              </div>
            ) : null}

            {type1.type7 ? (
              <div className='form_item attachment_item'>
                <div className='attachment_title'>
                  <p>{type1.type7MenuName}</p>
                  <button
                    className='attachment_btn'
                    onClick={e => {
                      e.stopPropagation();
                      document.getElementById('label_7')?.click();
                    }}
                  >
                    사진첨부
                  </button>
                  <label id='label_7' htmlFor='type7' style={{ display: 'none' }}>
                    사진첨부
                  </label>
                  <input type='file' onChange={type7FileInput} id='type7' style={{ display: 'none' }} />
                </div>
                <div className='attachment_input_box'>
                  <input type='text' value={type7Name} />
                  <button className='attachment_delete_btn' onClick={() => onDeleteFile(true)}>
                    삭제
                  </button>
                </div>
              </div>
            ) : null}

            {type1.type8 ? (
              <div className='form_item'>
                <p className='item_title'>{type1.type8MenuName}</p>
                <InputWithClear
                  placeHolder='URL을 입력해주세요.'
                  onChangeText={text => {
                    if (missionPt.current) {
                      missionPt.current.url = text;
                      missionPt.current.urlInputName = type1.type8MenuName;
                    }
                  }}
                  clearComplete={() => {
                    if (missionPt.current) missionPt.current.url = '';
                  }}
                />
              </div>
            ) : null}

            {type1.type9 ? (
              <div className='form_item attachment_item'>
                <div className='attachment_title'>
                  <p>제휴사 증빙서류(이미지 첨부)</p>
                  <button
                    className='attachment_btn'
                    onClick={e => {
                      e.stopPropagation();
                      document.getElementById('label_9')?.click();
                    }}
                  >
                    사진첨부
                  </button>
                  <label id='label_9' htmlFor='type9' style={{ display: 'none' }}>
                    사진첨부
                  </label>

                  <input type='file' onChange={type9FileInput} id='type9' style={{ display: 'none' }} />
                </div>
                <div className='attachment_input_box'>
                  <input type='text' value={type8Name} />
                  <button className='attachment_delete_btn' onClick={() => onDeleteFile(false)}>
                    삭제
                  </button>
                </div>
              </div>
            ) : null}

            {/* 업종 선택 */}
            {type1.type12 ? (
              <>
                <div className='select_ctg_line'></div>
                <div className='apply_form_header'>
                  <p>작성 후기에 포함된 업종</p>
                </div>
                <p className='select_ctg_subtitle'>해당하는 업종을 모두 선택하세요.</p>
                <div className='form_item select_ctg_box'>
                  {type12Ctagories.map((cate, index) => (
                    <CtgItem key={cate + index} selected={tmpSelectedCategory.includes(cate)} onClick={tmpSelectCategory(cate)}>
                      {getType12CategoryName(cate)}
                    </CtgItem>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Container>
    </AbstractModal>
  );
};

export default ModalApplyMission;
const Container = styled.div`
  position: relative;
  width: 100%;
  /* height: 100%; */
  padding: 0 31px;
  background-color: #fff;
  @media all and (max-width: ${theme.pc}px) {
    padding: 0 15px;
  }
  .apply_header {
    width: 100%;
    height: 118px;
    padding: 30px 0;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20px;
    text-align: center;
    margin-bottom: 24px;
    .cash_text {
      height: 22px;
      margin-top: 10px;
      @media all and (max-width: ${theme.pc}px) {
        margin-top: 7px;
      }
      > .coin_img {
        display: inline-block;
        width: 16px;
        height: 16px;
        > img {
          width: 16px;
          height: 16px;
        }
      }
      .cash_num {
        display: inline-block;
        margin-left: 5px;
        font-size: 15px;
        font-weight: 700;
        color: #fd4381;
        vertical-align: text-top;
        padding-top: 2px;
        @media all and (max-width: ${theme.pc}px) {
          font-size: 14px;
        }
        > span {
          font-weight: 400;
        }
      }
    }
  }
  .apply_form {
    width: 100%;
    position: relative;
    padding-bottom: 15px;

    .apply_form_header {
      border-bottom: 2px solid #262626;
      padding-bottom: 17px;
      font-size: 16px;
      font-weight: 700;
    }
    .apply_form_sub_header {
      width: 100%;
      height: 50px;
      background-color: #f7f7fa;
      font-size: 13px;
      font-weight: 700;
      padding-left: 15px;
      line-height: 50px;
      vertical-align: middle;
      margin-bottom: 20px;
    }
    .select_ctg_subtitle {
      font-size: 14px;
      font-weight: 500;
      margin: 20px 0 15px 0;
    }
    .select_ctg_line {
      width: 100%;
      height: 1px;
      background-color: #d8d8d8;
      margin: 30px 0 54px 0;
    }
    .form_item {
      position: relative;
      margin-bottom: 20px;
      .item_title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      .attachment_title {
        width: 100%;
        height: 32px;
        font-size: 14px;
        font-weight: 500;
        position: relative;
        line-height: 32px;
        vertical-align: middle;
        margin-top: 30px;
        > p {
          display: inline-block;
        }
        > .attachment_btn {
          display: inline-block;
          width: 113px;
          height: 32px;
          border: 1px solid #262626;
          font-size: 13px;
          font-weight: 700;
          position: absolute;
          right: 0;
        }
      }
      .attachment_input_box {
        width: 100%;
        height: 50px;
        border: 1px solid #dfdfdf;
        margin-top: 10px;
        > input {
          appearance: none;
          border: none;
          outline: none;
          width: calc(100% - 81px);
          height: 48px;
          font-size: 15px;
          padding-left: 15px;
          margin-right: 20px;
          &::placeholder {
            font-size: 15px;
            color: #8c8c8c;
          }
        }
        .attachment_delete_btn {
          width: 52px;
          height: 36px;
          background-color: #262626;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
        }
      }
      > div {
        display: block;
        position: relative;
        top: 0;
        width: 100%;
        .input_box {
          width: 100%;
        }
        .radio_container {
          border-bottom: 0;
          padding: 0;
          margin-bottom: 15px;
        }
      }
    }
    .form_item.attachment_item {
      border-bottom: 1px solid #dfdfdf;
      padding-bottom: 30px;
    }
  }
`;

const CtgItem = styled.button<{ selected: boolean }>`
  display: inline-block;
  vertical-align: top;
  width: 23.3%;
  height: 40px;
  border-radius: 8px;
  background-color: #f5f5f5;
  font-size: 12px;
  font-weight: 700;
  margin-right: 7px;
  margin-bottom: 7px;
  color: ${props => (props.selected ? '#4866e4' : '#262626')};
  border: ${props => (props.selected ? '1px solid #4866e4' : '1px solid #dfdfdf')};
  &:nth-child(4n) {
    margin-right: 0;
  }
`;
