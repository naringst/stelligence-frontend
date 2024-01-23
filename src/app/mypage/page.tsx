'use client';

import React, { useState } from 'react';
import Wrapper from '@/components/Common/Wrapper';
import TitleCard from '@/components/Common/TitleCard';
import { Avatar, Badge, Button, Input } from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';
import MyBadge from './components/MyBadge';

// TODO 백엔드 통신 후 삭제
const dummyUserData = {
  id: 1,
  profile: '',
  nickname: '독수리타법 7남매',
  socialType: 'kakao',
  bookmarks: [
    { id: 1, title: '깊이 우선 탐색' },
    { id: 2, title: '알고리즘' },
    { id: 3, title: '다익스트라 알고리즘' },
  ],
  badges: [
    {
      id: 1,
      title: '우주 여행자',
      image: '/image/astronaut.png',
    },
    {
      id: 2,
      title: '해왕성 탐사완료',
      image: '/image/astronaut.png',
    },
  ],
};

const Page = () => {
  // TODO 백엔드 데이터 받아온 뒤 initNickname 값 변경
  const initNickname = dummyUserData.nickname;
  const [newNickname, setNewNickname] = useState(initNickname);
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };
  const handleSaveNewNickname = async () => {
    if (initNickname === newNickname) {
      // TODO alert 대신에 Toast로 변경
      alert('이미 사용한 닉네임과 같습니다.');
      return;
    }

    // TODO 실제 백엔드 url로 변경 후 response 부분 다시 작성
    try {
      const response = await axios({
        method: 'PUT',
        url: 'http://localhost:8080/api/members/me/nickname',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          nickname: newNickname,
        },
      });

      if (response.data.success === 'fail') {
        alert(response.data.message);
      } else {
        console.log('닉네임 수정 성공');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <TitleCard title="유저 정보">
          <div className="flex">
            <Avatar name={dummyUserData.nickname} src={dummyUserData.profile} />
            <div className="flex flex-col gap-2 ml-4 ">
              <div>
                <h3 className="inline-block font-bold text-md">
                  {dummyUserData.nickname}
                </h3>
                <Badge ml="2" colorScheme="orange">
                  {dummyUserData.socialType}
                </Badge>
              </div>
              <div className="flex">
                <span className="flex text-sm items-center">닉네임</span>
                <Input
                  defaultValue={newNickname}
                  onChange={handleChangeNickname}
                  placeholder="닉네임을 입력하세요."
                  width="md"
                  ml="2"
                  fontSize="sm"
                  size="sm"
                />
                <Button
                  colorScheme="green"
                  size="sm"
                  ml="5"
                  onClick={handleSaveNewNickname}
                >
                  변경사항 저장
                </Button>
              </div>
            </div>
          </div>
        </TitleCard>
        <TitleCard title="북마크">
          <ul className="flex flex-col gap-1">
            {dummyUserData.bookmarks.map(bookmark => {
              return (
                <li key={bookmark.id}>
                  <Link
                    href={`/stars/${bookmark.id}`}
                    className="hover:underline"
                  >
                    {bookmark.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </TitleCard>
        <TitleCard title="배지">
          <div className="flex flex-wrap gap-3">
            {dummyUserData.badges.map(badge => {
              return (
                <MyBadge
                  title={badge.title}
                  image={badge.image}
                  key={badge.id}
                />
              );
            })}
          </div>
        </TitleCard>
      </div>
    </Wrapper>
  );
};

export default Page;
