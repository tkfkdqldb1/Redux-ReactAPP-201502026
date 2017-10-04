Redux는 JavaScript 어플리케이션에서 data-state와 UI-state를 관리해주는 도구입니다.

Redux는 페이스북에서 React가 함께 소개한 Flux 아키텍쳐를 구현한 라이브러리입니다. 컴퍼넌트끼리 데이터를 관리하기 쉽고 효율적으로 할 수 있게 해줍니다.


Flux는 아이디어, 추상적인 개념인데 이 추상적인 개념을 구현한 게 Redux입니다.

Flux 아키텍쳐는 어떻게 구성되어 있을까요?

Action > Dispatcher > Store > View
  dispatcher가 action을 통제.
  > store에 업데이트. 변동된 데이터가 있으면 view에 리렌더링.

View와 Model이 서로 상호작용하는 MVC와는 다르게 Flux에서 데이터를 View에서 Store로 바로 보내지 않고, Action을 거쳐서 Dispatcher로 보내어 순서대로 처리하도록 합니다. 작업이 중첩되지 않습니다. 
(Dispatcher는 동기 방식이기 때문에 어떤 action이 store에서 처리되기까지 그 action을 dispatcher에 대기시킵니다.)



출처 : blog.naver.com/naan_ace/221107702135, https://velopert.com/1225
