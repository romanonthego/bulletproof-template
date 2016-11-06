import {connect} from 'react-redux'
import LoadingBar from './LoadingBar'

const mapStateToProps = ({loadingBar}) => ({loading: loadingBar})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingBar)
