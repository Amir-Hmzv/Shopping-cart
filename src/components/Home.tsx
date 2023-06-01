import useDocumentTitle from '../helper/useDocumentTitle'
import Products from './Products'

const Home = () => {
  useDocumentTitle('Home')
  return (
    <>
    <Products/>
    
    </>
  )
}

export default Home