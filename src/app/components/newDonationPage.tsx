import * as Immutable from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { IDispatch } from '~react-redux~redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';

import * as auth from '../auth';
import * as database from '../database';
import * as image from '../image';
import INewDonationPage from '../types/INewDonationPage';
import * as storage from '../storage';

function mapStateToProps({currentUser}: any) {
  return { currentUserId: currentUser.userId };
}

function mapDispatchToProps(dispatch: IDispatch) {
  return { actions: bindActionCreators({}, dispatch) };
}

interface INewDonationPageProps {
  readonly currentUserId: string;
}

interface INewDonationPageState {
  readonly location: string;
  readonly notes: string;
  readonly phone: string;
  readonly photo: File;
  readonly uploading: boolean;
}

export default (DonationPageComponent: any) => {
  @connect(mapStateToProps, mapDispatchToProps)
  class NewDonationPage extends React.Component<INewDonationPageProps, INewDonationPageState> {
    private WrappedElement: INewDonationPage;

    constructor(props: any, context: any) {
      super(props, context);
      this.state = { location: 'riyadh', notes: '', phone: storage.getItem('phone'), photo: null, uploading: false };
    }

    render() {
      const {currentUserId} = this.props;

      return <DonationPageComponent {...this.state} currentUserId={currentUserId} handleChange={this.handleChange.bind(this)}
        handlePhotoChange={this.handlePhotoChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}
        ref={(E) => (this.WrappedElement = E)} validateRequired={this.validateRequired} />;
    }

    private handlePhotoChange(event: any) {
      const fileInput: HTMLInputElement = event.target;
      const file: File = fileInput.files[0];
      this.setState({ photo: file } as INewDonationPageState);
    }

    private handleSubmit(event: any) {
      const {currentUserId} = this.props;
      const {phone, photo} = this.state;

      const WrappedElement = this.WrappedElement;
      const donationType = WrappedElement.donationType;
      const wrappedDonation = WrappedElement.getDonation();

      event.preventDefault();
      storage.setItem('phone', phone);

      auth.ensureLoggedIn(currentUserId).then((donorId: string) => {
        this.setState({ uploading: true } as INewDonationPageState);

        image.upload(photo).then(({url}) => {
          const donation = Immutable.Map(wrappedDonation).merge({ donorId, photoUrl: url }).toJS();
          this.setState({ uploading: false } as INewDonationPageState);

          return database.createDonation(donationType, donation).then((newDonationKey) => {
            const donationUrl = (donationType === 'food') ? `/donations/food/${newDonationKey}` : `/donations/nonfood/${newDonationKey}`;
            hashHistory.push(donationUrl);
          });
        });
      });
    }

    private handleChange(fieldName: string) {
      return (event) => {
        this.setState({ [fieldName]: event.target.value } as INewDonationPageState);
      };
    }

    private validateRequired(value: string) {
      return value ? null : 'error';
    }
  }

  return NewDonationPage;
};
