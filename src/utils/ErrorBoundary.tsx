import React, { ReactNode } from 'react';
import { cache } from 'swr';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  height: 100%;
  padding: 200px 36px;
`;

const ReloadButton = styled.button`
  height: 46px;
  line-height: 46px;
  background-color: rgb(72, 102, 228);
  color: rgb(245, 245, 245);
  font-size: 16px;
  appearance: none;
  border-radius: 8px;
  display: flex;
  text-align: center;
  justify-content: center;
  span {
    text-align: center;
  }
  margin: 0 auto;
  margin-top: 54px;
  padding: 0 16px;
`;
interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleClick = (): void => {
    cache.clear();
    this.setState({ hasError: false });
  };

  handleReload = () => {
    location.reload();
  };

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (!hasError) {
      return children;
    }

    return (
      <ErrorContainer onClick={this.handleClick}>
        <div className='info'>
          <p>이런! 오류가 발생했습니다.</p>
          <ReloadButton onClick={this.handleReload}>
            <span>새로고침 하기</span>
          </ReloadButton>
        </div>
      </ErrorContainer>
    );
  }
}

export { ErrorBoundary };
