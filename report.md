
REPORT.MD

과제 내용 : Redux에 대해 조사하여 report.md 파일에 작성하고, Redux를 이용한 React APP를 만들어 github.com에 repository 생성 후 소스와 report.md 파일을 함께 push 하기.


개요

1. Flux란?

2. Redux란?

3. 느낀점




[1. Flux란?]

Flux는 현재 웹 개발에서 가장 인기있는 토픽 중 하나이면서도 가장 이해되고 있지 않은 토픽 중 하나이다.
Flux는 애플리케이션에서 데이터를 취급하기 위한 패턴(pattern)이다. Flux와 React는 Facebook에서 함께 성장해왔다. 많은 사람들이 이 둘을 함께 사용하지만, 사실 독립적으로도 사용할 수 있다. Flux와 React는 Facebook이 가지고 있었던 특정한 문제점들을 해결하기 위해서 개발되었다.
이 문제점들 중 가장 잘 알려져 있는 것은 알림(notification) 버그이다. Facebook에 로그인 했을 때 [화면 위의] 메시지 아이콘에 알람이 떠 있지만, 그 메시지 아이콘을 클릭해서 들어가보면 아무런 메시지가 없던 적이 있었을 것이다. 알림은 사라지겠지만, 몇 분 뒤 알림이 다시 나타나고 여전히 아무런 메시지도 나타나지 않는다. 그리고 이 사이클(cycle)은 계속 반복된다.
이 사이클은 단순히 사용자 뿐만이 아니라 Facebook의 팀에서도 있었다. 팀이 이 버그를 고치고 얼마동안은 괜찮았지만 [업데이트를 하다보면] 곧 다시 나타났다. 이렇게 해결되고 다시 문제가 생기는 사이클이 계속 반복되었다.
그래서 Facebook은 이 사이클을 벗어날 방법을 찾고 있었다. 단순히 단기적인 해결책이 아니라, 시스템을 더욱 예측가능하게 만들어서 문제점을 완전히 없애길 원했다.

Facebook이 찾은 근본적인 문제점은 데이터가 어플리케이션을 흐르는 방법에 있었다.
  모델(model)이 뷰 레이어(view layer)로 데이터를 보낸다.
이전에는 데이터를 가지고 있는 모델(model)이 렌더링(rendering)을 하기 위해 뷰 레이어(view layer)로 데이터를 보냈을 것이다.
사용자와의 상호작용(user interaction)이 뷰(view)를 통해서 일어났기 때문에 사용자의 입력에 따라 뷰가 가끔식 모델을 업데이트해야할 필요가 있었다. 그리고 [의존성(dependency) 때문에] 모델이 다른 모델을 업데이트해야할 때도 있었다.
그 외에도, 가끔씩 이런 것들 때문에 산사태처럼 아주 많은 다른 변경을 초래하기도 했다.
또한, 이런 변경들은 비동기적으로(asynchronously) 생길 수도 있었고, 하나의 변경이 다수의 변경들을 일으킬 수 있었다. 이것은 데이터 흐름을 디버그(debug)하기 어렵게 만든다.

해결책 : 단방향 데이터 흐름(unidirectional data flow)
그래서 Facebook은 다른 종류의 아키텍처를 시도하기로 결정했다. 이 구조에서 데이터는 단방향으로만 흐르고, 새로운 데이터를 넣으면 처음부터 흐름이 다시 시작된다. 이 아키텍처를 Flux라고 불렀다.

