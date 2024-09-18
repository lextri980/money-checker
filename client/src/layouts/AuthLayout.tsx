import { ReactNode } from "react";
import styled from "styled-components";
import Image from 'next/image'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayoutContainer className="auth-layout-container">
      <Image className="bg-img" src="/images/bg-auth.jpg" alt="background" fill />
      <div className="dialog-block">{children}</div>
    </AuthLayoutContainer>
  );
}

const AuthLayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .dialog-block {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    justify-content: center;
  }
`;
