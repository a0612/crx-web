import { useEffect, useState } from 'react'
import './index.scss'
import ImgIcon from '../../assets/img/vision.png'
import Logo from '../../assets/img/logo.png'
import TwitterIcon from '../../assets/img/x.png'
import Step2Img from '../../assets/img/step2.png'
import Step3Img from '../../assets/img/step3.png'

function Home() {
  // const [logged, setLogged] = useState(false)
  // const [pageData, setPageData] = useState({})
  useEffect(() => {
    
  }, [])

  return <div className="page-home">
    <div className="page-left">
      <div className="header">
        <img src={Logo} alt="" className="logo-img" />
        <div className="header-title">
          Earn in a growing social network.
        </div>
      </div>
      <div className="block-container">
        <div className="container-title">
          How to have a unique social avatar on Twitter?
        </div>
        <div className="container-box">
          <div className="step-font">
            <span>Step 1: </span>Please grant us permission for these websites
          </div>
          <div className="both-betw-box">
            <div className="both-betw-item">
              <div className="twitter-icon">
                <img src={TwitterIcon} alt="" />
              </div>
              <div className="twitter-text">Twitter</div>
            </div>
            <div className="both-betw-item">
              <div className="button-item">Cancel</div>
              <div className="button-item green">Agree</div>
            </div>
          </div>
        </div>

        <div className="container-box">
          <div className="step-font">
            <span>Step 2: </span>Please create a GROWN account and provide information for the social avatar.
          </div>
          <div className="step-img">
            <img src={Step2Img} alt="" />
          </div>
        </div>
        <div className="container-box">
          <div className="step-font">
            <span>Step 3: </span>Train through advanced settings and continuous data input to achieve a better social avatar.
          </div>
          <div className="step-img">
            <img src={Step3Img} alt="" />
          </div>
        </div>
      </div>
    </div>
    <div className="page-right">
      <img src={ImgIcon} alt="" />
    </div>
  </div>
}

export default Home