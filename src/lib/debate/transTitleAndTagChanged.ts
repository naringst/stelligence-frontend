import { Amendment } from '@/types/common/Amendment';

const transTitleTagtoAmendment = (
  changedType: 'title' | 'tag',
  beforeContent: string,
  afterContent: string,
): Amendment => {
  const title = changedType === 'title' ? '글 제목 변경' : '상위계층태그 변경';
  const content = beforeContent || 'X';
  const requestedContent = afterContent || 'X';

  return {
    amendmentId: 0, // 실제 구현에서는 고유 ID 생성 로직이 필요할 수 있음
    type: 'UPDATE',
    targetSection: {
      sectionId: 0, // 실제 구현에서는 적절한 섹션 ID 할당 필요
      revision: 0,
      heading: 'H1',
      title,
      content,
    },
    requestedSectionHeading: 'H1',
    requestedSectionTitle: title,
    requestedSectionContent: requestedContent,
    creatingOrder: 0,
  };
};

export default transTitleTagtoAmendment;
