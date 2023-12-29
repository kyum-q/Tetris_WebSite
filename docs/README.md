# 기능 구현 사항

## 이동
- [x] 좌우 이동 (좌우키)
  - [x] 이동 시 양 끝 이후로 이동 불가
  - [x] 블록이 있을 경우 이동 불가
- [x] 맨 아래로 이동 (탭키)
  - [x] 블록이 있을 때, 맨 아래일 때까지 이동
  - [x] 탭키 누르고 좌우 이동 키 안되게 설정
<br>

## 게임 점수 기능
- [x] 블록이 맨 위에 닿으면 게임 종료
- [ ] 점수 기능 구현
    - [ ] 블록 4개가 닿아있으면 득점
    - [ ] 득점 점수는 사라지는 블록 * 100
- [ ] 레벨 기능 구현
  - [ ] 특정 점수를 넘으면 레벨 업 
  - [ ] 속도 증가
  - [ ] 통과 점수 증가
<br>

## 게임 추가 기능
- [ ] 블록 색 랜덤 지정
- [x] 블록 처음 위치 랜덤
- [ ] 다음에 나오는 블록 미리보기 제공
<br>

## 게임 유동화
- [x] 테트리스 맵 유동화
    - [x] 맵 js로 유동적으로 제작
    - [x] 넓이 밑 높이 변수화
- [x] 테트리스 이동 제한 유동화
    - [x] 좌우,아래 이동할 수 있는 끝 점 넓이, 높이 별수를 이용해 유동적으로 제작
- [x] 속도 변수화