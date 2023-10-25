/**
 * Dummy data for frontend development
 * Dummy Database and Dummy fetching API functions will be implemented here
 *
 * Database:
 * - User list (UserInfo[])
 * - Game list (GameInfo[])
 * - Game request list (GameRequest[])
 * - Friend request list (FriendRequest[])
 *
 */

import { UserInfo, GameInfo, MatchRequest, FriendRequest } from "@/api/type";

const dummyDB = {
  users: [
    {
      id: "1",
      name: "User1",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User1",
      friendList: ["2", "3"],
      blockList: ["4"],
    },
    {
      id: "2",
      name: "User2",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User2",
      friendList: ["1", "3"],
      blockList: ["4"],
    },
    {
      id: "3",
      name: "User3",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User3",
      friendList: ["1", "2"],
      blockList: ["4"],
    },
    {
      id: "4",
      name: "User4",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User4",
      friendList: [],
      blockList: [],
    },
  ],

  games: [
    {
      id: "1",
      type: "Ladder",
      status: "Waiting",
      playerScorePairs: [
        ["1", 0],
        ["2", 0],
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: "2",
      type: "Ladder",
      status: "Playing",
      playerScorePairs: [
        ["3", 10],
        ["4", 20],
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: "3",
      type: "NonLadder",
      status: "Finished",
      playerScorePairs: [
        ["1", 0],
        ["2", 0],
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: "4",
      type: "NonLadder",
      status: "Cancelled",
      playerScorePairs: [
        ["1", 0],
        ["2", 0],
      ],
      startTime: new Date(),
      endTime: new Date(),
    },
  ],

  gameRequests: [
    {
      gameId: "1",
      challengerId: "1",
      challengedId: "2",
      requestTime: new Date(),
    },
    {
      gameId: "2",
      challengerId: "3",
      challengedId: "4",
      requestTime: new Date(),
    },
    {
      gameId: "3",
      challengerId: "1",
      challengedId: "2",
      requestTime: new Date(),
    },
    {
      gameId: "4",
      challengerId: "1",
      challengedId: "2",
      requestTime: new Date(),
    },
  ],

  friendRequests: [
    {
      id: "1",
      from: "1",
      to: "2",
      requestTime: new Date(),
      status: "Pending",
    },
    {
      id: "2",
      from: "3",
      to: "4",
      requestTime: new Date(),
      status: "Pending",
    },
    {
      id: "3",
      from: "3",
      to: "4",
      requestTime: new Date(),
      status: "Pending",
    },
    {
      id: "4",
      from: "1",
      to: "2",
      requestTime: new Date(),
      status: "Pending",
    },
  ],
};

const currentUserIndex = 1;
const printCalledFunctionName = true;

// async functions for fetching data from dummy database (1sec -> pass data)
export async function getDummyUserInfo(userId: string): Promise<UserInfo> {
  // wait for 1 sec
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const user = dummyDB.users.find((user) => user.id === userId) as UserInfo;
  if (!user) throw new Error("User not found");
  if (printCalledFunctionName)
    console.log(`getDummyUserInfo(${userId}) called`);
  return user;
}

export async function getDummyCurrentUser(): Promise<UserInfo> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const user = dummyDB.users[currentUserIndex] as UserInfo;
  if (!user) throw new Error("User not found");
  if (printCalledFunctionName) console.log(`getDummyCurrentUser() called`);
  return user;
}

export async function getDummyCurrentUserId(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const user = dummyDB.users[currentUserIndex] as UserInfo;
  if (!user) throw new Error("User not found");
  if (printCalledFunctionName) console.log(`getDummyCurrentUserId() called`);
  return user.id;
}

export async function getDummyMatchRequestList(
  userId: string
): Promise<MatchRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const matchRequestList = dummyDB.gameRequests.filter(
    (matchRequest) => matchRequest.challengedId === userId
  ) as MatchRequest[];
  if (printCalledFunctionName)
    console.log(`getDummyMatchRequestList(${userId}) called`);
  return matchRequestList;
}

export async function getDummyFriendRequestList(
  userId: string
): Promise<FriendRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const friendRequestList = dummyDB.friendRequests.filter(
    (friendRequest) => friendRequest.to === userId
  ) as FriendRequest[];
  if (printCalledFunctionName)
    console.log(`getDummyFriendRequestList(${userId}) called`);
  return friendRequestList;
}

export async function getDummyNotificationCount(
  userId: string
): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const matchRequestCount = dummyDB.gameRequests.filter(
    (matchRequest) => matchRequest.challengedId === userId
  ).length;
  const friendRequestCount = dummyDB.friendRequests.filter(
    (friendRequest) => friendRequest.to === userId
  ).length;
  if (printCalledFunctionName)
    console.log(`getDummyNotificationCount(${userId}) called`);
  return matchRequestCount + friendRequestCount;
}
