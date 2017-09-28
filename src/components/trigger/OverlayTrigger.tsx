import * as React from "react";
import Popper from "popper.js";

export interface OverlayTriggerProps {
  /** The node to be rendered as the popper */
  popperComponent: React.ReactElement<any>;
  /** The target element(s) */
  children: any;
  offset: string;
}

export default class OverlayTrigger extends React.Component<OverlayTriggerProps, any> {  
  targetRef: any;
  popperRef: any;
  popper: any;

  state: any = {
    isVisible: false,
    position: null,
    transform: null,
    offsets: {
      popper: {
        left: -9999,
        top: -9999
      }
    }
  }

  componentDidMount() {
    this.applyPopper(this.props);
  }
  
  onMouseOver = () => { this.setState({ isVisible: !this.state.isVisible })}
  onMouseOut = () => { this.setState({ isVisible: !this.state.isVisible })}
  
  applyReactStyle = (data: any) => {
    return data
  }

  componentWillReceiveProps(nextProps: any) {
    if (!this.popper) {
      this.applyPopper(nextProps)
    }
    this.popper.update()
  }

  extractStyles = (popperData: any) => {
    if (popperData) {
      const left = Math.round(popperData.offsets.popper.left);
      const top = Math.round(popperData.offsets.popper.top);

      this.setState({
        cssPosition: popperData.offsets.popper.position,
        transform: `translate3d(${left}px, ${top}px, 0px)`
      })
    }
  }

  applyPopper = (props: any) => {
    if (this.popper) {
      this.popper.destroy()
    }

    if (!props.popperComponent) {
      return
    }

    const popperOptions: Popper.PopperOptions = {
      placement: "right",
      onCreate: this.extractStyles,
      onUpdate: this.extractStyles,
      modifiers: {
        applyStyle: {
          enabled: false
        },
        hide: {
          enabled: false
        },
        applyReactStyle: {
          enabled: true,
          order: 800,
          fn: this.applyReactStyle
        },
        offset: {
          enabled: true,
          offset: this.props.offset || "0,0"
        }
      }
    };

    const actualTarget = this.targetRef.firstChild;
    this.popper = new Popper(actualTarget, this.popperRef, popperOptions);

    // Compute new offsets and apply new style, prefer over `.update` for performance
    this.popper.scheduleUpdate()
  };

  renderPopper = () => {
    if (this.state.isVisible) {
      return this.props.popperComponent
    } else {
      return null
    }
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  render() {
    const { transform, cssPosition } = this.state

    return (
      <div>
        <div
          ref={ref => (this.targetRef = ref)}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
            {this.props.children}
        </div>
        <div
          ref={ref => (this.popperRef = ref)}
          style={{
            top: 0,
            left: 0,
            transform: transform,
            position: cssPosition
          }}
        >
        {this.renderPopper()}
        </div>
      </div>
    );
  }
}
