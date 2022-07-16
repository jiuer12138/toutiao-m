export const mobileRule = [
  { required: true, message: '请输入手机号' },
  {
    pattern:
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    message: '请输入正确的手机号'
  }
]

export const codeRule = [
  { required: true, message: '请输入验证码' },
  { pattern: /^[0-9]{6}$/, message: '请输入6位验证码' }
]
