import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import '../style/index.css';

import { MainAreaWidget } from '@jupyterlab/apputils';

import { ILauncher } from '@jupyterlab/launcher';

import { reactIcon } from '@jupyterlab/ui-components';

import { AppWidget } from './app';

namespace CommandIDs {
  export const create = 'create-react-widget';
}

const extension: JupyterFrontEndPlugin<void> = {
  id: 'labweather',
  autoStart: true,
  optional: [ILauncher],
  activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    const { commands } = app;

    const command = CommandIDs.create;
    commands.addCommand(command, {
      caption: 'labweather',
      label: 'labweather',
      icon: args => (args['isPalette'] ? null : reactIcon),
      execute: () => {
        const content = new AppWidget();
        const widget = new MainAreaWidget<AppWidget>({ content });
        widget.title.label = 'labWeather';
        app.shell.add(widget, 'main');
        /** app.shell.add(widget, 'left'); **/
      }
    });

    if (launcher) {
      launcher.add({
        command
      });
    }
  }
};

export default extension;