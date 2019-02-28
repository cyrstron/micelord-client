import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {createPortal} from 'react-dom';
import {CustomOverlayProps} from './custom-overlay.d';
import {WrappedProps} from './hocs/with-full-overlay-ctx';
import {CustomOverlayStore} from './stores';

type Props = CustomOverlayProps & WrappedProps<CustomOverlayStore>;

@observer
export class CustomOverlay extends Component<Props, {}> {
  container?: HTMLDivElement;

  componentDidMount() {
    const {
      overlayStore,
      children,
      ...options
    } = this.props;

    if (!overlayStore) return;

    overlayStore.setCustomOverlay(options);

    const container = overlayStore.getContainer();

    if (!container) return;

    this.container = container;
    this.container.style.backgroundColor = '#fff';
  }

  render() {
    const {container} = this;
    const {children, overlayStore} = this.props;

    if (!overlayStore.isLoaded || !container) return null;

    return createPortal(children || null, container);
  }
}
