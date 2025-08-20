// In-memory topic dataset (초기 샘플)
// 실제 환경에서는 DB 또는 외부 패키지(@dding-oss/topic-engine)로 대체 예정

module.exports = [
    { id: 't1', text: '하루 중 가장 창의적인 순간을 묘사하세요.', category: 'essay', tags: ['daily', 'reflection'] },
    { id: 't2', text: '최근에 배운 기술 개념을 초보자에게 설명해보세요.', category: 'tech', tags: ['education'] },
    { id: 't3', text: '환경 보호를 위해 내가 바꿀 수 있는 한 가지 습관은?', category: 'essay', tags: ['environment'] },
    { id: 't4', text: '올해 주목할 만한 웹 개발 트렌드는 무엇인가요?', category: 'tech', tags: ['trend'] },
    { id: 't5', text: '당신이 가장 존경하는 인물의 리더십 스타일은?', category: 'essay', tags: ['leadership'] },
    { id: 't6', text: '사이드 프로젝트 아키텍처를 설계할 때 고려해야 할 요소.', category: 'tech', tags: ['architecture'] },
    { id: 't7', text: '도시와 자연 중 어느 곳이 더 창의성을 자극하는가?', category: 'essay', tags: ['comparison'] },
    { id: 't8', text: '최근 해결한 성능 문제와 접근 방법을 기록하세요.', category: 'tech', tags: ['performance'] }
];
