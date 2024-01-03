export interface friendRequest {
  id: string;
  friend: {
    name: string;
    profileImage: string;
    introduction: string;
  };
}

export interface gameRequest {
  profileImage: string;
  userName: string;
  matchId: string;
  gameMode: 'normal' | 'ladder';
  theme: 'default' | 'soccer' | 'swimming' | 'badminton' | 'basketball';
}
