import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { GeoPointStore } from '@scenes/games/stores/point-store';

import styles from './geo-point-control.scss';
import { Input } from '@components/inputs';
import { Button } from '@components/buttons';
import { observer } from 'mobx-react';

const cx = classnames.bind(styles);

export interface GeoPointControlProps {
  inputStore: GeoPointStore;
  className?: string;
  onEdit: (pointIndex: number) => void;
  onApply: () => void;
  onChange?: () => void;
  isEditing: boolean;
  index: number;
}

@observer
class GeoPointControl extends Component<GeoPointControlProps> {
  onEdit = () => {
    const {onEdit, index} = this.props;

    onEdit(index);
  }

  onApply = () => {
    const {onApply, index} = this.props;

    onApply();
  }

  render() {
    const {
      inputStore: {lat, lng},
      index,
      className,
      onChange,
      isEditing,
    } = this.props;

    return (
      <div className={cx('geo-point-control', className)}>
        {isEditing && (
          <>
            <Input 
              className={cx('lat-control')}
              name='latitude'
              type='number'
              inputStore={lat}
              title='Latitude:'
              id={`latitude-${index}`}
              onChange={onChange}
            />
            <Input 
              className={cx('lng-control')}
              name='longitude'
              type='number'
              inputStore={lng}
              title='Longitude:'
              id={`longitude-${index}`}
              onChange={onChange}
            />
            <Button onClick={this.onApply}>
              apply
            </Button>
          </>
        )}
        {!isEditing && (
          <>
            {`lat: ${lat.value}, lng: ${lng.value}`}
            <Button onClick={this.onEdit}>
              Edit
            </Button>
          </>
        )}
      </div>
    )
  }
}

export {GeoPointControl};