<Flux의 캐릭터>
1. 액션 생성자(the action creator)
모든 변경사항과 사용자와의 상호작용이 거쳐가야 하는 액션의 생성을 담당하고 있다. 언제든 애플리케이션의 상태를 변경하거나 뷰를 업데이트하고 싶다면 액션을 생성해야만 한다.
액션 생성자가 하는 일은 마치 전보기사(telegraph operator)와 같다. 무슨 메시지를 보낼지 알려주면 액션 생성자는 나머지 시스템이 이해할 수 있는 포맷으로 바꿔준다[전보기사가 알파벳을 기계들이 처리할 수 있는 모스부호로 바꾸는 것처럼].
액션 생성자는 타입(type)과 페이로드(payload)를 포함한 액션을 생성한다. 타입은 시스템에 정의 된 액션들(일반적으로 상수들) 중의 하나이다. 액션의 예로는 MESSAGE_CREATE이나 MESSAGE_READ같은 것이 있다.
모든 가능한 액션들을 아는 시스템 덕분에 새로운 개발자가 프로젝트에 들어와서 행동 생성자 파일을 열면 시스템에서 제공하는 API 전체-모든 가능한 상태변경-를 바로 확인할 수가 있다.
일단 액션 생성자가 액션 메시지를 생성한 뒤에는 디스패쳐(dispatcher)로 넘겨준다.
2. 디스패쳐(dispatcher)
디스패쳐는 기본적으로 콜백(callback)이 등록되어 있는 곳이다. 이것은 마치 전화 교환대에서 교환원이 일하는 것과 같다-[전화 교환대에서는 등록된 모든 전화들과의 연결이 가능하다]. 디스패쳐는 액션을 보낼 필요가 있는 모든 스토어(store)를 가지고 있고, 액션 생성자로부터 액션이 넘어오면 여러 스토어에 액션을 보낸다.
이 처리는 동기적(synchronously) 실행된다. 만약 스토어들 사이에 의존성(dependency)이 있어서 하나를 다른 것보다 먼저 업데이트를 해야한다면, waitFor()를 사용해서 디스패쳐가 적절히 처리하도록 할 수 있다.
Flux의 디스패쳐는 다른 아키텍처들과는 조금 다른 점이 있다. 바로 액션 타입과는 관계 없이 등록된 모든 스토어로 보내진다는 점이다. 이 말인 즉슨, 스토어가 특정 액션만 구독(subscribe)하지 않고 모든 액션을 일단 받은 뒤 처리할지 말지를 결정한다는 뜻이다.

3. 스토어(sotre)
스토어는 어플리케이션 내의 모든 상태와 그와 관련된 로직을 가지고 있다.
스토어는 마치 모든 것을 관리하는 정부관료와 같다. 모든 상태 변경은 반드시 스토어에 의해서 결정되어야만 하며, 상태 변경을 위한 요청을 스토어에 직접 보낼 순 없다. 스토어에는 설정자(setter)가 존재하지 않으므로, 상태 변경을 요청하기 위해서는 반드시 모든 정해진 절차를 따라야만 한다. 다시말해, 무조건 액션 생성자/디스패쳐 파이프라인을 거쳐서 액션을 보내야만 한다.
만약 스토어가 디스패쳐에 등록되어 있다면, 모든 액션을 받게 될 것이다. 스토어의 내부에서는 보통 switch statement를 사용해서 처리할 액션과 무시할 액션을 결정하게 된다. 만약 처리가 필요한 액션이라면, 주어진 액션에 따라서 무엇을 할 지 결정하고 상태를 변경하게 된다.
일단 스토어에 상태 변경을 완료하고 나면, 변경 이벤트(change event)를 내보낸다. 이 이벤트는 컨트롤러 뷰(the controller view)에 상태가 변경했다는 것을 알려주게 된다.

4. 컨트롤러 뷰(the controller view)와 뷰(the view)
뷰는 상태를 가져오고 유저에게 보여주고 입력받을 화면을 렌더링하는 역할을 맡는다. 뷰는 발표자와 같다. 어플리케이션 내부에 대해서는 아는 것이 없지만, 받은 데이터를 처리해서 사람들이 이해할 수 있는 포맷(HTML)으로 어떻게 바꾸는지 알고 있다.
컨트롤러 뷰는 스토어와 뷰 사이의 중간관리자 같은 역할을 한다. 상태가 변경되었을 때 스토어가 그 사실을 컨트롤러 뷰에게 알려주면, 컨트롤러 뷰는 자신의 아래에 있는 모든 뷰에게 새로운 상태를 넘겨준다.


<Flux의 동작과정>

1. 준비(the setup)
먼저 어플리케이션 초기화할 대 딱 한번 준비과정을 가진다.
  - 스토어는 디스패쳐에 액션이 들어오면 알려달라고 말해둔다.
  - 컨트롤러 뷰는 스토어에게 최신 상태를 묻는다.
  - 스토어가 컨트롤러 뷰에게 상태를 주면 렌더링하기 위해 모든 자식 뷰에게 상태를 넘겨준다.
  - 컨트롤러 뷰는 스토어에게 상태가 바뀔 때 알려달라고 다시 부탁한다.

