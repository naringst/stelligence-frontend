import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineLike } from 'react-icons/ai';

const VoteButton = () => {
  const router = useRouter();
  const handleClickVote = () => {
    router.push('/vote-list');
  };
  return (
    <Button
      leftIcon={<AiOutlineLike />}
      variant="ghost"
      textColor="white"
      _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
      cursor="pointer"
      size="sm"
      rounded="sm"
      justifyContent="flex-start"
      onClick={handleClickVote}
    >
      <h2 className="text-md text-semibold">투표</h2>
    </Button>
  );
};

export default VoteButton;
