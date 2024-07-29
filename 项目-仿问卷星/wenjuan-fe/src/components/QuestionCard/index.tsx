import { FC } from 'react';
import styles from './index.module.scss';
import { Question } from '../../pages/List';

const QuestionCard: FC<Question> = props => {
  const { title, isStart, isPublished, answerCount, createAt } = props;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <a href="#">{title}</a>
        </div>
        <div className={styles.right}>
          {isPublished ? (
            <span style={{ color: 'green' }}>已发布</span>
          ) : (
            <span style={{ color: 'gray' }}>未发布</span>
          )}
          &nbsp;
          <span>答卷: {answerCount}</span>
          &nbsp;
          <span>{createAt}</span>
        </div>
      </div>
      <hr />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <button>编辑问卷</button>&nbsp;
          <button>数据统计</button>
        </div>
        <div className={styles.right}>
          <button>{isStart ? '取消标星' : '标星'}</button> &nbsp;
          <button>复制</button> &nbsp;
          <button>删除</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
