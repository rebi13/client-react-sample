import { res, Board } from '../../../@types';
import { Link, useParams } from 'react-router-dom';
import useCustomQuery from '../../../hooks/useCustomQuery';

export default function Detail() {
  const { id } = useParams();

  const {
    data: board,
    isLoading,
    isError,
    error
  } = useCustomQuery<res<Board>>(['getBoard'], {
    method: 'get',
    url: `/boards/${id}`,
    enabled: true
  });

  // Todo: 전역으로 배치하기
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // Todo: 전역으로 배치하기
  if (isError) return <h2>{'An error has occurred: ' + error}</h2>;

  if (board) {
    const { title, content, createdAt } = board.data;
    return (
      <>
        <h2>{title}</h2>
        <div>{content}</div>
        <div>{createdAt?.toString()}</div>
        <div>
          <Link to={`/post/${id}`}>수정</Link>
        </div>
      </>
    );
  }
  return <div>No data available</div>; // 데이터가 없는 경우 예외 처리
}
