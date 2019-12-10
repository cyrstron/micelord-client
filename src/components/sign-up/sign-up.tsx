import React, {Component} from "react";
import { Link } from "react-router-dom";
import classnames from 'classnames/bind';
import { observer } from "mobx-react";
import { observable } from "mobx";

import {ExternalAuth} from '../elements/external-auth';
import { SignUpForm } from "./components/sign-up-form";

import styles from './sign-up.scss';

const cx = classnames.bind(styles);

export interface SignUpProps {
}

@observer
class SignUp extends Component<SignUpProps> {
  @observable isFormShown: boolean = true;

  hideForm = () => {
    this.isFormShown = false;
  }

  render() {

    return (
      <div className={cx('sign-up')}>
        <h2>Sign up</h2>
        <p>
          Already have an account? <Link to='/sign-in'>Sign in</Link>
        </p>
        <ExternalAuth 
          className={cx('external-auth')} 
          onAuthToken={this.hideForm}
        />
        {this.isFormShown && (
          <SignUpForm />
        )}
      </div>
    );
  }
}

export {SignUp};
