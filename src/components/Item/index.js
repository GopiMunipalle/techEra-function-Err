import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {Link, useParams} from 'react-router-dom'

import Header from '../Header'

import {
  HomeContainer,
  Heading,
  LoaderContainer,
  SuccessViewContainer,
  Ul,
  Nel,
  Logo,
  FailCon,
  FailIm,
  Fh,
  Fp,
  Fb,
  LI,
} from './stledComponents'

const apiStatus = {
  initial: 'initial',
  succes: 'success',
  failure: 'failure',
  inProgress: 'inProgress',
}

function Item() {
  const [data, setData] = useState([])
  const [status, setStatus] = useState(apiStatus.initial)
  const {id} = useParams()

  const fetchUserApi = async () => {
    setStatus(apiStatus.inProgress)
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok === true) {
      const userData = await response.json()
      const formattedData = userData.courses.map(dat => ({
        id: dat.course_details.id,
        name: dat.course_details.name,
        imageUrl: dat.course_details.image_url,
        description: dat.course_details.description,
      }))
      setStatus(apiStatus.succes)
      setData(formattedData)
    } else {
      setStatus(apiStatus.failure)
    }
  }

  const renderLoaderView = () => (
    <LoaderContainer data-testid="Loader">
      <Loader type="TailSpin" color="blue" height={50} width={50} />
    </LoaderContainer>
  )

  const succesView = () => (
    <SuccessViewContainer>
      <Heading>Courses</Heading>
      <Ul>
        {data.map(each => {
          const {imageUrl, name, description} = each
          return (
            <Link to="/">
              <LI key={each.id}>
                <img src={imageUrl} alt={name} />
                <h1>{description}</h1>
              </LI>
            </Link>
          )
        })}
      </Ul>
    </SuccessViewContainer>
  )

  useEffect(() => {
    fetchUserApi()
  })

  const failView = () => (
    <div>
      <Link to="/" className="link-el">
        <Nel>
          <Logo
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </Nel>
      </Link>
      <FailCon>
        <FailIm
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <Fh>Oops! Something Went wRONG</Fh>
        <Fp>We cannot seem to find the page you are looking for</Fp>
        <Fb type="button" onClick={fetchUserApi}>
          Retry
        </Fb>
      </FailCon>
    </div>
  )

  const render = () => {
    switch (status) {
      case apiStatus.succes:
        return succesView()
      case apiStatus.inProgress:
        return renderLoaderView()
      case apiStatus.failure:
        return failView()
      default:
        return null
    }
  }

  return (
    <HomeContainer>
      <Header />
      {render()}
    </HomeContainer>
  )
}
export default Item
