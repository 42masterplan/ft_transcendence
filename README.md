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
<p>If you have a channel you're engaged with, the page displays the rooms you're engaged with, as shown below.</p>
<p>참여 중인 채널이 있는 경우 페이지에 다음과 같이 참여 중인 방이 표시됩니다.</p>
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/c0efee3a-65b4-4db2-ad90-6952034791c8">
<p>You can join any publicly available channel from the Public Channels list</p> 
<p>공개 채널 목록에서 공개적으로 제공되는 모든 채널에 참여할 수 있습니다.</p> 
<p>Here, you won't see a list of channels you've joined.</p>
<p>여기에는 내가 참여한 채널 목록이 표시되지 않습니다.</p>
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/ea8a6daf-4c11-4297-92f8-02f6df00f5a9">
<p>When you create a channel, you can decide whether to make it public or private.</p>
<p>채널을 만들 때 공개 또는 비공개로 설정할지 여부를 결정할 수 있습니다.</p>
<p>The difference between public and private is whether you can join from the room's public list. Private rooms are between friends and can only be joined by invitation when you first create the room.</p>
<p>공개와 비공개의 차이점은 방의 공개 목록에서 참여할 수 있는지 여부입니다. 비공개 대화방은 친구 간의 대화방으로, 처음 대화방을 만들 때 초대를 통해서만 참여할 수 있습니다.</p>
<p>When you create a channel, you become the room leader. You can invite your friends to join the room, similar to how invitations work in KakaoTalk.</p>
<p>채널을 만들면 룸 리더가 됩니다. 친구를 초대할 수 있으며, 친구는 카카오톡의 초대 방식과 유사하게 방에 참여하게 됩니다.</p>
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/7d4e35d5-653a-4468-8457-4f86510c0750">
<p>When you click Channels, you'll see a list of channels you're in on the left, and you can chat with other users.</p>
<p>채널을 클릭하면 왼쪽에 내가 참여 중인 채널 목록이 표시되고 다른 사용자와 채팅을 할 수 있습니다.</p>
<p>If you block a user, their messages will no longer appear in the channel, but if you unblock them later, their messages will appear again.</p>
<p>사용자를 차단하면 해당 사용자의 메시지가 더 이상 채널에 표시되지 않지만, 나중에 차단을 해제하면 메시지가 다시 표시됩니다.</p>
<p>Channels are divided into three permission levels: room moderators who can create rooms, admins who can block or mute other users, and regular users.</p>
<p>채널은 방을 만들 수 있는 방 운영자, 다른 사용자를 차단하거나 음소거할 수 있는 관리자, 일반 사용자의 세 가지 권한 수준으로 나뉩니다.</p>
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/f314208d-802b-4ac8-a368-aa1785cd6c5f">
<p>A normal user is a user who can only chat without any other permissions, and is set as a normal user by default when entering a new chat room.</p>
<p>일반 사용자는 다른 권한 없이 채팅만 할 수 있는 사용자를 말하며, 새 대화방에 입장하면 기본적으로 일반 사용자로 설정됩니다.</p>
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/8432fda8-611f-463f-9ca7-a872c520db5b">
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/849a07f7-a1e8-4088-87c9-06f909212c3a">
<p>Admins can ban, block, and mute regular users. A room captain becomes an admin when he or she is assigned to a room as an admin.</p>
<p>관리자는 일반 사용자를 금지, 차단 및 뮤트할 수 있습니다. 방장이 방에 관리자로 지정되면 관리자가 됩니다.</p>
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/bfb127f5-9c1d-4c32-8624-0639f779c065">
<p>Muting a user makes them unavailable to chat for 3 minutes.</p>
<p>사용자를 뮤트하면 해당 사용자는 3분 동안 채팅을 할 수 없게 됩니다.</p>
<p>관리자는 방장을 쫓아내거나, 차단하거나, 뮤트할 수 없습니다</p>
<p>Admins can't kick, block, or mute a room moderators</p>
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/0c414bd7-1b23-4812-9ed3-4e250494ae09">
<p>A room captain has the basic permissions of an admin, plus the additional permissions to unblock blocked users, assign admins, and change the room's password.</p>
<p>방장은 관리자의 기본 권한과 함께 금지된 사용자를 차단 해제하고, 관리자를 지정하고, 룸의 비밀번호를 변경할 수 있는 추가 권한을 갖습니다.
<p>When a room leader leaves a channel, the user with the highest permissions, from oldest to newest, becomes the leader. </p>
<p>방장이 채널을 떠나면 가장 오래된 사용자부터 가장 최근 사용자까지 가장 높은 권한을 가진 사용자가 방장이 됩니다. </p>


### 6.DM
<img width="1000" alt="image" src="https://github.com/42masterplan/ft_transcendence/assets/92737157/02408a09-d40b-45fc-a65f-54f658a88306">
<p>DMs are one-on-one chats between users. Only friends can send each other DMs.</p>

<p>DM은 사용자 간의 일대일 채팅입니다. 친구만 서로에게 쪽지를 보낼 수 있습니다.</p>
<p>If you delete a friend, they won't be able to send each other DMs, but their conversation history will be retained.</p>
<p>친구를 삭제하면 서로에게 쪽지를 보낼 수 없지만 대화 내역은 유지됩니다.</p>

