import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { res, Board } from '../../../@types';
import axiosRequest from '../../../api/index';

export default function List() {
  const {
    isLoading,
    error,
    data: board
  } = useQuery({
    queryKey: ['boardList'],
    queryFn: () => axiosRequest.requestAxios<res<Board[]>>('get', '/boards')
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) return 'An error has occurred: ' + error;

  if (board) {
    return (
      <h2>
        {board.data.map((el) => (
          <div>
            title: <Link to={`/Detail/${el._id}`}>{el.title}</Link> | content:{' '}
            {el.content}
          </div>
        ))}
      </h2>
    );
  }
  return <div>No data available</div>; // 데이터가 없는 경우 예외 처리
}