2. 데이터 흐름(the data flow)
준비과정이 끝나면 어플리케이션은 유저 입력을 위한 준비가 완료된다. 사용자의 입력으로 인한 액션이 생겼을 경우를 보자.
사용자 입력으로부터 데이터 흐름을 만들 것이다.
  - 뷰는 액션 생성자에게 액션을 준비하라고 말한다.
  - 액션 생성자는 액션을 포맷에 맞게 만들어서 디스패쳐에 넘겨준다.
  - 디스패쳐는 들어온 액션의 순서에 따라 알맞은 스토어에 보낸다. 각 스토어는 모든 액션을 받게 되지만 필요한 액션만을 골라서 상태를 필요에 맞게 변경한다.
  - 상태 변경이 완료되면 스토어는 자신을 구독(subscribe)하고 있는 컨트롤러 뷰에게 그 사실을 알린다.
  - 연락을 받은 컨트롤러 뷰들은 스토어에게 변경된 상태를 요청한다.
  - 스토어가 새로운 상태를 넘겨주면, 컨트롤러 뷰는 자신 아래의 모든 뷰에게 새로운 상태에 맞게 렌더링하라고 알린다.


[2. Redux란?]

Redux란 JavaScript 어플리케이션에서 data-state와 UI-state를 관리해주는 도구이다.
Facebook에서 React가 함께 소개한 Flux 아키텍쳐를 구현한 라이브러리이다. 이 라이브러리는 컴퍼넌트끼리의 데이터 관리를 쉽고 효율적으로 할 수 있게 해준다.

Redux는 Flux가 해결하는 문제점에다가 추가적인 문제점을 더 해결할 수 있다.

Flux와 같이 Redux도 어플리케이션의 상태를 더욱 예측 가능하게 만들어준다. 만약에 상태를 변경하고 싶다면 액션을 발생시켜야 한다. 상태를 저장하고 있는 스토어(store)는 접근자(getter)만 있고 설정자(setter)는 없으므로 직접적으로 상태를 바꿀 방법이 존재하지 않는다. 이런 기본적인 점은 Flux와 Redux가 아주 비슷하다.

다만 Flux로 처리하기에는 어려운 몇몇 문제점들이 있었다.

문제점 1. 스토어의 코드는 어플리케이션 상태를 삭제하지 않고는 리로딩(reloading)이 불가능하다.
Flux에서 스토어(store)는 다음의 두 가지를 포함한다.
  1. 상태 변환을 위한 로직
  2. 현재 어플리케이션 상태

스토어 객체 하나가 이 두 가지를 가지고 있는 것은 핫 리로딩(hot reloading)을 할 때 문제점을 만든다. 새로운 상태 변환 로직(state change logic)을 위해 스토어 객체를 리로딩하면 스토어에 저장되어 있는 기존의 상태까지 잃어버리는 데다가 스토어와 시스템의 나머지 부분 사이에 있는 이벤트 구독(event subscription)까지 망가져버린다.

해결방법
두 기능을 분리하자. 한 객체는 어플리케이션 상태만을 가지게 하고, 이 객체는 리로디앟지 않도록 하자. 또 다른 객체는 모든 상태 변환 로직을 가지도록 하자. 이 객체는 상태를 가지고 있지 않으므로 걱정없이 리로딩 할 수 있을 것이다.

문제점 2. 어플리케이션 상태는 매 액션마다 재기록된다.
시간 여행 디버깅(time travel debugging)을 위해서는 상태 객체의 모든 버전들을 기록해두어야 한다. 그걸 가지고 쉽게 이전 상태로 돌아갈 수 있다.
매번 상태가 새로 바뀔 때마다 이전 어플리케이션 상태를 상태 객체의 버전들을 저장하는 배열에 추가할 필요가 있다. 하지만 JavaScript의 동작방식 때문에 단순히 상태를 가진 변수를 배열에다가 추가하는 것만으로는 부족하다. 이 방식으로는 어플리케이션 상태의 스냅샷(snapshot)을 생성하는게 아니라 같은 객체를 가리키는 새로운 포인터(pointer)를 만들 뿐이다.
제대로 동작하게 만들기 위해서는 각각의 버전이 완벽히 독립된 객체가 될 필요가 있다. 그러면 이전 상태들이 실수로 수정되는 일은 일어나지 않을 것이다.

해결방법
액션이 스토어로 전달되었을 때 기존의 어플리케이션 상태를 수정하는 대신, 그 상태를 복사한 뒤 복사본을 수정하면 된다.

문제점 3. 서드파티 플러그인(third-party plugin)이 들어갈 좋은 장소가 없다.
개발자 도구는 여러 곳에 쉽게 쓰일 수 있도록 만들어야 한다. 사용자는 자신의 코드를 수정하지 않고도 간단히 코드 몇 줄을 집어넣는 것만으로 개발자 도구를 사용할 수 있어야 한다.
이렇게 하기 위해서는 기존의 코드에 서드파티 플러그인을 추가할 수 있는 장소인 확장점(extension point)이 필요하다.

