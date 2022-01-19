import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import CheckboxItem from '@components/core/checkboxes/CheckboxItem';
import { deleteT, GroupMetadataDto, isT, MetadataValue, template_input_title } from '@modules/mypage/quotation/QuotationInterface';
import theme from '@styles/theme';
import { InputWithClear } from '@components/core/inputs';

/**
 * 이용대상자 모달
 */
interface TargetUserProps {
  onChangedMetadata: (metadata: MetadataValue) => void;
  selectedMetadata: GroupMetadataDto;
}

const ModalMetaTargetUser = ({ onChangedMetadata, selectedMetadata }: TargetUserProps) => {
  // 선택지
  const templates = useMemo(() => {
    if (selectedMetadata) {
      return selectedMetadata.template.metadata_template.split(',');
    }
    return [];
  }, [selectedMetadata]);

  //기존 값 로컬 임시저장
  const [tmpState, setTmpState] = useState<{ value: string; selected_answer_value: string[] }>({
    value: '',
    selected_answer_value: [],
  });

  useEffect(() => {
    if (selectedMetadata) {
      const { metadata } = selectedMetadata;

      //선택
      let selected_answer_value: string[] = [];
      if (metadata.selected_answer_value) {
        if ((metadata.selected_answer_value as string).includes(',')) {
          selected_answer_value = metadata.selected_answer_value.split(',');
        } else {
          selected_answer_value = [metadata.selected_answer_value];
        }
      }
      //직접입력
      const value = metadata.value || '';
      setTmpState({ selected_answer_value, value });
    }
  }, [selectedMetadata]);

  //변경된 값 전달
  useEffect(() => {
    onChangedMetadata({ ...tmpState, selected_answer_value: arrayToString(tmpState.selected_answer_value) });
  }, [tmpState, onChangedMetadata]);

  // onChange 체크박스 값
  const onChangeAnswer = (checked: boolean, value: string) => {
    if (checked && value != template_input_title) {
      setTmpState(prevState => ({ ...prevState, selected_answer_value: prevState.selected_answer_value.concat(value) }));
    } else {
      setTmpState(prevState => ({ ...prevState, selected_answer_value: prevState.selected_answer_value.filter(v => v !== value) }));
    }
  };

  // onChange Input 값
  const onChangeInput = (text: string, checked = true) => {
    setTmpState(prevState => ({ ...prevState, value: text }));
  };

  const defaultCheck = (title: string) => {
    if (title == template_input_title && tmpState.value) {
      return true;
    }
    if (tmpState && tmpState.selected_answer_value.length) {
      return tmpState.selected_answer_value.includes(title);
    }
  };

  return (
    <Container>
      {templates &&
        templates.map(title => (
          <li className='user_check_item' key={title}>
            <CheckboxItem
              title={deleteT(title)}
              id={deleteT(title)}
              name='userCheck'
              onSelect={onChangeAnswer}
              defaultCheck={defaultCheck(deleteT(title))}
            />
            {isT(title) && (
              <div style={{ position: 'relative' }}>
                <CustomIWC
                  id={'inputTemplateName'}
                  onChangeText={onChangeInput}
                  defaultText={tmpState.value}
                  placeHolder='친구(남자), 친구(여자), etc.'
                  clearComplete={() => {
                    onChangeInput('', false);
                  }}
                  isSmall
                />
              </div>
            )}
          </li>
        ))}
    </Container>
  );
};

function arrayToString(selected_answer_value: string[]) {
  let value = '';
  if (selected_answer_value.length === 1) {
    value = selected_answer_value[0];
  } else {
    selected_answer_value.forEach((str, index) => {
      if (index !== selected_answer_value.length - 1) {
        value += str + ',';
      } else {
        value += str;
      }
    });
  }

  return value;
}

export default ModalMetaTargetUser;
const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  ${theme.hideScroll};

  > div {
    &:nth-child(2) {
      top: 6px;
      .input_box {
        width: 220px;
        height: 42px;
        .title-input-box {
          > input {
            height: 40px;
          }
        }
      }
    }
  }
`;

const CustomIWC = styled(InputWithClear)`
  top: -50px;
  > div {
    height: 42px;
  }
`;
