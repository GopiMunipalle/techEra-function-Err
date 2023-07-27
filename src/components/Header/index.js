import {Link, withRouter} from 'react-router-dom'
import {HeaderContainer, Image} from './styledComponents'

function Header() {
  return (
    <Link to="/">
      <HeaderContainer>
        <Image
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
        />
      </HeaderContainer>
    </Link>
  )
}
export default withRouter(Header)
