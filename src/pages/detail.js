// @flow
import Router from 'next/router';
import PlantDetail from './../containers/PlantDetail';
import connectLayout from '../components/HOC/Layout';

class DetailPage extends React.Component {
    static async getInitialProps({ req, res, query }) {
        if (!query.id) {
            res.redirect('/');
        }
        const isServer = !!req;
        return req
            ? { userAgent: req.headers['user-agent'], isServer }
            : { userAgent: navigator.userAgent, isServer };
    }
    constructor(props) {
        super(props);
        this.state = {
            id: props.url.query.id,
        };
        Router.onRouteChangeComplete = (url: string) => {
    			this.setState({
    				id: Router.query.id,
    			});
    		};
    }
    componentDidMount() {
      if(window){
        window.scrollTo(0, 0);
      };
    }
    render() {
        return (
            <div>
                <PlantDetail plant_id={this.state.id} />
            </div>);
    }
}

export default connectLayout(DetailPage);
