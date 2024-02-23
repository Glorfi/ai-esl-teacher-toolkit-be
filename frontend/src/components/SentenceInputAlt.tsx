import { Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ISentence } from '../interfaces/sentence-with-input';

interface ISentenceInputProps {
  sentence: ISentence;
  isCheckActive: boolean;
  onValidityChange: (isValid: boolean) => void;
}

export const SentenceInputAlt = (props: ISentenceInputProps) => {
  const { isCheckActive, onValidityChange } = props;
  const { sentence, answer } = props.sentence;
  const words = sentence.split(' ');
  const answerWords = answer.split(' ');

  const [values, setValues] = useState<string[]>(Array(words.length).fill(''));
  const [isValid, setIsValid] = useState<boolean | null>(null);

  function handleValidity() {
    const userAnswer = values.join(' ').trim();
    console.log(userAnswer);

    const isValid = userAnswer === answer.trim();
    console.log(isValid);

    setIsValid(isValid);
    onValidityChange(isValid);
  }

  useEffect(() => {
    if (isCheckActive) {
      handleValidity();
    } else {
      setIsValid(null);
    }
  }, [isCheckActive]);

  return (
    <>
      {words.map((word, index) => (
        <React.Fragment key={`fragment${index}`}>
          {answerWords.includes(word) ? (
            <Input
              type="text"
              size={'sm'}
              w={`calc(${word.length}ch + 32px)`}
              m={'0 8px 0 0'}
              boxSizing={'border-box'}
              placeholder={word}
              key={`input${index}`}
              onChange={(e) => {
                const newValues = [...values];
                newValues[index] = e.target.value;
                setValues(newValues);
              }}
              value={values[index]}
              isInvalid={isValid === false ? true : false}
              borderColor={isCheckActive && isValid ? 'green.500' : 'inherit'}
              boxShadow={
                isCheckActive && isValid ? '0 0 0 1px #38A169' : 'inherit'
              }
              isDisabled={isCheckActive}
              _disabled={{ opacity: 1 }}
            />
          ) : (
            <span key={`word${index}`}>{`${word} `}</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
};
