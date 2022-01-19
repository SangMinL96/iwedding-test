import React, { useEffect, useMemo, useState } from 'react';
import { Consulting, ConsultingStatus, deleteT, GroupMetadataDto, isT, MetadataValue } from '@modules/mypage/quotation/QuotationInterface';
import myAxios from '@utils/MyAxios';
import { isNotEmpty } from '@utils/util';
import { RadioboxItem } from '@components/core/checkboxes';
import { InputWithClear } from '@components/core/inputs';

interface ModalProps {
  onChanged: (metadata: MetadataValue) => void;
  selectedMetadata: GroupMetadataDto;
}

/**
 * 행사구분 모달
 * @param onSelectedMetadata
 */
const ModalMetaEvent = ({ onChanged, selectedMetadata }: ModalProps) => {
  const [flag, setFlag] = useState<{ template: string; flag: boolean }[]>([]);
  const [clear, setClear] = useState(false);

  const metadataTemplates: string[] | undefined = useMemo(() => {
    if (selectedMetadata) {
      const templates = selectedMetadata.template.metadata_template.split(',');
      if (selectedMetadata.metadata.selected_answer_value === '직접입력') {
        setFlag(templates.map(str => ({ template: str, flag: '직접입력[t]' == str })));
      } else {
        setFlag(templates.map(str => ({ template: str, flag: selectedMetadata.metadata.selected_answer_value == str })));
      }
      return templates;
    }
  }, [selectedMetadata]);

  /**
   * 일자
   */
  const [wedding_datetime, setMyDateTime] = useState<Consulting>();

  //리허설 일자
  const rehearsalDate = useMemo(() => {
    if (wedding_datetime) {
      return wedding_datetime.rehearsal_status == ConsultingStatus.complete || wedding_datetime.rehearsal_status == ConsultingStatus.expect
        ? `${wedding_datetime.rehearsal_date} ${wedding_datetime.rehearsal_time}(${wedding_datetime.rehearsal_status})`
        : wedding_datetime.rehearsal_status;
    }
  }, [wedding_datetime]);

  //예식 일자
  const weddingDate = useMemo(() => {
    if (wedding_datetime) {
      if (isNotEmpty(wedding_datetime)) {
        return wedding_datetime.wedding_status == ConsultingStatus.complete || wedding_datetime.wedding_status == ConsultingStatus.expect
          ? `${wedding_datetime.wedding_date} ${wedding_datetime.wedding_time}(${wedding_datetime.wedding_status})`
          : wedding_datetime.wedding_status;
      }
    }
  }, [wedding_datetime]);

  useEffect(() => {
    const fetch = async () => {
      const res = await myAxios.get<Consulting>('/consulting/wedding/datetime');
      if (res?.data) setMyDateTime(res.data);
    };

    fetch();
  }, []);

  const onChangeRadio = (type: string) => {
    if (type.includes('[t]')) {
      const templateName = deleteT(type);
      setFlag(
        flag.map(f => {
          f.flag = f.template == templateName;
          return f;
        }),
      );
      onChanged({ value: '', selected_answer_value: deleteT(type) });
    } else {
      setFlag(
        flag.map(f => {
          f.flag = f.template == type;
          return f;
        }),
      );
      onChanged({ value: '', selected_answer_value: type });
      setClear(true);
    }
  };

  const onChangeInput = (value: string) => {
    if (metadataTemplates) {
      const wedding = global.document && (document.getElementById(metadataTemplates[0]) as HTMLInputElement);
      wedding.checked = false;
      const rehearsal = global.document && (document.getElementById(metadataTemplates[1]) as HTMLInputElement);
      rehearsal.checked = false;
      const etc = global.document && (document.getElementById(metadataTemplates[2]) as HTMLInputElement);
      etc.checked = true;
      onChanged({ value: value, selected_answer_value: '직접입력' });
    }
  };

  return (
    <div>
      <div className='event_radio_box'>
        {metadataTemplates && (
          <ul className='event_radio_list'>
            {metadataTemplates.map((templateStr, index) => {
              console.log(templateStr);
              return (
                <li className='event_radio_item' key={templateStr}>
                  <RadioboxItem
                    title={isT(templateStr) ? deleteT(templateStr) : templateStr}
                    id={templateStr}
                    name='eventRadio'
                    sub_title={
                      index == 0
                        ? `나의 리허설일시 : ${rehearsalDate ? rehearsalDate : ''}`
                        : index == 1
                        ? `나의 본식일시 : ${weddingDate ? weddingDate : ''}`
                        : ''
                    }
                    onSelect={() => onChangeRadio(templateStr)}
                    defaultCheck={flag.find(f => f.template == templateStr)?.flag ?? false}
                  />
                  {metadataTemplates && index === metadataTemplates.length - 1 && (
                    <InputWithClear
                      id={templateStr}
                      onChangeText={onChangeInput}
                      placeHolder='프러포즈, 가족행사, 파티, etc.'
                      onClear={clear}
                      clearComplete={() => {
                        if (clear) {
                          setClear(false);
                        }
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModalMetaEvent;
