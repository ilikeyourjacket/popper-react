import * as React from "react";

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
    return <div>Hello, this is the label: {this.props.label}</div>;
  }
}
