import { UserInfo, GameInfo, MatchRequest, FriendRequest } from "@/lib/type";

import { dummyDB } from "@/DummyBackend/DummyDB";

const currentUserIndex = 1;
const delay = 2000;
const printCalledFunctionName = true;

// getDummyUserInfo : userId -> UserInfo ---------------------------------------

export async function getDummyUserInfoAsync(userId: string): Promise<UserInfo> {
  // wait for 1 sec
  await new Promise((resolve) => setTimeout(resolve, delay));
  const user = dummyDB.users.find((user) => user.id === userId) as UserInfo;
  if (!user) throw new Error("User not found");
  if (printCalledFunctionName)
    console.log(`getDummyUserInfoAsync(${userId}) called`);
  return user;
}

export function getDummyUserInfoSync(userId: string): UserInfo {
  const user = dummyDB.users.find((user) => user.id === userId) as UserInfo;
  if (!user) throw new Error("User not found");
  if (printCalledFunctionName)
    console.log(`getDummyUserInfoSync(${userId}) called`);
  return user;
}

// getDummyGameInfo : gameId -> GameInfo ---------------------------------------

export async function getDummyGameInfoAsync(gameId: string): Promise<GameInfo> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const game = dummyDB.games.find((game) => game.id === gameId) as GameInfo;
  if (!game) throw new Error("Game not found");
  if (printCalledFunctionName)
    console.log(`getDummyGameInfoAsync(${gameId}) called`);
  return game;
}

export function getDummyGameInfoSync(gameId: string): GameInfo {
  const game = dummyDB.games.find((game) => game.id === gameId) as GameInfo;
  if (!game) throw new Error("Game not found");
  if (printCalledFunctionName)
    console.log(`getDummyGameInfoSync(${gameId}) called`);
  return game;
}

// getDummyMatchRequests : challengeId -> MatchRequest[] -----------------------

export async function getDummyMatchRequestsAsync(
  challengeId: string
): Promise<MatchRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const matchRequests = dummyDB.matchRequests.filter(
    (matchRequest) => matchRequest.challengedId === challengeId
  ) as MatchRequest[];
  if (printCalledFunctionName)
    console.log(`getDummyMatchRequestsAsync(${challengeId}) called`);
  return matchRequests;
}

export function getDummyMatchRequestsSync(userId: string): MatchRequest[] {
  const matchRequests = dummyDB.matchRequests.filter(
    (matchRequest) => matchRequest.challengedId === userId
  ) as MatchRequest[];
  if (printCalledFunctionName)
    console.log(`getDummyMatchRequestsSync(${userId}) called`);
  return matchRequests;
}

// getDummyFriendRequests : to -> FriendRequest[] ------------------------------

export async function getDummyFriendRequestsAsync(
  userId: string
): Promise<FriendRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const friendRequests = dummyDB.friendRequests.filter(
    (friendRequest) => friendRequest.to === userId
  ) as FriendRequest[];
  if (printCalledFunctionName)
    console.log(`getDummyFriendRequestsAsync(${userId}) called`);
  return friendRequests;
}

export function getDummyFriendRequestsSync(userId: string): FriendRequest[] {
  const friendRequests = dummyDB.friendRequests.filter(
    (friendRequest) => friendRequest.to === userId
  ) as FriendRequest[];
  if (printCalledFunctionName)
    console.log(`getDummyFriendRequestsSync(${userId}) called`);
  return friendRequests;
}

// getDummyNotificationCount : userId -> number --------------------------------

export async function getDummyNotificationCountAsync(
  userId: string
): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const matchRequestCount = dummyDB.matchRequests.filter(
    (matchRequest) => matchRequest.challengedId === userId
  ).length;
  const friendRequestCount = dummyDB.friendRequests.filter(
    (friendRequest) => friendRequest.to === userId
  ).length;
  if (printCalledFunctionName)
    console.log(`getDummyNotificationCountAsync(${userId}) called`);
  return matchRequestCount + friendRequestCount;
}

