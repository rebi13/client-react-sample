import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Board, res } from '../../../@types';
import useCustomMutation from '../../../hooks/useCustomMutation';
import useCustomQuery from '../../../hooks/useCustomQuery';

export default function Post() {
  const { id } = useParams();

  // input form 참조
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const key = ['posts']; // Key 값 설정
  const [info, setInfo] = useState({
    method: id ? 'patch' : 'post',
    url: id ? `/boards/${id}` : '/boards',
    data: { title: '', content: '' }
  });

  // 기존 board 데이터가 남아있어서 등록 들어갔을 때 데이터가 그대로 보임
  const { data: board } = useCustomQuery<res<Board>>(['getBoardForUpdate'], {
    method: 'get',
    url: `/boards/${id}`,
    enabled: !!id
  });

  const mutation = useCustomMutation<res<Board>>(key, info);

  // id가 변경될 때마다 데이터를 가져와서 titleRef와 contentRef에 할당합니다.
  useEffect(() => {
    if (id && board) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        data: { title: board.data.title, content: board.data.content }
      }));
    } else {
      setInfo({
        method: 'post',
        url: '/boards',
        data: { title: '', content: '' }
      });
    }
  }, [id, board, setInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value || '';
    const content = contentRef.current?.value || '';
    if (title.length && content.length) {
      setInfo({
        ...info,
        data: { title, content }
      });
      mutation.mutate();
    } else {
      alert('제목과 내용을 입력하세요.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="제목"
            ref={titleRef}
            defaultValue={info.data.title}
          />
        </div>
        <div>
          <textarea
            placeholder="내용"
            ref={contentRef}
            defaultValue={info.data.content}
          />
        </div>
        <button type="submit" disabled={mutation.isLoading}>
          {id ? '수정' : '등록'}
          {mutation.isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </>
  );
}
