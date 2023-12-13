import ScrollableContainer from '@/components/container/ScrollableContainer';
import InvitationCard from './InvitationCard';
import {Accordion} from '@/components/shadcn/ui/accordion';
import type {userType} from '@/types/user';
import {useEffect, useState} from 'react';
import useAxios from '@/hooks/useAxios';
// function to filter users. Returns filtered users.

//TODO: 추후에 status별로 따로 요청 또는 소켓 통해서 사용자 상태 업데이트

interface UserCardSectionProps {
  friends: userType[];
  searchTargetInput: string;
  className?: string;
  theme?: string;
}

function filterUsers(users: userType[], searchTargetInput: string) {
  // filter input
  if (searchTargetInput !== '') {
    users = users.filter((user) =>
      user.name.toLowerCase().includes(searchTargetInput.toLowerCase())
    );
  }
  return users;
}

function isUserIdInArray(userId: string, array: userType[]) {
  return array.some((user) => user.id === userId);
}

function handleCardClick(userId: string, fetchData: any, theme?: string) {
  console.log(userId);
  console.log(theme);
  // fetchData({
  //   method: 'post',
  //   url: '/users/friends',
  //   data: {
  //     id: userId,
  //     theme: theme
  //   },
  //   errorTitle: '매치 요청 실패',
  //   errorDescription: '매치 요청에 실패했습니다.'
  // });
  // 이 부분 인터페이스 작성해서 협의 후 수정 예정
  // 소켓으로 요청 보내는 부분이 필요할 것 같음 -> 구현 예정인 알림 소켓을 활용할 수 있을 것 같음
}

export default function InvitationCardSection({
  friends,
  searchTargetInput,
  className = '',
  theme
}: UserCardSectionProps) {
  const [users, setUsers] = useState<userType[]>([]);
  const {fetchData, response, isSuccess} = useAxios();

  useEffect(() => {
    setUsers(filterUsers(friends, searchTargetInput));
  }, [searchTargetInput, friends]);
  return (
    <ScrollableContainer className={` ${className}`}>
      <Accordion
        type='multiple'
        className='flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-5'
      >
        {users &&
          users.map((user) => (
            <InvitationCard
              key={user.id}
              id={user.id}
              profileImage={user.profileImage}
              name={user.name}
              currentStatus={user.currentStatus}
              introduction={user.introduction}
              isFriend={isUserIdInArray(user.id, friends)}
              isBlocked={isUserIdInArray(user.id, [])}
              onClick={() => handleCardClick(user.id, fetchData, theme)}
            />
          ))}
      </Accordion>
    </ScrollableContainer>
  );
}