export function getDummyNotificationCountSync(userId: string): number {
  const matchRequestCount = dummyDB.matchRequests.filter(
    (matchRequest) => matchRequest.challengedId === userId
  ).length;
  const friendRequestCount = dummyDB.friendRequests.filter(
    (friendRequest) => friendRequest.to === userId
  ).length;
  if (printCalledFunctionName)
    console.log(`getDummyNotificationCountSync(${userId}) called`);
  return matchRequestCount + friendRequestCount;
}

// getDummyCurrentUser : () -> UserInfo ----------------------------------------

export async function getDummyCurrentUserAsync(): Promise<UserInfo> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const user = dummyDB.users[currentUserIndex] as UserInfo;
  if (!user) throw new Error("User not found");
  if (printCalledFunctionName) console.log(`getDummyCurrentUserAsync() called`);
  return user;
}

export function getDummyCurrentUserSync(): UserInfo {
  const user = dummyDB.users[currentUserIndex] as UserInfo;
  if (!user) throw new Error("User not found");
  if (printCalledFunctionName) console.log(`getDummyCurrentUserSync() called`);
  return user;
}

// getDummyCurrentUserId : () -> string ----------------------------------------

export async function getDummyCurrentUserIdAsync(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const user = dummyDB.users[currentUserIndex] as UserInfo;
  if (!user) throw new Error("User not found");
  if (printCalledFunctionName)
    console.log(`getDummyCurrentUserIdAsync() called`);
  return user.id;
}

export function getDummyCurrentUserIdSync(): string {
  const user = dummyDB.users[currentUserIndex] as UserInfo;
  if (!user) throw new Error("User not found");
  if (printCalledFunctionName)
    console.log(`getDummyCurrentUserIdSync() called`);
  return user.id;
}

// getDummyFriendList : userId -> UserInfo[] -----------------------------------

export async function getDummyFriendListAsync(
  userId: string
): Promise<UserInfo[]> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const friendList = dummyDB.users[currentUserIndex].friendList.map(
    (friendId) => dummyDB.users.find((user) => user.id === friendId) as UserInfo
  );
  if (printCalledFunctionName)
    console.log(`getDummyFriendListAsync(${userId}) called`);
  return friendList;
}

export function getDummyFriendListSync(userId: string): UserInfo[] {
  const friendList = dummyDB.users[currentUserIndex].friendList.map(
    (friendId) => dummyDB.users.find((user) => user.id === friendId) as UserInfo
  );
  if (printCalledFunctionName)
    console.log(`getDummyFriendListSync(${userId}) called`);
  return friendList;
}

// getDummyBlockList : userId -> UserInfo[] ------------------------------------

export async function getDummyBlockListAsync(
  userId: string
): Promise<UserInfo[]> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const blockList = dummyDB.users[currentUserIndex].blockList.map(
    (blockId) => dummyDB.users.find((user) => user.id === blockId) as UserInfo
  );
  if (printCalledFunctionName)
    console.log(`getDummyBlockListAsync(${userId}) called`);
  return blockList;
}

export function getDummyBlockListSync(userId: string): UserInfo[] {
  const blockList = dummyDB.users[currentUserIndex].blockList.map(
    (blockId) => dummyDB.users.find((user) => user.id === blockId) as UserInfo
  );
  if (printCalledFunctionName)
    console.log(`getDummyBlockListSync(${userId}) called`);
  return blockList;
}

// getDummyParticipatedGameList : userId -> GameInfo[] -------------------------

export async function getDummyParticipatedGameListAsync(
  userId: string
): Promise<GameInfo[]> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const participatedGameList = dummyDB.games.filter((game) =>
    game.playerScorePairs.some((pair) => pair[0] === userId)
  ) as GameInfo[];
  if (printCalledFunctionName)
    console.log(`getDummyParticipatedGameListAsync(${userId}) called`);
  return participatedGameList;
}

export function getDummyParticipatedGameListSync(userId: string): GameInfo[] {
  const participatedGameList = dummyDB.games.filter((game) =>
    game.playerScorePairs.some((pair) => pair[0] === userId)
  ) as GameInfo[];
  if (printCalledFunctionName)
    console.log(`getDummyParticipatedGameListSync(${userId}) called`);
  return participatedGameList;
}
