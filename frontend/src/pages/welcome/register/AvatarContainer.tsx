import AvatarIcon from '@/components/components/custom/AvatarIcon';
export default function AvatarContainer() {
  const AvatarList = [
    'cat_kickBoard',
    'crocodile_health',
    'dog_body',
    'dog_boxing',
    'dog_stateBoard',
    'gorilla_baseBall',
    'kangaroo_boxing',
    'koala_health',
    'mouse_health',
    'panda_health',
    'polarbear_ski',
    'rhino_health',
    'rhino_skateBoard',
    'shark_health',
    'sloth_health'
  ];
  const renderAvatarContainer = () => {
    const rows = [];
    for (let row = 0; row < 4; row++) {
      const rowSquares = [];
      for (let col = 0; col < 4; col++) {
        const idx = row * 4 + col;
        rowSquares.push(<AvatarIcon key={idx} avatarName={AvatarList[idx]} />);
      }
      rows.push(
        <div className='flex items-center space-x-3' key={row}>
          {rowSquares}
        </div>
      );
    }
    return rows;
  };
  return <>{renderAvatarContainer()}</>;
}
