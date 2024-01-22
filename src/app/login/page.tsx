import Wrapper from '@/components/Common/Wrapper';
import GoogleLogin from '@/app/login/components/GoogleLogin';
import KakaoLogin from '@/app/login/components/KakaoLogin';
import NaverLogin from '@/app/login/components/NaverLogin';
import { Card } from '@chakra-ui/react';
import { DM_Serif_Display } from 'next/font/google';
import React from 'react';

const dm = DM_Serif_Display({ subsets: ['latin'], weight: ['400'] });

const Page = () => {
  return (
    <Wrapper>
      <div className="flex flex-col gap-y-8 justify-center items-center h-screen">
        <h1 className={`${dm.className} text-4xl`}>Stelligence</h1>
        <Card
          borderWidth="1px"
          borderColor="requestBtn"
          p="20"
          borderRadius="lg"
          bgColor="white"
        >
          <div className="flex flex-col gap-y-3">
            <KakaoLogin />
            <NaverLogin />
            <GoogleLogin />
          </div>
        </Card>
      </div>
    </Wrapper>
  );
};

export default Page;
