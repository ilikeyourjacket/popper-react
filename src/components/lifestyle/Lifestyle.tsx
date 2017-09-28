import * as React from "react";
import * as ReactDOM from "react-dom";
import Popper from "popper.js";

export interface LifestyleProps {
  /** Label gets shown after the colon. */
  label: string;
  children?: any;
}

/**
 * Some general description about this Ништяк.
 * 
 * *markdown is supported here!* 
 */
export default class Lifestyle extends React.Component<LifestyleProps, any> {
    public static displayName = "Lifestyle"

  render() {
    console.log(Popper)
    // if (this.refs.hi) {
    //   new Popper(
    //     ReactDOM.findDOMNode(this.refs.hi),
    //     ReactDOM.render(<Tooltip />, null)
    //   );

    // }
    return null
  }
}

class Tooltip extends React.Component {
  render () {
    return (
      <div ref="reference">
        this is the tooltip
        </div>
    )
  }
}