해결방법
시스템의 부분을 다른 객체들로 쉽게 감쌀 수 있게 만들어보자. 이 객체들은 약간의 추가 기능들을 시스템의 부분에 추가한다. 이런 확장점(extension point)을 "enhancer" 또는 "higher order" 객체 혹은 미들웨어(middleware)라고 부른다는 것을 알 수 있다.
또한 상태 변환 로직(state change logic)을 트리를 사용해서 구조화하자. 상태가 변했다는 것을 뷰에게 알리기 위해 스토어는 단 하나의 이벤트만 보내면 될 것이다. 이 이벤트는 모든 상태 트리가 처리 된 뒤에 보낸다.

  
  이런 문제점들과 해결방법으로 개발자 도구 활용 사례를 중점적으로 보았다. 이 외에도 Redux과 Flux 사이에는 더 많은 차이점이 있다. 예를 들어, Redux는 보일러플레이트(boilerplate)를 줄이고 스토어 내의 로직을 재사용하기 쉽게 만든다.

새로운 캐릭터 : Flux에서 Redux로 오면서 캐릭터의 배역이 약간 달라졌다.

<Redux의 캐릭터>

1. 액션 생성자(action creators)

Redux는 Flux에서 액션 생성자를 그대로 가져왔다. 어플리케이션 상태를 바꾸고 싶다면 항상 액션을 보내야만 한다. 이것이 상태를 바꾸기 위한 유일한 방법이다.
Flux에 대한 이전 글에서 이야기했듯이 액션 생성자는 전보기사(telegraph operator)와 하는 일이 비슷하다. 어떤 메시지를 보내고 싶은지를 액션 생성자에게 알려주면 나머지 시스템이 이해할 수 있는 포맷으로 바꿔준다.
Flux와는 다르게 Redux의 액션 생성자는 디스패쳐(dispatcher)로 액션을 보내지는 않는다. 대신 포맷을 바꾼 뒤 액션을 돌려준다.

2. 스토어(store)

Flux의 스토어는 모든 것을 관리하는 정부관료와 같다고 이야기했었다. 모든 상태 변화는 스토어에 의해서 이루어져야 하고 스토어로 직접 요청하는 대신 액션 파이프라인을 따라가야 한다. Redux의 스토어도 역시 같은 역할을 하지만 Flux의 그것과는 약간 다르다.
Flux에서는 다수의 스토어를 가질 수 있다. 각 스토어는 각자의 범위를 갖고 그 내부의 모든 컨트롤을 가진다. 그리고 어플리케이션 상태 중 한 조각을 가지고 있고, 그 상태 조각과 관련된 모든 변환 로직을 가진다.
반면 Redux의 스토어는 좀 더 일을 다른 곳에 위임하는 경향이 있으며, 그렇게 해야만 한다. 왜냐하면 Redux는 단 하나의 스토어만을 가지기 때문이다. 만약 혼자서 모든 것을 처리하려고 한다면 아마 처리할 양이 너무 많을 것이다.

대신 Redux의 스토어는 상태 트리(state tree) 전체를 유지하는 책임을 진다. 액션이 들어왔을 때 어떤 상태변화가 필요한지에 대한 일은 위임하며, 바로 다음에 이야기할 리듀서(reducer)가 그 일을 맡는다.

3. 리듀서(the reducers)

스토어는 액션이 어떤 상태 변화를 만드는지 알 필요가 있을 때 리듀서에게 묻는다. 루트 리듀서(root reducer)는 어플리케이션 상태 객체의 키(key)를 기준 삼아 상태를 조각조각 나눈다. 이렇게 나누어진 상태 조각은 그 조각을 처리할 줄 아는 리듀서로 넘겨준다.
리듀서는 마치 서류 복사에 지나치게 열성적인 사무실 직원들과 같다. 일을 망치는 것에 아주 민감하므로 넘겨받은 예전 상태를 변경하지 않는다. 대신 새로운 복사본을 만든 후 거기에다가 모든 변경사항을 적용한다.
이것이 바로 Redux의 키 아이디어 중 하나이다. 상태 객체는 직접 변경되지 않는다. 대신, 각각의 상태 조각이 복사 후 변경되고 새로운 상태 객체 하나로 합쳐진다.
리듀서는 복사되고 업데이트된 상태 객체를 루트 리듀서에게 넘겨주고, 루트 리듀서는 이 객체를 스토어로 보낸다. 그리고 스토어는 이 객체를 새로운 어플리케이션 상태로 만든다.
만약 작은 어플리케이션이라면 하나의 리듀서만 가지고도 전체 상태의 복사본을 만들고 상태를 변경할 수 있다. 아주 큰 어플리케이션이라면, 많은 리듀서를 가진 큰 리듀서 트리를 사용할 수도 있다. 이것이 Flux와 Redux의 또 다른 점이다. Flux는 스토어가 서로 연결될 필요도 없고 수평적 구조를 가졌다. 반면 Redux는 리듀서가 트리 모양의 계급구조 안에 존재한다. 이 구조는 컴포넌트 구조처럼 필요한 만큼의 레벨(트리의 높이)을 얼마든지 가질 수 있다.

