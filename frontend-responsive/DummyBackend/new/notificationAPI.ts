const dummyMatchRequestsData = [
  //   {
  //     game_id: string,
  //     game_mode: string,
  //     friend_id: string,
  //     profile_image: string,
  //   },
  //   {
  //     game_id: string,
  //     game_mode: string,
  //     friend_id: string,
  //     profile_image: string,
  //   },
  //   ...
  {
    game_id: "1",
    game_mode: "single",
    friend_id: "2",
    profile_image: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    game_id: "2",
    game_mode: "single",
    friend_id: "3",
    profile_image: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    game_id: "3",
    game_mode: "single",
    friend_id: "4",
    profile_image: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    game_id: "4",
    game_mode: "single",
    friend_id: "5",
    profile_image: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    game_id: "5",
    game_mode: "single",
    friend_id: "6",
    profile_image: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    game_id: "6",
    game_mode: "single",
    friend_id: "7",
    profile_image: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    game_id: "7",
    game_mode: "single",
    friend_id: "8",
    profile_image: "https://www.w3schools.com/howto/img_avatar.png",
  },
];

const dummyFriendRequestsData = [
  // {
  //   id: string,
  //   profileImage: string,
  //   introduction: string,
  // },
  // {
  //   id: string,
  //   profileImage: string,
  //   introduction: string,
  // },
  // ...
  {
    id: "1",
    profileImage: "https://www.w3schools.com/howto/img_avatar.png",
    introduction: "Hello, I am User1",
  },
  {
    id: "2",
    profileImage: "https://www.w3schools.com/howto/img_avatar.png",
    introduction: "Hello, I am User2",
  },
  {
    id: "3",
    profileImage: "https://www.w3schools.com/howto/img_avatar.png",
    introduction: "Hello, I am User3",
  },
  {
    id: "4",
    profileImage: "https://www.w3schools.com/howto/img_avatar.png",
    introduction: "Hello, I am User4",
  },
  {
    id: "5",
    profileImage: "https://www.w3schools.com/howto/img_avatar.png",
    introduction: "Hello, I am User5",
  },
  {
    id: "6",
    profileImage: "https://www.w3schools.com/howto/img_avatar.png",
    introduction: "Hello, I am User6",
  },
  {
    id: "7",
    profileImage: "https://www.w3schools.com/howto/img_avatar.png",
    introduction: "Hello, I am User7",
  },
];

export function notification__getFriendRequests(): friendRequest[] {
  return dummyFriendRequestsData;
}

export async function notification__getFriendRequestsAsync(): Promise<friendRequest[]> {
  // delay 1 second
  setTimeout(() => {}, 1000);
  return dummyFriendRequestsData;
}

export function notification__getMatchRequests(): matchRequest[] {
  return dummyMatchRequestsData;
}

export async function notification__getMatchRequestsAsync(): Promise<matchRequest[]> {
  // delay 1 second
  setTimeout(() => {}, 1000);
  return dummyMatchRequestsData;
}


export interface friendRequest {
  id: string;
  profileImage: string;
  introduction: string;
}

export interface matchRequest {
  game_id: string;
  game_mode: string;
  friend_id: string;
  profile_image: string;
}