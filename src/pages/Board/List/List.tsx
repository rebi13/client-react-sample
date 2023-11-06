import { Link } from 'react-router-dom';
import { res, Board } from '../../../@types';
import useCustomQuery from '../../../hooks/useCustomQuery';

export default function List() {
  const {
    data: boards,
    isLoading,
    isError,
    error
  } = useCustomQuery<res<Board[]>>(['boardList'], {
    method: 'get',
    url: '/boards'
  });

  // Todo: 전역으로 배치하기
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // Todo: 전역으로 배치하기
  if (isError) return <h2>{'An error has occurred: ' + error}</h2>;

  if (boards) {
    return (
      <>
        <h2>
          {boards.data.map((el) => (
            <div key={el._id}>
              title: <Link to={`/Detail/${el._id}`}>{el.title}</Link> | content:{' '}
              {el.content}
            </div>
          ))}
        </h2>
        <div>
          <Link to={'/post'}>글 작성</Link>
        </div>
      </>
    );
  }

  return <div>No data available</div>; // 데이터가 없는 경우 예외 처리
}
