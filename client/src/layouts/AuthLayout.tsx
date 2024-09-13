import { ReactNode } from "react";
import styled from "styled-components";
import image from '@/assets/image/bg-auth.jpg'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayoutContainer>
      <div className="dialog-block">{children}</div>
    </AuthLayoutContainer>
  );
}

const AuthLayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${image.src}) no-repeat center center fixed;
  background-size: cover;
  .dialog-block {
    width: 400px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    justify-content: center;
  }
`;
