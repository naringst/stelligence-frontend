import React, { useEffect, useState } from 'react';
import { getCommentList } from '@/service/debate/comment';
import { CommentProps } from '@/types/debate/comment';
import CommentsHeader from './CommentsHeader';
import CommentCard from './CommentCard';

interface CommentsSectionProps {
  debateId: number;
  commentIds: number[];
  commentsUpdated: boolean;
  handleClickCommentId: (e: React.MouseEvent<HTMLSpanElement>) => void;
}
const CommentsSection: React.FC<CommentsSectionProps> = ({
  debateId,
  commentIds,
  commentsUpdated,
  handleClickCommentId,
}) => {
  const [commentList, setCommentList] = useState<CommentProps[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('등록순');

  useEffect(() => {
    getCommentList(debateId)
      .then(comments => {
        if (selectedOption === '최신순') {
          setCommentList([...comments].reverse());
        } else {
          setCommentList([...comments]);
        }
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [debateId, commentsUpdated, isChanged, selectedOption]);

  return (
    <div className="flex flex-col gap-4 rounded-lg mb-16">
      <CommentsHeader
        commentsNum={commentList.length}
        setSelectedOption={setSelectedOption}
      />
      <div className="flex flex-col">
        {commentList.map((comment: CommentProps) => {
          return (
            <CommentCard
              key={comment.commentId}
              commentorId={comment.commenter.memberId}
              userImg={comment.commenter.profileImgUrl}
              userName={comment.commenter.nickname}
              commentId={comment.commentId}
              commentContent={comment.content}
              time={comment.createdAt.replace('T', ' ')}
              commentIds={commentIds}
              setIsChanged={setIsChanged}
              handleClickCommentId={handleClickCommentId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentsSection;
