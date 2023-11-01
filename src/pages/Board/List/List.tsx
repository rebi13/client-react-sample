import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { res, Board } from '../../../@types';
import axiosRequest from '../../../api/index';

export default function List() {
  const {
    isLoading,
    isError,
    error,
    data: boards
  } = useQuery({
    queryKey: ['boardList'],
    queryFn: () => axiosRequest.requestAxios<res<Board[]>>('get', '/boards')
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

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
