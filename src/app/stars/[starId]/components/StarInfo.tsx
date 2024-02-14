import PageTitleDescription from '@/components/Common/PageTitleDescription';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { DocStatus } from '@/types/star/StarProps';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  BookmarkResponse,
  getBookmarkData,
  postBookmarkData,
} from '@/service/userService';
import { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import StarStatusButton from './StarStatusButton';

interface StarInfoProps {
  title: string;
  parentDocumentTitle: string;
  lastModifiedAt: string;
  documentStatus: DocStatus;
  id: { contributeId: number; debateId: number };
}

// NOTE : 글의 정보를 보여주는 컴포넌트
const StarInfo = ({
  title,
  parentDocumentTitle,
  lastModifiedAt,
  documentStatus,
  id,
}: StarInfoProps) => {
  const starId = Number(useParams().starId);
  const router = useRouter();

  const handleReviseList = () => {
    // FIXME : 링크 확인 필요
    router.push(`/stars/${starId}/revised-list`);
  };

  const handleHistory = () => {
    router.push(`/stars/${starId}/history-list`);
  };

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const createBookmarkMutation = useMutation({
    mutationFn: postBookmarkData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'bookmark'] });
      setIsBookmarked(true);
      toast({
        title: '북마크 추가 성공!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: error => {
      console.error('북마크 추가 실패: ', error);
    },
  });
  const handleCreateBookmark = () => {
    createBookmarkMutation.mutate(Number(starId));
  };

  const handleDeleteBookmark = () => {};

  // NOTE 북마크 단건조회
  const { data: bookmarked } = useQuery<BookmarkResponse>({
    queryKey: ['bookmark', starId],
    queryFn: () => {
      return getBookmarkData(starId);
    },
  });
  useEffect(() => {
    setIsBookmarked(bookmarked?.results.bookmarked ?? false);
  }, [bookmarked]);

  return (
    <div className="flex flex-row w-full justify-between">
      <div className="flex flex-col">
        <PageTitleDescription
          title={title}
          description={`수정일시: ${lastModifiedAt}`}
        />
        <div>{parentDocumentTitle}</div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row">
          {/* SECTION : 북마크 버튼 */}
          {!isBookmarked ? (
            <Button
              size="md"
              variant="ghost"
              color="white"
              _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
              p="0"
              onClick={handleCreateBookmark}
            >
              <FaRegBookmark size="1.5rem" />
            </Button>
          ) : (
            <Button
              size="md"
              variant="ghost"
              color="white"
              _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
              p="0"
              onClick={handleDeleteBookmark}
            >
              <FaBookmark size="1.5rem" />
            </Button>
          )}
          {/* SECTION : 더보기 버튼 (지난 수정요청, 역사, 신고) */}
          <Menu>
            <MenuButton
              as={Button}
              size="md"
              color="white"
              variant="ghost"
              p="0.5rem"
              mb="0.1rem"
              _hover={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
              _expanded={{ bg: '#ebedf0', textColor: 'black', fontWeight: 600 }}
            >
              <AiOutlineEllipsis size="1.5rem" />
            </MenuButton>
            <MenuList sx={{ minWidth: '7rem' }}>
              <MenuItem
                sx={{ justifyContent: 'center' }}
                onClick={handleReviseList}
              >
                지난 수정 요청
              </MenuItem>
              <MenuItem
                sx={{ justifyContent: 'center' }}
                onClick={handleHistory}
              >
                역사
              </MenuItem>
              <MenuItem sx={{ justifyContent: 'center' }}>신고</MenuItem>
            </MenuList>
          </Menu>
        </div>

        {/* SECTION : 편집/투표중/토론중 버튼 */}
        <StarStatusButton documentStatus={documentStatus} id={id} />
      </div>
    </div>
  );
};

export default StarInfo;