4. 뷰: 영민한 컴포넌트와 우직한 컴포넌트(the views: smart and dumb components)

Flux는 컨트롤러 뷰(controller view)와 일반 뷰(regular view)를 가지고 있다. 컨트롤러 뷰는 중간 관리자 같아서 스토어와 자식 뷰 사이에서 커뮤니케이션을 관리한다.
Redux도 비슷한 컨셉을 가지고 있다. 영민한 컴포넌트와 우직한 컴포넌트가 그것이다. 영민한 컴포넌트는 관리자처럼 행동하는데, Flux의 컨트롤러 뷰보다 몇몇 규칙을 더 따른다.
  - 영민한 컴포넌트는 액션 처리를 책임진다. 영민한 컴포넌트 밑의 우직한 컴포넌트가 액션을 보낼 필요가 있을 때, 영민한 컴포넌트는 props를 통해서 우직한 컴포넌트에 함수를 보낸다. 우직한 컴포넌트는 받은 함수를 콜백으로써 단순히 호출만 한다.
  - 영민한 컴포넌트는 자기 자신의 CSS style을 가지고 있지 않다.
  - 영민한 컴포넌트는 자기 자신의 DOM을 거의 가지고 있지 않다. 대신, DOM 요소들을 관리하는 우직한 컴포넌트들을 관리한다.
  (* 영민한 컴포넌트가 root와 비슷한 역할일까?*)

우직한 컴포넌트는 액션에 직접 의존성을 가지지는 않는다. 이는 모든 액션을 props를 통해 넘겨받기 때문이다. 이말인 즉슨, 우직한 컴포넌트는 다른 로직을 가진 다른 어플리케이션에서 재사용될 수 있다는 뜻이다. 또한 어느정도 보기좋게 할만큼의 CSS style도 포함하고 있다(따로 style props를 받아 기본 style에 병합시켜서 style을 바꿀 수도 있다). 
(*props는 뭘까?*)

5. 뷰 레이어 바인딩(the view layer binding)

스토어를 뷰에 연결하기 위해서 Redux는 약간의 도움이 필요하다. 그 둘을 함께 묶어줄 무언가가 필요한데, 이걸 해주는 것이 바로 뷰 레이어 바인딩이다. React를 사용한다면 react-redux가 그것이다.
뷰 레이어 바인딩은 뷰 트리(view tree)를 위한 IT부서와 같다. 모든 컴포넌트를 스토어에 연결하는 역할을 하며, 많은 기술적인 세부사항들을 처리해서 트리 구조가 세부사항에 신경 쓰지 않도록 해준다.
뷰 레이어 바인딩은 세 개의 컨셉을 가지고 있다.
  - 1. 공급 컴포넌트(provider component) : 컴포넌트 트리를 감싸는 컴포넌트이다. connet()를 이용해 루트 컴포넌트 밑의 컴포넌트들이 스토어에 연결되기 쉽게 만들어준다.
  - 2. connect() : react-redux가 제공하는 함수이다. 컴포넌트가 어플리케이션 상태 업데이트를 받고 싶으면 connect()를 이용해서 컴포넌트를 감싸주면 된다. 그러면 connect()가 셀렉터(select)를 이용해서 필요한 모든 연결을 만들어준다.
  - 3. 셀렉터(selector) : 직접 만들어야 하는 함수이다. 어플리케이션 상태 안의 어느 부분이 컴포넌트에 props로써 필요한 것인지 지정한다.

6. 루트 컴포넌트(the root component)

