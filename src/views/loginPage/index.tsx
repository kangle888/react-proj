import { useNavigate } from 'react-router-dom'
import {
  ReloadOutlined,
  LockOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { accountLoginRequest } from '@/service/login/login'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import styles from './loginPage.module.less'

export const LoginPage = () => {
  const navigate = useNavigate()

  const [captcha, setCaptcha] = useState('')
  const generateCaptcha = useMemo(() => {
    const randomText = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      let out = ''
      for (let i = 0; i < 4; i++)
        out += chars[Math.floor(Math.random() * chars.length)]
      return out
    }
    const text = randomText()
    setCaptcha(text)
    return () => setCaptcha(randomText())
  }, [])

  const onFinish = async (values: {
    loginName: string
    password: string
    captcha: string
    remember: boolean
  }) => {
    if (values.captcha?.toUpperCase() !== captcha) {
      return
    }
    const res = await accountLoginRequest({
      loginName: values.loginName,
      password: values.password,
    })
    if ((res as any).code === 200) {
      localCache.setCache(LOGIN_TOKEN, (res as any).data)
      navigate('/home')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardWrap}>
        <div className={styles.lockIcon}>
          <LockOutlined />
        </div>
        <div className={styles.title}>安全验证码登录</div>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: false }}
        >
          <Form.Item
            className={styles.formItem}
            label="用户名"
            name="loginName"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              size="large"
              placeholder="请输入用户名"
              prefix={<UserOutlined />}
              allowClear
            />
          </Form.Item>

          <Form.Item
            className={styles.formItem}
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              size="large"
              placeholder="请输入密码"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item className={styles.formItem} label="验证码" required>
            <div className={styles.captchaRow}>
              <div className={styles.captchaBox}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[{ required: true, message: '请输入验证码' }]}
                >
                  <Input
                    size="large"
                    placeholder="请输入验证码"
                    prefix={<SafetyCertificateOutlined />}
                  />
                </Form.Item>
              </div>
              <div className={styles.captchaDisplay}>{captcha}</div>
              <button
                type="button"
                className={styles.captchaRefresh}
                onClick={generateCaptcha}
                aria-label="刷新验证码"
              >
                <ReloadOutlined />
              </button>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              className={styles.loginBtn}
              type="primary"
              htmlType="submit"
              size="large"
            >
              登录
            </Button>
          </Form.Item>

          <div className={styles.optionsRow}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Typography.Link>忘记密码?</Typography.Link>
          </div>

          <div className={styles.footer}>
            © 2023 安全验证系统 | 保护您的隐私安全
          </div>
        </Form>
      </div>
    </div>
  )
}
