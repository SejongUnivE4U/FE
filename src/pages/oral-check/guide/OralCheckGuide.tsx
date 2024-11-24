import React from 'react';
import styled from 'styled-components';
import GuideFrontImg from '../../../../public/assets/images/guide-front-img.png';
import GuideLowerImg from '../../../../public/assets/images/guide-lower-img.png';
import GuideUppertImg from '../../../../public/assets/images/guide-upper-img.png';
import CloseButton from '../../../components/CloseButton';

const OralCheckGuide: React.FC = () => {
  return (
    <GuideContainer>
      <TopBar>
        <CloseButton to="/oral-check" />
      </TopBar>
      <Section>
        <Title>구강 검사 가이드</Title>
        <Paragraph>
          이 기능은 AI를 활용하여 구강 상태를 분석하고 리포트를 제공합니다.
          아래의 가이드를 따라 검사를 진행하세요.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>검사 종류</SubTitle>
        <Paragraph>
          <Highlight>빠른 검사:</Highlight> 문제로 느껴지는 부위 한 곳만
          사진으로 촬영하여 간단히 검사합니다.
        </Paragraph>
        <Paragraph>
          <Highlight>정밀 검사:</Highlight> 정해진 부위(정면, 상악, 하악)를
          차례로 촬영하여 정밀한 검사를 진행합니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>검사 절차</SubTitle>
        <Paragraph>다음 절차를 따라 진행하세요:</Paragraph>
        <List>
          <ListItem>
            <Highlight>1. 사진 촬영:</Highlight> 촬영 가이드에 맞춰 구강 사진을
            촬영합니다.
          </ListItem>
          <List>
            <ListItem>
              <Highlight>정면:</Highlight> 핸드폰을 정면으로 들고 촬영.
              <ImageWrapper>
                <Image src={GuideFrontImg} alt="정면 촬영 가이드" />
              </ImageWrapper>
            </ListItem>
            <ListItem>
              <Highlight>상악:</Highlight> 핸드폰을 뒤집어 위쪽 치아 촬영.
              <ImageWrapper>
                <Image src={GuideUppertImg} alt="상악 촬영 가이드" />
              </ImageWrapper>
            </ListItem>
            <ListItem>
              <Highlight>하악:</Highlight> 핸드폰을 정방향으로 아래쪽 치아 촬영.
              <ImageWrapper>
                <Image src={GuideLowerImg} alt="하악 촬영 가이드" />
              </ImageWrapper>
            </ListItem>
          </List>
          <ListItem>
            <Highlight>2. 추가 진단:</Highlight> 아픈 부위 선택, 통증 정도(0~10)
            설정, 증상 입력.
          </ListItem>
          <ListItem>
            <Highlight>3. 검사 요청:</Highlight> 모든 절차 완료 후 검사 요청을
            보냅니다.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SubTitle>구강 리포트</SubTitle>
        <Paragraph>
          검사 결과는 구강 리포트를 통해 확인할 수 있습니다. 리포트에는 분석
          결과, 치료 방법, 관리 방법 등이 포함됩니다.
        </Paragraph>
      </Section>

      <Section>
        <SubTitle>촬영 팁</SubTitle>
        <List>
          <ListItem>촬영 가이드에 구강이 맞도록 위치를 조정하세요.</ListItem>
          <ListItem>상악 촬영 시 핸드폰을 뒤집어 촬영하세요.</ListItem>
          <ListItem>
            밝은 조명 아래에서 촬영하면 정확한 이미지를 얻을 수 있습니다.
          </ListItem>
        </List>
      </Section>
    </GuideContainer>
  );
};

const GuideContainer = styled.div`
  padding: 20px;
  font-family: Pretendard;
  width: 327px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  word-break: keep-all;
`;

const TopBar = styled.div`
  width: 100%;
  height: 64px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: #474d66;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 10px;
`;

const SubTitle = styled.h3`
  font-size: 20px;
  color: #474d66;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: #666;
`;

const Highlight = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primaryGreen};
`;

const List = styled.ul`
  margin-top: 10px;
  padding-left: 20px;
  list-style-type: disc;
  color: #666;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
  font-size: 15px;
  line-height: 1.5;
  word-break: keep-all;
`;

const ImageWrapper = styled.div`
  margin: 10px 0;
  text-align: center;
`;

const Image = styled.img`
  margin-top: 10px;
  width: 50%;
  height: auto;
  border-radius: 8px;
`;

export default OralCheckGuide;
