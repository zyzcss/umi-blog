import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import styles from './index.css'
import Header from '../pages/components/Header'
import Footer from '../pages/components/Footer'
import Setting from '../pages/components/Setting'
import { Row, Col } from 'antd'
import { loadProgressBar } from 'axios-progress-bar'
loadProgressBar()
function mapStateToProps(state) {
  return {
  };
}

export default withRouter(
  connect(mapStateToProps)(props => {
    return (
      <Row style={{minHeight:'100%'}}>
        <Col sm={{ span: 24 }} md={{ span: 22, offset: 1 }} lg={{ span: 20, offset: 2 }} className={styles.container}>
          <Header />
          <Setting />
          {props.children}
          <Footer />
        </Col>
      </Row>
    );
  }),
);
