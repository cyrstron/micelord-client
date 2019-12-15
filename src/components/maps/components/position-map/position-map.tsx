import classNames from 'classnames/bind';
import {inject, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {GeolocationStore} from '@stores/geolocation';
import {PositionMarker} from '../position-marker';
import {
  DumbMap,
  withSmartMapCtx,
  MapService,
} from 'react-google-maps-ts';
import {
  GeoPoint, 
  Cell, 
  GridParams, 
} from '@micelord/grider';

import styles from './position-map.scss';
import { observable } from 'mobx';
const cx = classNames.bind(styles);

interface PositionMapProps {
  geolocationStore?: GeolocationStore;
  children?: ReactNode;
}

type Props = PositionMapProps & {
  mapService?: MapService,
}

@inject('geolocationStore')
@observer
export class PositionMapWrapped extends Component<Props> {
  geolocationStore: GeolocationStore;
  params = GridParams.fromConfig({
    type: 'hex',
    correction: 'merc',
    cellSize: 10000,
  });

  @observable bounds = {
    north: 40,
    south: 30,
    west: 30,
    east: 40
  }

  constructor(props: Props) {
    super(props);

    this.geolocationStore = props.geolocationStore!;
  }

  async componentDidMount() {
    this.geolocationStore.watchPosition();
  }

  componentWillUnmount() {
    this.geolocationStore.unwatchPosition();
  }

  onCenterClick = (): void => {
    const {mapService} = this.props;
    const {position} = this.geolocationStore;

    if (!position || !mapService) return;

    mapService.panTo(position);
  }

  onClick = (e: google.maps.MouseEvent) => {
    const point = new GeoPoint(
      e.latLng.lat(),
      e.latLng.lng(),
    )
  }

  render() {
    const {position} = this.geolocationStore;

    if (position === undefined) return null;

    return (
      <>
        <DumbMap
          className={cx('fullscreen-map')}
          defaultCenter={position}
          zoom={8}
          clickableIcons={false}
          disableDefaultUI={false}
          gestureHandling='greedy'
          mapTypeControl={false}
          streetViewControl={false}
          zoomControl={false}
          fullscreenControl={false}
          onClick={this.onClick}          
        >
          {this.props.children}
          <PositionMarker />
        </DumbMap>
      </>
    );
  }
}

export const PositionMap = withSmartMapCtx<PositionMapProps>(PositionMapWrapped);
