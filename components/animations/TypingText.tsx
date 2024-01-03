import React, {useState, useEffect} from 'react';
import styles from './TypingText.module.css';

interface TypingTextProps {
  text: string;
  lineLength?: number;
}

export default function TypingText({text, lineLength = 80}: TypingTextProps) {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    let currentLine = '';
    let currentLineLength = 0;
    const lines: string[] = [];
    for (const word of text.split(' ')) {
      currentLineLength += word.length;
      if (currentLineLength > lineLength) {
        lines.push(currentLine);
        currentLine = '';
        currentLineLength = 0;
      }
      currentLine += word + ' ';
    }
    lines.push(currentLine);

    let i = 0;
    let offset = 0;
    let forwards = true;
    let skip_count = 0;
    const skip_delay = 15;
    const speed = 70;

    const interval = setInterval(() => {
      if (forwards) {
        if (offset >= lines[i].length) {
          ++skip_count;
          if (skip_count === skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      } else {
        if (offset === 0) {
          forwards = true;
          i++;
          offset = 0;
          if (i >= lines.length) {
            i = 0;
          }
        }
      }
      const part = lines[i].substr(0, offset);
      if (skip_count === 0) {
        if (forwards) {
          offset++;
        } else {
          offset--;
        }
      }
      setCurrentText(part);
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [text, lineLength]);

  return <div className={styles.word}>{currentText}</div>;
}

// TODO : FIXING.......
