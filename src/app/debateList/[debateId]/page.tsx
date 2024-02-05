'use client';

import React from 'react';
import Wrapper from '@/components/Common/Wrapper';
import TitleInput from '@/components/Common/TitleInput';
import { Textarea } from '@chakra-ui/react';
import CommentList from '../components/CommentList';
import CommentCreate from '../components/CommentCreate';
import DebatePrevNextNav from '../components/DebatePrevNextNav';
import ReturnToDebateList from '../components/ReturnToDebateList';

const page = () => {
  const dummyReviseData = {
    title: '마리모에 대한 전반적인 수정 요청',
    debateNum: '12345',
    requester: '독수리타법 7남매',
    voteTime: '2시간',
    reason:
      '마리모는 동물입니다. 동물을 식물이라고 부르는 것은 마리모에게 실례입니다.',
    contents: [
      {
        id: 1,
        title: '마리모는 식물이 아닙니다.',
        before:
          '마리모(일본어: 毬藻; 라틴어: Aegagropila linnaei)는 공 모양의 집합체를 만드는 것으로 잘 알려져 있는 담수성 녹조류의 일종이다. 또한 아칸호의 마리모는 특히 아름다운 구상체를 만들며, 마리모는 일본의 천연기념물로 지정되어 있다./n그리고 마리모는 공 모양의 집합체를 형성하지만 그 구상체 하나가 곧 마리모 한 개체인 것이 아니고, 그 구상체를 구성하는 가는 섬유(사상체)가 마리모의 개체 단위이다. 많은 서식지에서 마리모는 구상체를 구성하지 않고 사상체의 형태로 산다. 겉보기에는 부드러울 것 같지만 실제로는 딱딱한 말(녹조)로, 만져보면 쿡쿡 찔리는 듯한 감촉이 있다.\n1897년 일본에서 삿포로 농학교(현 홋카이도 대학)의 카와카미 타키야가 아칸 호에서 발견한 형태를 더러 マリモ(毬藻), 즉 ‘둥근 마름풀’이라는 이름을 붙였다.',
        after: '마리모는 동물이다.',
      },
      {
        id: 2,
        title: '마리모는 귀엽습니다.',
        before: '',
        after:
          '마리모가 어항 위로 올라오는 행동은 광합성을 통해 생긴 기포에 의한 것이다. 요즘엔 다시 반려식물로 인기를 누리고 있다. 마트에 가면 볼 수 있는 반려식물중 하나이다. 또한 마리모는 기분이 좋으면 떠오르는데, 이때 소원을 빌면 이루어진다는 전설이 있다.',
      },
    ],
  };
  return (
    <Wrapper>
      <DebatePrevNextNav />
      <ReturnToDebateList />
      {/* FIXME 추후에 투표페이지 참고하여 수정 필요 */}
      <div className="flex flex-col gap-4 my-5 border-2 border-gray-50 p-10 rounded-md bg-white">
        {/* TODO TitleInput -> p(기본 텍스트) */}
        {/* TODO 수정요청사항과 투표 영역 구분하기 - 고민하기 */}
        <TitleInput
          title="수정 요청안 제목"
          content={dummyReviseData.title}
          isDisable
        />
        <TitleInput
          title="연관된 토론 번호"
          content={dummyReviseData.debateNum}
          isDisable
        />
        <TitleInput
          title="상위 계층 태그"
          content={dummyReviseData.debateNum}
          isDisable
        />
        <TitleInput
          title="수정 요청자"
          content={dummyReviseData.requester}
          isDisable
        />
        <TitleInput
          title="남은 투표 시간"
          content={dummyReviseData.voteTime}
          isDisable
        />

        <div className="flex flex-col gap-2 mt-2">
          <span className="font-bold text-md">수정 요청 이유</span>
          <Textarea
            value={dummyReviseData.reason}
            placeholder="내용을 입력해주세요"
            isDisabled
            sx={{
              _disabled: {
                opacity: '1',
              },
            }}
          />
        </div>
      </div>
      <CommentList />
      <CommentCreate />
    </Wrapper>
  );
};

export default page;
