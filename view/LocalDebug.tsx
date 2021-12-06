import * as React from "react";
import { ActionButton, Icon, PrimaryButton, Image } from "@fluentui/react";
import "./LocalDebug.scss";

export default class LocalDebug extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    window.addEventListener("message", this.receiveMessage, false);
  }

  render() {
    return (
      <div className="local-debug-page">
        <div className="flex-section">
          <div className="side-margin" />
          <div className="table-of-contents">
            <div className="section">
              <div className="logo">
                <Icon iconName="CheckList" className="logo" />
              </div>
              <div className="title">
                <h2>Local Debug Prerequisites</h2>
              </div>
            </div>

            <div className="action-card" tabIndex={0} role="listitem" id="node-js">
              <div className="flex-section card-line">
                <Icon iconName="Accept" className="action-icon" />
                <div className="action-title">Node.js</div>
              </div>
              <div className="card-line action-content">Node.js is required to run Teams Toolkit.</div>
              <div className="left-right-align">
                <div className="right">
                  <ActionButton
                    text="Check Again"
                  />
                </div>
              </div>
            </div>

            <div className="action-card" tabIndex={0} role="listitem" id="dotnet">
              <div className="flex-section card-line">
                <Icon iconName="Cancel" className="action-icon" />
                <div className="action-title">.NET</div>
              </div>
              <div className="card-line action-content">.NET is required to run Backend API locally.</div>
              <div className="left-right-align">
                <div className="left">
                    <PrimaryButton
                      text="Install .NET"
                    />
                </div>
                <div className="right">
                  <ActionButton
                    text="Check Again"
                  />
                </div>
              </div>
            </div>

            <div className="section" />

            <div className="section">
              <div className="logo">
                <Icon iconName="List" className="logo" />
              </div>
              <div className="title">
                <h2>Local Services</h2>
              </div>
            </div>

            <div className="action-card" tabIndex={0} role="listitem" id="node-js">
              <div className="flex-section card-line">
                <Icon iconName="Error" className="action-icon" />
                <div className="action-title">No local service is running.</div>
              </div>
              <div className="left-right-align">
                <div className="right">
                  <ActionButton
                    text="Refresh"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="content-margin" />
          <div className="side-margin" />
        </div>
      </div>
    );
  }

  receiveMessage = (event: any) => {
    const message = event.data.message;

    switch (message) {
      default:
        break;
    }
  };
}
