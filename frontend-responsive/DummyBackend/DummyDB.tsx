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

export const dummyDB = {
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
    {
      id: "5",
      name: "User5",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User5",
      friendList: ["6", "7"],
      blockList: ["8"],
    },
    {
      id: "6",
      name: "User6",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User6",
      friendList: ["5", "7"],
      blockList: ["8"],
    },
    {
      id: "7",
      name: "User7",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User7",
      friendList: ["5", "6"],
      blockList: ["8"],
    },
    {
      id: "8",
      name: "User8",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User8",
      friendList: [],
      blockList: [],
    },
    {
      id: "9",
      name: "User9",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User9",
      friendList: ["10", "11"],
      blockList: ["12"],
    },
    {
      id: "10",
      name: "User10",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User10",
      friendList: ["9", "11"],
      blockList: ["12"],
    },
    {
      id: "11",
      name: "User11",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User11",
      friendList: ["9", "10"],
      blockList: ["12"],
    },
    {
      id: "12",
      name: "User12",
      profileImage: "https://www.w3schools.com/howto/img_avatar.png",
      currentStatus: "Online",
      introduction: "Hello, I am User12",
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
  matchRequests: [
    {
      id: "1",
      challengerId: "1",
      challengedId: "2",
      requestTime: new Date(),
    },
    {
      id: "2",
      challengerId: "3",
      challengedId: "4",
      requestTime: new Date(),
    },
    {
      id: "3",
      challengerId: "1",
      challengedId: "2",
      requestTime: new Date(),
    },
    {
      id: "4",
      challengerId: "1",
      challengedId: "2",
      requestTime: new Date(),
    },
    {
      id: "5",
      challengerId: "2",
      challengedId: "3",
      requestTime: new Date(),
    },
    {
      id: "6",
      challengerId: "4",
      challengedId: "1",
      requestTime: new Date(),
    },
    {
      id: "7",
      challengerId: "3",
      challengedId: "2",
      requestTime: new Date(),
    },
    {
      id: "8",
      challengerId: "2",
      challengedId: "4",
      requestTime: new Date(),
    },
    {
      id: "9",
      challengerId: "1",
      challengedId: "4",
      requestTime: new Date(),
    },
    {
      id: "10",
      challengerId: "4",
      challengedId: "3",
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
    {
      id: "5",
      from: "1",
      to: "2",
      requestTime: new Date(),
      status: "Pending",
    },
    {
      id: "6",
      from: "1",
      to: "2",
      requestTime: new Date(),
      status: "Pending",
    },
    {
      id: "7",
      from: "2",
      to: "3",
      requestTime: new Date(),
      status: "Pending",
    },
    {
      id: "8",
      from: "4",
      to: "1",
      requestTime: new Date(),
      status: "Pending",
    },
    {
      id: "9",
      from: "3",
      to: "1",
      requestTime: new Date(),
      status: "Pending",
    },
    {
      id: "10",
      from: "2",
      to: "4",
      requestTime: new Date(),
      status: "Pending",
    },
    {
      id: "11",
      from: "4",
      to: "2",
      requestTime: new Date(),
      status: "Pending",
    },
  ],
};
