import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../../api/axios';
import Button from '../../components/Button';
import Dropdown from '../../components/dropdown';

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const years = Array.from({ length: 100 }, (_, i) => String(2024 - i));

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid =
    name &&
    emailVerified &&
    password &&
    confirmPassword &&
    gender &&
    birthYear &&
    !passwordError;

  const handlePasswordConfirmation = (value: string) => {
    setConfirmPassword(value);
    if (password !== value) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError(null);
    }
  };

  const handleYearSelect = (selectedYear: string) => {
    setBirthYear(selectedYear);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
    } else {
      setEmailError(null);
    }
    setEmailVerified(false);
  };

  const checkEmailDuplication = async () => {
    if (!isEmailValid) {
      setEmailError('올바른 이메일을 입력해 주세요.');
      return;
    }
    try {
      setCheckingEmail(true);
      const response = await instance.get(`/check-email?email=${email}`);
      if (response.data === false) {
        setEmailError('이미 사용 중인 이메일입니다.');
        setEmailVerified(false);
      } else {
        setEmailError(null);
        setEmailVerified(true);
      }
    } catch (error) {
      setEmailError('이메일 중복 확인 중 오류가 발생했습니다.');
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const age = birthYear ? currentYear - Number(birthYear) : 0;

    try {
      const response = await instance.post('/register', {
        email,
        password,
        name,
        age,
        gender,
      });
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>

      <Form onSubmit={handleSignUp}>
        <InputGroup>
          <InputWrapper>
            <Label>이름</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="이름을 입력해 주세요"
              $focused={focusedField === 'name'}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>이메일</Label>
            <EmailInputContainer>
              <EmailInput
                type="email"
                value={email}
                onChange={handleEmailChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="이메일을 입력해 주세요"
                $focused={focusedField === 'email'}
              />
              <EmailVerifyButton
                onClick={(e) => {
                  e.preventDefault();
                  checkEmailDuplication();
                }}
                disabled={!isEmailValid || emailVerified || checkingEmail}
              >
                {checkingEmail ? '확인 중...' : '중복 확인'}
              </EmailVerifyButton>
            </EmailInputContainer>
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
            {!emailError && emailVerified && (
              <VerifyMessage>사용 가능한 이메일입니다.</VerifyMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="비밀번호를 입력해 주세요"
              $focused={focusedField === 'password'}
            />
          </InputWrapper>

          <InputWrapper>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => handlePasswordConfirmation(e.target.value)}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
              placeholder="비밀번호를 입력해 주세요"
              $focused={focusedField === 'confirmPassword'}
            />
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          </InputWrapper>

          <InputWrapper>
            <Label>성별</Label>
            <GenderGroup>
              <GenderButton
                selected={gender === 'male'}
                onClick={(e) => {
                  e.preventDefault();
                  setGender('male');
                }}
              >
                남자
              </GenderButton>
              <GenderButton
                selected={gender === 'female'}
                onClick={(e) => {
                  e.preventDefault();
                  setGender('female');
                }}
              >
                여자
              </GenderButton>
            </GenderGroup>
          </InputWrapper>

          <InputWrapper>
            <Label>출생연도</Label>
            <Dropdown
              options={years}
              onSelect={handleYearSelect}
              placeholder="YYYY"
              defaultValue={birthYear}
            />
          </InputWrapper>
        </InputGroup>

        <Button variant="primary" disabled={!isFormValid}>
          회원가입
        </Button>
      </Form>
      <LoginTextWrapper>
        <LoginText1>이미 회원이신가요?</LoginText1>
        <LoginText2 onClick={() => navigate('/login')}>로그인하기</LoginText2>
      </LoginTextWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 auto;
  margin-top: 40px;
  margin-bottom: 100px;
`;

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const Label = styled.label`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Input = styled.input<{ $focused: boolean }>`
  display: flex;
  width: 335px;
  height: 45px;
  padding: 14px 20px;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: 10px;
  background: #f7f7fa;

  border: ${({ $focused, theme }) =>
    $focused
      ? `1px solid ${theme.colors.primaryGreen}`
      : '1px solid transparent'};

  &::placeholder {
    color: #8f95b2;
  }
`;

const EmailInputContainer = styled.div`
  width: 335px;
  height: 45px;
  display: flex;
  justify-content: space-between;
`;

const EmailInput = styled.input<{ $focused: boolean }>`
  display: flex;
  width: 237px;
  height: 45px;
  padding: 14px 20px;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: 10px;
  background: #f7f7fa;

  border: ${({ $focused, theme }) =>
    $focused
      ? `1px solid ${theme.colors.primaryGreen}`
      : '1px solid transparent'};

  &::placeholder {
    color: #8f95b2;
  }
`;

const EmailVerifyButton = styled.button`
  width: 84px;
  height: 45px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primaryGreen};
  color: ${({ theme }) => theme.colors.textWhite};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;

  &:active {
    background-color: #32a68a;
  }

  &:disabled {
    background-color: #c6cada;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #d14343;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

const VerifyMessage = styled.span`
  color: ${({ theme }) => theme.colors.primaryGreen};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

const GenderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 335px;
`;

const GenderButton = styled.button<{ selected: boolean }>`
  width: 161px;
  height: 45px;
  background-color: #f7f7fa;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.primaryGreen : '#F7F7FA'};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.primaryGreen : '#8F95B2'};
  border-radius: 10px;
  cursor: pointer;
`;

const LoginTextWrapper = styled.div`
  margin-top: 40px;
`;

const LoginText1 = styled.span`
  color: #8f95b2;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-right: 10px;
`;

const LoginText2 = styled.span`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryGreen};
  cursor: pointer;
  &:active {
    text-decoration: underline;
  }
`;
