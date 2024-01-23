import { Card } from '@chakra-ui/react';
import React from 'react';

const TitleCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-bold">{title}</h1>
      <Card p="1.5rem">{children}</Card>
    </div>
  );
};

export default TitleCard;
