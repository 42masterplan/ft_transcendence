# ft_transcendence 
## Online RealTime Chatting & Pong Game Service

### 1. Login & Register 

#### 1-1.Login
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/ece96228-3dbd-4418-a17b-b2a7fe248ad9">
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/95c83fdc-092a-4b70-9edb-2fd30f94c4ed">
<p>Login is done through 42OAuth.</p>
<p>로그인은 42OAuth를 통해 이루어집니다.</p>
<p>Users who are not logged in cannot access any other pages, they are all redirected to this page.</p>
<p>로그인하지 않은 사용자는 다른 페이지에 액세스할 수 없으며 모두 이 페이지로 리디렉션됩니다.</p>
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/c759b81e-23d6-495a-ba3a-b62d04a808dc">
<p>We also prevented users from accessing the site from multiple tabs.</p>
<p>또한 사용자가 여러 탭에서 사이트에 액세스하지 못하도록 했습니다.</p>

#### 1-2. Register
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/08a495c2-fb6b-4c2f-a70f-71ba512e72e1">
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/6c35c2f6-3137-4f5f-af4a-088b72298d6e">
<p>회원 가입시 닉네임, 아바타 설정 및 상태 메세지를 설정 할 수 있습니다.</p>
<p> 닉네임에는 특수문자는 허용되지 않으며, 아바타 같은 경우 저희가 준비한 15개의 아바타 이외에 커스텀 아바타를 업로드해서 사용도 가능합니다.</p>

#### 1-3. Set Email For 2FA authorization code
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/f6c84653-9a67-41b0-9718-d58ad756b304">
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/bcf1d186-fe5a-4486-8d5f-b5107e3b51e9">
<p>All users will then need to set up an email to complete the signup. Set it to their own email and enter the code correctly, and the signup is complete.</p>
<p>모든 사용자는 가입을 완료하기 위해 이메일을 설정해야 합니다. 자신의 이메일로 설정하고 코드를 올바르게 입력하면 가입이 완료됩니다.</p>


### 2. Profile & (Game History, Achievements)
#### 2-1. Light / Dark Mode & Responsive design pages
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/622d9a60-05c3-4f5a-8c39-3e209935d946">
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/1c2fe285-0948-4604-bc1d-4df46e5887cd">
<p>It is divided into light mode and dark mode. You can set it according to your convenience, it's defaulted to your computer settings and you can change it with the button.</p>
<p>라이트 모드와 다크 모드로 나뉩니다. 사용자의 편의에 따라 설정할 수 있으며, 컴퓨터 설정으로 기본 설정되어 있고 버튼으로 변경할 수 있습니다.</p>

<img width="344" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/d48d5f76-2491-44ec-af39-3bd12bd5744a">
<p>If you look at the page, there is a navigation bar at the bottom that allows users to go directly to the navigation or use the right button on mobile.</p>
<p>페이지를 보시면 아래에 내비게이션 바가 있어서 사용자가 내비게이션 바로 이동하거나 모바일의 경우 오른쪽 버튼을 이용하시면 됩니다.

<img width="350" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/a13011d7-db3e-4ab1-8d39-786ef1aca702">
<p>For mobile, we've changed the button configuration slightly to make it easier to see.</p>
<p>모바일의 경우 보기 쉽도록 버튼 구성을 약간 변경했습니다.</p>

#### 2-2. Change User Info

<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/06fe1594-a7d5-4b16-adf0-b0a826b4fe88">
<p>This is where you can change your user information, including enabling two-step verification, changing your email, and changing your nickname and profile image.</p>
<p>2단계 인증 활성화, 이메일 변경, 닉네임 및 프로필 이미지 변경 등 사용자 정보를 변경할 수 있는 모달 입니다.</p>


### 3. Social Page (Show in-game, on/offline status, Friend Profile, Block, UnBlock)
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/296c9d7e-8d20-4bf1-ba08-3d1ca21672a5">
<p>From here, you can see the user's status display changing in real-time, so you know what they're doing.</p>
<p>당신은 이 페이지에서 실시간으로 변하는 유저의 상태 표시를 보고 무엇을 하는지 알 수가 있습니다.</p>
<p>Additionally, you can friend request and DM, view profiles, block, and manage friends.</p>
<p>추가적으로 친구요청 및 DM, 프로필 보기, 차단 및 친구 관리를 할 수 있습니다.</p>
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/1ad92c8f-c482-406f-bf02-21f701748e09">
<p>When you make a friend request, the recipient receives the following notification in real time</p>
<p>친구 요청을 하면 수신자에게 다음과 같은 알림이 실시간으로 전송됩니다.</p>
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/9a110b68-5be6-4049-a6e0-a23dbcf9843e">
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/d1c92bab-c75a-4346-826b-f333665ce733">
<p>When you block or friend a user, the card changes shape and color and has different buttons.</p>
<p>사용자를 차단하거나 친구를 맺으면 카드의 모양과 색상이 바뀌고 버튼이 달라집니다.</p>

