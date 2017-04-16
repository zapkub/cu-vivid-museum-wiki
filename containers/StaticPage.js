import React from 'react';

export default class StaticPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
    };
    this.reloadChanglog = this.reloadChanglog.bind(this);
  }
  componentDidMount() {
    this.reloadChanglog();
  }
  async reloadChanglog() {
    try {
      const response = await window.fetch(this.props.source);
      const html = await response.text();
      this.setState({ html });
    } catch (e) {
      this.setState({ html: 'Not found' });
    }
  }
  render() {
    return (<div className="static-wrap" style={{ padding: 10 }} >
      <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
      <style jsx>{`
        .static-wrap {
            border-top: 5px solid #548031;
        }
    `}</style>
    </div>);
  }
}
