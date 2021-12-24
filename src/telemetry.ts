import * as vscode from 'vscode';
import TelemetryReporter from 'vscode-extension-telemetry';

// all events will be prefixed with this event name
const extensionId = 'test.one-extension';

// extension version will be reported as a property with each event
const extensionVersion = '0.0.1';

// the application insights key (also known as instrumentation key)
const key = '027206bd-2ac2-4cf5-89c3-f123a4b13e35';

export const telemetryClient = new TelemetryReporter(extensionId, extensionVersion, key);

export function sendEvent() {
    telemetryClient.sendTelemetryEvent(
        "test-event",
        {
            "process.env.TESTER": process.env.TESTER as string,
            "vscode.env.remoteName": vscode.env.remoteName as string,
        }
    );
}