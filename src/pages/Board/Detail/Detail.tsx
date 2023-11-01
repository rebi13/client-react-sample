import { isError, useQuery } from '@tanstack/react-query';
import axiosRequest from '../../../api';
import { Board, res } from '../../../@types';
import { Link, useParams } from 'react-router-dom';

export default function Detail() {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    error,
    data: board
  } = useQuery({
    queryKey: ['getBoard'],
    queryFn: () => axiosRequest.requestAxios<res<Board>>('get', `/boards/${id}`)
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

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
