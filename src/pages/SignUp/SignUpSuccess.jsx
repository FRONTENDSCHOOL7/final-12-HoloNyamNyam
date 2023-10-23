import React from 'react';
import { Container, Greeting, GoFeed } from './SignUpSuccessStyle';

export default function SignUpSuccess() {
  return (
    <Container>
      <Greeting>
        혼자 밥 먹기 좋아하는 당신!
        <br />
        혼바비언이 되신 것을 환영합니다 :)
      </Greeting>
      <GoFeed to='/home'>홀로냠냠 시작하러 가요!</GoFeed>
    </Container>
  );
}