### 4.Game (Ladder And Normal Game)
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/a9c0dc10-3a9f-4b37-a942-ac00106c1e41">
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/bfd8536d-2777-4b32-823f-45318f61e816">
<p>Games are divided into regular games and ladder games.</p>
<p>게임은 일반 게임과 래더 게임으로 나뉩니다.</p>
<p>Ranked games have a fluctuating rating score, while regular games do not.</p>
<p>랭크 게임은 등급 점수가 변동하는 반면, 일반 게임은 변동하지 않습니다.</p>
<p>Ladder games do not allow you to choose a theme, and matches are queued up in order of rating.</p>
<p>래더 게임에서는 테마를 선택할 수 없으며, 등급 순서대로 매치가 대기열에 표시됩니다.</p>
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/34fc64c2-b842-493f-9cbf-440092fc0353">
<p>For regular games, you can choose a theme, and for matchmaking, you can request a game by selecting from your friends list.</p>
<p>일반 게임의 경우 테마를 선택할 수 있으며, 매치메이킹의 경우 친구 목록에서 선택하여 게임을 요청할 수 있습니다.</p>

<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/e7fd98bd-b151-4d76-ab13-1e1059a0d9ed">
<p>When a game is requested, a notification is generated as shown below and waits 15 seconds for the requested user to accept.</p>
<p>게임이 요청되면 아래와 같이 알림이 생성되고 요청된 사용자가 수락할 때까지 15초간 기다립니다.</p>

<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/54aa6a13-b2c6-4504-bb57-62924f7cf7da">
<p>If your game is accepted, you'll wait 5 seconds on a waiting page that displays the game theme, your character's location, and how to play the game before starting the game.</p>
<p>게임이 수락되면 게임 테마와 캐릭터의 위치, 게임 플레이 방법이 표시된 대기 페이지에서 5초간 기다린 후 게임을 시작합니다.</p>
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/8fdcf9f6-a94e-4df0-8d3b-637e50608146">
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/773172da-60dc-4c83-b43e-0a67f341739a">
<p>The game lasts 2 minutes, and the first player to score 10 points wins.</p>
<p>게임은 2분간 진행되며, 먼저 10점을 획득한 플레이어가 승리합니다.</p>
<p>If the score is tied after 2 minutes, deuces are awarded, the ball speeds up 1.5 times, and the game continues until the first player scores 2 points.</p>
<p>2분 후 스코어가 동점일 경우 듀스가 발생하고 공의 속도가 1.5배 빨라지며, 2점을 먼저 득점할 때까지 게임이 계속됩니다.</p>
<p>If a user takes any action, such as leaving or refreshing, a forfeit occurs and the game ends with the opponent scoring 10 points.</p>
<p>사용자가 퇴장 또는 새로 고침 등의 조치를 취하면 몰수가 발생하고 상대방이 10점을 득점한 상태에서 게임이 종료됩니다.</p>


### 5.Channel (Chat rooms with multiple users)
<p>If there are no channels you are engaged with, the page will look like this.</p>
<p>참여 중인 채널이 없는 경우 페이지는 다음과 같이 표시됩니다</p>
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/6534fa70-481e-4946-a14d-555edc5253d9">
<p>참여중인 채널이 있는 경우 페이지는 다음과 같이 제가 참여한 방들이 표시됩니다.</p>
<img width="500" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/c0efee3a-65b4-4db2-ad90-6952034791c8">
<p>공개 채널 목록을 통해 공개된 채널중 원하는 채널에 참여할 수 있습니다.이곳에는 제가 참여한 채널 목록은 나오지 않습니다.</p>
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/7d4e35d5-653a-4468-8457-4f86510c0750">


### 6.DM

### 7.Notification (Friend Request & Game Request)

![image](https://github.com/42masterplan/ft_transcendence/assets/92737157/06c2dc06-eaef-493f-aad3-437b231f5ac4)
