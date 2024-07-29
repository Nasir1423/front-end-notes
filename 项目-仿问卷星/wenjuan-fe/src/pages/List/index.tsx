import { FC, useState } from 'react';
import QuestionCard from '../../components/QuestionCard';
import styles from './index.module.scss';

export type Question = {
  id: string;
  title: string;
  isPublished: boolean;
  isStart: boolean;
  answerCount: number;
  createAt: string;
};

const rawQuestionList: Question[] = [
  {
    id: 'd65b254b-0b80-4c4d-b6a7-25d14c4b1f4f',
    title: 'What is your favorite color?',
    isPublished: true,
    isStart: false,
    answerCount: 23,
    createAt: '2023-11-20T07:15:00.000Z',
  },
  {
    id: 'e1602f36-0a71-4b6c-9336-bb649d437945',
    title: 'How often do you exercise?',
    isPublished: false,
    isStart: true,
    answerCount: 5,
    createAt: '2022-09-12T15:23:00.000Z',
  },
  {
    id: '5d0a761e-4e3b-45e2-a006-64875d70f10c',
    title: 'What is your preferred programming language?',
    isPublished: true,
    isStart: false,
    answerCount: 77,
    createAt: '2023-02-01T09:30:00.000Z',
  },
  {
    id: '5e3977ef-bd23-45b6-9e65-3f4deba1f50f',
    title: 'Do you prefer working from home or in the office?',
    isPublished: true,
    isStart: false,
    answerCount: 42,
    createAt: '2023-07-18T12:00:00.000Z',
  },
  {
    id: '273a7057-c1a6-41c0-9a86-86baf451e97b',
    title: 'What kind of movies do you like?',
    isPublished: false,
    isStart: false,
    answerCount: 18,
    createAt: '2021-11-23T14:50:00.000Z',
  },
  {
    id: 'f04d38b8-01a4-4348-8100-4282e79c6a78',
    title: 'How do you usually spend your weekends?',
    isPublished: true,
    isStart: false,
    answerCount: 34,
    createAt: '2023-03-10T08:40:00.000Z',
  },
  {
    id: 'ce9a6504-d75c-4f89-9270-54aa72e01e10',
    title: 'What is your favorite season?',
    isPublished: false,
    isStart: false,
    answerCount: 12,
    createAt: '2022-12-25T16:45:00.000Z',
  },
  {
    id: 'ecae1d7e-30ae-4524-8ad7-4b89e2efbd0d',
    title: 'Do you enjoy cooking?',
    isPublished: true,
    isStart: false,
    answerCount: 29,
    createAt: '2024-01-15T11:30:00.000Z',
  },
  {
    id: 'd6a4a72e-96ec-46b0-960c-b51585d92e1b',
    title: 'What is your favorite holiday destination?',
    isPublished: false,
    isStart: false,
    answerCount: 8,
    createAt: '2022-06-07T10:15:00.000Z',
  },
  {
    id: 'f4d45f71-645d-44a5-a2ec-1df21e4f5850',
    title: 'How often do you read books?',
    isPublished: true,
    isStart: false,
    answerCount: 56,
    createAt: '2023-08-22T13:00:00.000Z',
  },
  {
    id: '7f2c4857-95b2-4e5d-87b0-5e6743205d7f',
    title: 'What type of music do you listen to?',
    isPublished: false,
    isStart: false,
    answerCount: 20,
    createAt: '2021-10-30T17:05:00.000Z',
  },
];

const List: FC = () => {
  const [questionList] = useState<Question[]>(rawQuestionList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}> (搜素) </div>
      </div>
      <div className={styles.content}>
        {questionList.map(question => {
          const { id } = question;
          return <QuestionCard key={id} {...question} />;
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  );
};

export default List;
