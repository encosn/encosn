# 중학교 정보 수업 활동

2022 개정 교육과정 중학교 **정보** 과목의 5개 영역을 단원으로 나눈 수업 활동 모음 페이지입니다.

**👉 https://encosn.github.io/encosn/**

단원을 고르면 그 단원에서 해 볼 수 있는 활동과 성취기준이 나옵니다.

| 단원 | 영역 | 활동 |
|:---:|:---|:---|
| 1 | 컴퓨팅 시스템 | 준비 중 |
| 2 | 데이터 | [10진수 → 2진수 변환 실습기](https://encosn.github.io/binary-converter/) · [공공데이터 결측치 정리 실습기](https://encosn.github.io/data-cleaner/) |
| 3 | 알고리즘과 프로그래밍 | 준비 중 |
| 4 | 인공지능 | 준비 중 |
| 5 | 디지털 문화 | [디지털 공간에서 정보의 확산 속도 체험하기](https://encosn.github.io/digit/) |

선생님용 도구: [엑셀 다듬기](https://encosn.github.io/excel-picker/)

## 활동을 추가하려면

`data.js` 한 파일만 고치면 됩니다. 해당 단원의 `activities` 배열에 항목을 하나 넣으면
메인페이지의 "활동 N개" 숫자와 단원 페이지의 목록이 함께 바뀝니다.

```js
{
  title: '활동 이름',
  emoji: '🔢',
  desc: '한두 문장 설명',
  standards: ['9정02-03'],
  url: 'https://encosn.github.io/새-활동/',
  status: 'ready',   // 아직 만드는 중이면 'soon' (url 없어도 됨)
}
```

## 로컬에서 보기

`index.html` 을 그냥 더블클릭하면 열립니다. 개발 서버로 보려면:

```
npm install
npm start        → http://localhost:8084
```

빌드 단계는 없습니다. GitHub Pages 가 저장소 루트의 소스를 그대로 서비스합니다.

## 개인정보

학생 정보를 수집·저장·전송하지 않습니다. 모든 활동은 브라우저 안에서만 동작합니다.
