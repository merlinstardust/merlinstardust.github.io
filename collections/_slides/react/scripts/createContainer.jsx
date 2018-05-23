import React from 'react';

const createContainer = (getData) => (WrappedComponent) => {
  class Container extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.setData = this.setData.bind(this);
    }

    componentDidMount() {
      getData(this.props, this.setData);
    }

    componentDidUpdate(prevProps) {
      if (this.props.currentRoom !== prevProps.currentRoom) {
        getData(this.props, this.setData);
      }
    }

    setData(data) {
      this.setState(data);
    }

    render() {
      return (
        <WrappedComponent {...this.state} {...this.props} />
      )
    }
  };

  Container.displayName = `Container(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return Container;
};

export default createContainer;
