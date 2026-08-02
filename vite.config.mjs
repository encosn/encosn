import { defineConfig } from 'vite';

/**
 * hub (중학교 정보 수업 활동 메인페이지) — 개발 서버 설정
 *
 * 포트 8084: binary-converter=8080, data-cleaner=8081,
 *            excel-picker=8082, spread-simulator=8083 과 겹치지 않게.
 *
 * ★ 이 앱에는 build 스크립트가 없다 (일부러 뺐다).
 *   이 페이지는 순수 HTML/CSS/JS 라 번들할 것이 없고,
 *   GitHub Pages 가 저장소 루트의 소스 파일을 그대로 서비스한다.
 *   그래서 배포는 `git push` 하나로 끝난다. dist/ 를 만들지 않는다.
 *   (스크립트를 type="module" 이 아닌 보통 <script src> 로 넣은 이유이기도 하다.
 *    그래야 서버 없이 index.html 을 더블클릭해도 열린다.)
 *
 *   확장자가 .mjs 인 이유: package.json 에 "type": "module" 을 넣지 않았기 때문에
 *   vite 설정만 ESM 으로 쓰려면 .mjs 여야 한다. (spread-simulator 와 같은 사정)
 */
export default defineConfig({
  root: '.',
  base: './',

  server: {
    port: 8084,
    strictPort: true,   // 8084가 사용 중이면 조용히 옮기지 않고 알려 준다
    open: false,
  },
});
