import {Theme} from '@/types/game';
import Image from 'next/image';
import ScrollableContainer from '../container/ScrollableContainer';

import {Button} from '../shadcn/ui/button';
import {toast} from '../shadcn/ui/use-toast';
import {useState} from 'react';

export default function ChildTab({setTheme}: any) {
  const [selected, setSelected] = useState('Default');

  // theme array
  const themes = [];
  // push all themes to array
  for (const theme in Theme) {
    themes.push(theme);
  }
  // class name for selected theme
  const nonSelectedTheme =
    'flex justify-center items-center w-72 h-72 bg-transparent rounded-full hover:bg-emerald-500';
  const selectedTheme =
    'flex justify-center items-center w-72 h-72 bg-transparent bg-emerald-500 rounded-full';

  return (
    <ScrollableContainer className=' w-full sm:w-9/12' orientation='horizontal'>
      {themes.map((theme) => (
        <div key={theme}>
          <Button
            className={selected === theme ? selectedTheme : nonSelectedTheme}
            onClick={() => {
              setSelected(theme);
              setTheme(theme);
              toast({
                title: '테마 설정 완료',
                description: `${theme} 테마로 설정되었습니다.`,
                duration: 5000
              });
            }}
          >
            <Image
              src={`/gameThemes/Profile/${theme}.png`}
              width={300}
              height={300}
              alt='이미지를 불러오는데 실패했습니다.'
              className='rounded-full'
            />
          </Button>
        </div>
      ))}
    </ScrollableContainer>
  );
}
