import React, { ReactHTMLElement, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { debounce, DebouncedFunc } from 'lodash';
import { Button, ChipButton } from '../Button/Button';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';
import { IUserProfileData } from '../../../types/profile';
import { Profile } from '../../../types/profile';

interface IProfileInputProps {
  profile?: Profile | undefined;
  btnText: string;
  onSubmit: SubmitHandler<IUserProfileData>;
  onChipSelect?: (newSelectedChips: string[]) => void;
  children?: ReactElement;
}

interface FormValue {
  nickName: string;
  about: string;
  genre: string;
}

export default function ProfileInput(props: IProfileInputProps): ReactElement {
  const { profile, btnText, onSubmit, onChipSelect, children } = props;

  const [nickNameCount, setNickNameCount] = useState(profile?.name.length || 0);
  const [nickNameValid, setNickNameValid] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<FormValue>({
    defaultValues: {
      nickName: profile?.name || '',
      about: profile?.about || '',
    },
    mode: 'onBlur',
    // react-hook-form의 reslover란? 저도 처음 사용해 보는 것이라 찾아보니 아래와 같다고 합니다
    // /resolver를 사용하면 비동기적인 검증이 필요한 경우에도 쉽게 처리할 수 있다.
    // resolver 함수 내에서 async/await를 사용하여 비동기 작업을 수행하고, 검증 결과에 따라 폼을 유효하거나 유효하지 않은 상태로 설정할 수 있다.
    resolver: async (data) => {
      const errors: Record<string, { type: string; message: string }> = {};
      try {
        //닉네임 값이 없을 시
        if (!data.nickName) {
          errors.nickName = {
            type: 'custom',
            message: '닉네임을 입력해주세요.',
          };
        } else if (!profile || (profile && data.nickName !== profile?.name)) {
          //닉네임 중복검사 post 요청
          // (현재 프로필 닉네임과 같지 않은 경우만)

          const response = await axios.post(
            'https://api.mudig.co.kr/user/checkname/',
            { name: data.nickName },
          );

          if (response.status === 200) setNickNameValid(response.data.message); //중복검사 통과시 성공 메시지
        }
      } catch (error) {
        console.error(error);
        const errorMessage = '이미 사용 중인 닉네임 입니다';
        errors.nickName = { type: 'custom', message: errorMessage }; //중복검사 실패시 실패 메시지
      }

      return { values: data, errors };
    },
  });

  const [selectedChips, setSelectedChips] = useState(
    profile ? profile.genre.split(',') : [],
  );

  const handleChipSelect = (newSelectedChips: string[]) => {
    setSelectedChips(newSelectedChips);

    //콜백함수로 onChipSelect props (관심사) 값 업데이트
    if (onChipSelect) {
      onChipSelect(newSelectedChips);
    }
  };

  const handleNickNameLengthChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = event.target.value;
    value = value.slice(0, 8);
    setNickNameCount(value.length);

    setValue('nickName', value, { shouldValidate: true });
  };

  // Explicitly define the type of the debounced function
  const handleNickNameChecked: DebouncedFunc<
    (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  > = debounce(handleNickNameLengthChange, 1000);
  return (
    <FormWrap onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor='nickName'>닉네임</Label>
        <InputWrap>
          <InputBox>
            <InputStyle
              {...register('nickName', {
                required: '닉네임을 입력해주세요.',
                maxLength: {
                  value: 8,
                  message: '닉네임은 최대 8글자까지 입력 가능합니다.',
                },
              })}
              placeholder='8글자 내로 작성해주세요'
              type='text'
              autoComplete='off'
              id='nickName'
              onChange={handleNickNameChecked}
            />
            <CharacterCount>{`${nickNameCount}/8`}</CharacterCount>
          </InputBox>
          {/* 닉네임 중복이면 중복 에러 메시지 보여주고 아니라면 '사용 가능한 닉네임입니다' 보여주는 삼항연산자 */}
          {errors.nickName ? (
            <ErrorMsg>{errors.nickName.message}</ErrorMsg>
          ) : (
            <SuccessMsg>{nickNameValid}</SuccessMsg>
          )}
        </InputWrap>

        <Label htmlFor='about'>소개글</Label>
        <InputWrap>
          <InputStyle
            {...register('about', { required: false })}
            defaultValue={profile?.about}
            placeholder='소개글을 작성해주세요'
            autoComplete='off'
            type='text'
            id='about'
          />
        </InputWrap>
        <>
          <Chipwrap>
            <Title>관심사 (최대 3개까지 선택)</Title>
            <ChipBox>
              {[
                'POP',
                'K-POP',
                'J-POP',
                '힙합',
                'R&B',
                '발라드',
                '댄스',
                '인디',
                'OST',
              ].map((chipName, index) => (
                <ChipButton
                  key={index}
                  name={chipName}
                  onSelect={handleChipSelect}
                  selectedChips={selectedChips}
                />
              ))}
            </ChipBox>
            <ChipMsg>{'관심사는 최대 3개까지 설정 가능합니다.'}</ChipMsg>
          </Chipwrap>
        </>
        {children}
      </div>
      <ButtonBox>
        <Button
          text={btnText}
          type='submit'
          disabled={!isValid || selectedChips.length === 0}
        />
      </ButtonBox>
      {/* <DevTool control={control} /> */}
    </FormWrap>
  );
}

const FormWrap = styled.form`
  padding-top: 8px;
  font-size: var(--font-md);
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

const Label = styled.label``;

const InputWrap = styled.div`
  padding: 8px 0 16px 0;
`;

const InputBox = styled.div`
  position: relative;
`;

const SuccessMsg = styled.span`
  color: #724fff;
  font-size: 12px;
  display: block;
  padding-top: 8px;
`;

const ChipMsg = styled(SuccessMsg)`
  padding-top: 15px;
`;

const ErrorMsg = styled.span`
  color: var(--error-color);
  font-size: 12px;
  display: block;
  padding-top: 8px;
`;

const InputStyle = styled.input`
  width: 100%;
  height: 44px;
  /* margin: 8px 0 16px 0; */
  border-radius: 8px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.6);
  padding-left: 16px;
  position: relative;
`;

const ButtonBox = styled.div`
  bottom: 0px;
`;

const CharacterCount = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  color: var(--extra-font-color);
  text-align: center;
  transform: translate(0, -50%);
`;

const Chipwrap = styled.div`
  margin-bottom: 16px;
  font-weight: var(--font-regular);
  font-size: var(--font-md);
`;

const ChipBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;
