import React, { useEffect } from 'react';
import { Container, Greeting, GoFeed } from './SignUpSuccessStyle';
import { useNavigate } from 'react-router-dom';

export default function SignUpSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem('_id') ||
      sessionStorage.getItem('accountname') ||
      sessionStorage.getItem('token')
    ) {
      navigate('/home');
    }
  }, [navigate]);
  return (
    <Container>
      <Greeting>
        혼자 밥 먹기 좋아하는 당신!
        <br />
        혼바비언이 되신 것을 환영합니다 :&#41;
      </Greeting>
      <GoFeed to='/welcome'>홀로냠냠 시작하러 가요!</GoFeed>
    </Container>
  );
}
