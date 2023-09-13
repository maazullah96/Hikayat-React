import { Row, Col } from 'react-bootstrap'
import GoogleIcon from './assets/icon-google.svg'
import TwitterIcon from './assets/icon-twitter.svg'
import GithubIcon from './assets/icon-github.svg'
import { useAuthContext } from './context/AuthContext'
import {} from './firebase/config.js'
import {
  googleProvider,
  githubProvider,
  twitterProvider
} from './firebase/config'
import { useNavigate } from 'react-router-dom'
// import './SocialSignIn.css'

const SocialSignIn = () => {
  const { signInWithSocial } = useAuthContext()
  const navigate = useNavigate()

  const SignUp = async (provider) => {
    try {
      signInWithSocial(provider)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Row className='mt-3 justify-content-center'>
      <Col xs='auto'>
        <button
          className='social-button'
          onClick={() => SignUp(googleProvider)}
        >
          <img src={GoogleIcon} alt='' className='icon' />
          <span>Google</span>
        </button>

        <button
          className='social-button'
          onClick={() => SignUp(twitterProvider)}
        >
          <img src={TwitterIcon} alt='' className='icon' />
          <span>Twitter</span>
        </button>

        <button
          className='social-button'
          onClick={() => SignUp(githubProvider)}
        >
          <img src={GithubIcon} alt='' className='icon' />
          <span>GitHub</span>
        </button>
      </Col>
    </Row>
  )
}

export default SocialSignIn