모든 React 어플리케이션은 루트 컴포넌트를 가진다. 이것은 단지 컴포넌트 계층 구조에서 가장 위에 위치하는 컴포넌트일 뿐이다. 하지만 Redux에서 루트 컴포넌트는 추가로 책임져야 할 것이 존재한다.
루트 컴포넌트가 맡는 임무는 마치 C-Level 임원과 같다(CEO, CTO, CFO 등). 루트 컴포넌트는 모든 팀이 일을 하도록 하는 임무를 가진다. 스토어를 생성하고 무슨 리듀서를 사용할지 알려주며 뷰 레이어 바인딩과 뷰를 불러온다.
하지만 루트 컴포넌트는 어플리케이션을 초기화한 뒤로는 거의 하는 일이 없다. 화면의 갱신에도 더는 신경쓰지 않는다. 화면 갱신은 뷰 레이어 바인딩의 도움으로 아래의 컴포넌트들이 맡아서 처리한다.

<Redux의 동작 과정>

1. 준비(the setup)
  - 스토어를 준비한다. : 루트 컴포넌트는 createStore()를 이용해서 스토어를 생성하고 무슨 리듀서를 사용할지 알려준다. 루트 컴포넌트는 이미 필요한 모든 리듀서를 가지고 있다. combineReducers()를 이용해서 다수의 리듀서를 하나로 묶는다.
  - 스토어와 컴포넌트 사이의 커뮤니케이션을 준비한다. : 루트 컴포넌트는 공급 컴포넌트로 서브 컴포넌트를 감싸고 스토어와 공급 컴포넌트 사이를 연결한다. 공급 컴포넌트는 기본적으로 컴포넌트를 업데이트하기 위한 네트워크를 생성한다. 영민한 컴포넌트는 connect()로 네트워크에 연결한다. 이렇게 상태 업데이트를 받을 수 있게 만든다.
  - 액션 콜백(action callback)을 준비한다. : 우직한 컴포넌트가 액션과 쉽게 일할 수 있게 하기 위해 영민한 컴포넌트는 bindActionCreator()로 액션 콜백을 준비한다. 이렇게 간단히 콜백을 우직한 컴포넌트에 넘겨줄 수 있다. 액션은 포맷이 바뀐 뒤 자동적으로 보내진다.

2. 데이터 흐름(the data flow)
  - 뷰가 액션을 요청한다. 액션 생성자가 포맷을 변환한 뒤 돌려준다.
  - bindActionCreators()가 준비과정에서 사용되었으면 자동으로 액션이 보내진다. 그게 아니라면 뷰가 직접 액션을 보낸다.
  - 스토어가 액션을 받는다. 현재 어플리케이션 상태 트리와 액션을 루트 리듀서에게 보낸다.
  - 루트 리듀서는 상태 트리를 조각으로 나눈 뒤 알맞은 서브 리듀서로 상태 조각들을 넘겨준다.
  - 서브 리듀서는 받은 상태 조각을 복사한 뒤, 그 복사본을 변경한다. 루트 리듀서에게 변경된 복사본을 돌려준다.
  - 모든 서브 리듀서가 변경된 상태 조각들을 돌려주면, 루트 리듀서는 이 상태 조각들을 한데 모아상태 트리로 만든 뒤 스토어로 돌려준다. 스토어는 새로운 상태 트리를 옛날 상태 트리와 바꾼다.
  - 스토어는 뷰 레이어 바인딩에게 어플리케이션 상태가 변경되었다는 것을 알린다.
  - 뷰 레이어 바인딩은 스토어에게 새로운 상태를 보내달라고 요청한다.
  - 뷰 레이어 바인딩은 뷰에게 화면을 업데이트하도록 요청한다.
  



[3. 느낀점]
  처음에 과제를 받았을 때는 난감하기만 했다. React의 기초밖에 모르겠는데 Redux가 뭔지도 몰랐지 때문이다. 또 처음에는 React App여서 React한 어플리케이션을 만들어야하나 싶었다. 수업 때 집중해야한다는 것을 다시 한 번 느꼈다. 다행히 Redux, Flux, React 등등 개념이 여러 곳에 잘 정리되어 있었다. 이번 과제를 통해서 Redux의 개념을 배울 수 있어서 좋았고 Flux 아키텍쳐가 무엇인지 어떤 흐름으로 진행되는지 알 수 있어서 좋았다. 웹 쪽에 관심이 없어서 몰랐던 부분들을 돌아본 계기가 됐다.




출처 : blog.naver.com/naan_ace/221107702135, https://velopert.com/1225, bestalign.github.io/2015/10/06/cartoon-guide-to-flux/, bestalign.github.io/2015/10/26/cartoon-intro-to-redux/
