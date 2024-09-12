export const authSwagger = {
  sendMailRegister: {
    operation: {
      summary: 'No auth',
    },
    body: {
      type: Object,
      examples: {
        user: {
          value: {
            email: 'example@gmail.com',
          } as any,
        },
      },
    },
    response: {
      status: 200,
    },
  },
  verifyRegisterOtp: {
    operation: {
      summary: 'No auth',
    },
    body: {
      type: Object,
      examples: {
        user: {
          value: {
            email: 'example@gmail.com',
            otp: '596749',
          } as any,
        },
      },
    },
    response: {
      status: 200,
    },
  },
  register: {
    operation: {
      summary: 'No auth',
    },
    body: {
      type: Object,
      examples: {
        user: {
          value: {
            email: 'example@gmail.com',
            otp: '596749',
            name: 'Example',
            password: 'thisispassword123',
          } as any,
        },
      },
    },
    response: {
      status: 201,
    },
  },
  login: {
    operation: {
      summary: 'No auth',
    },
    body: {
      type: Object,
      examples: {
        user: {
          value: {
            email: 'example@gmail.com',
            password: 'thisispassword123',
          } as any,
        },
      },
    },
    response: {
      status: 200,
    },
  },
};
