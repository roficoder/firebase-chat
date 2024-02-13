import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Path } from '../helpers/enum';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  isSuggestion: boolean = false;

  constructor(private router: Router, private location: Location) {
    this.isSuggestion = false;
  }

  goBack() {
    this.location.back();
  }

  goToArchivePage() {
    this.route(Path.archive, false);
  }

  goToRecruitmentPage() {
    this.route(Path.recruitment, false);
  }

  goToNewCard() {
    this.route(Path.newCard, false);
  }

  goToHome() {
    this.route(Path.home, false);
  }

  goToSadaatiDetail(data: any) {
    this.route(Path.sadaaticarddetail, false, data);
  }

  goToLogin() {
    this.route(Path.login, false);
  }


  /*============== Sadaati Card =============*/
  goToSadaatiCardLogin() {
    this.route(Path.sadatiCardLogin, false);
  }
  goToSadaatiCardMemberShipcode() {
    this.route(Path.sadatiCardMemberShipcode, false);
  }





  goToForgotPaswordSendEmail() {
    this.route(Path.forgotPasswordSendEmail, false);
  }
  goToForgotPaswordReceiveFromEmail() {
    this.route(Path.forgotPasswordReceiveFromEmail, false);
  }

  goToPartnerLogin() {
    this.route(Path.partnerLogin, false);
  }
  goToSadatiPartnerProfile() {
    this.route(Path.sadatiPartnerProfile, false);
  }

  goToSignUpAsSadatiPartner(isEdit?: boolean) {
    if (isEdit)
      this.route(Path.SignUpAsSadatiPartner, false, {
        edit: true,
      });
    else
      this.route(Path.SignUpAsSadatiPartner, false);
  }

  goToSignUp() {
    this.route(Path.signUp, false);
  }

  goToJobArchive() {
    this.route(Path.jobArchive, false);
  }

  goToAboutUs(data?: any) {
    this.route(Path.aboutUs, false, data);
  }

  goToHomeDetail(data: any) {
    this.route(Path.homeDetail, false, data);
  }

  goToNewsDetail(data: any) {
    this.route(Path.newsDetail, false, data);
  }

  goToEventDetail(data: any) {
    this.route(Path.eventDetail, false, data);
  }

  goToLawsAndRegulation(data?: any) {
    this.route(Path.lawsandregulation, false, data);
  }

  goToService() {
    this.route(Path.services, false);
  }

  goToCareerPlatform() {
    this.route(Path.careerplatform, false);
  }

  goToCourseRegistration() {
    this.route(Path.courseRegistration, false);
  }
  goToPersonalInfoRegistration(isEdit?: boolean) {
    if (isEdit)
      this.route(Path.personalInfoRegistration, false, {
        operation: 'personalInfo',
        edit: true,
      });
    else
      this.route(Path.personalInfoRegistration, false, {
        operation: 'personalInfo',
      });
  }

  goTositeMap() {
    this.route(Path.siteMap, false);
  }

  goToFaqs() {
    this.route(Path.faq, false);
  }

  goToSadaatiCards() {
    this.route(Path.sadatiCards, false);
  }

  goToPartnerListing() {
    this.route(Path.partnerListing, false);
  }

  goToRegisterAsServiceSeeker() {
    this.route(Path.registerAsServiceSeeker, false);
  }

  goTotrainingPartner() {
    this.route(Path.trainingPartner, false);
  }

  goToMediaCentre() {
    this.route(Path.mediaCentre, false);
  }

  goToContactUs() {
    this.route(Path.contactUs, false);
  }

  goToProgramAndCourses() {
    this.route(Path.programAndCourses, false);
  }

  goToCourseTrainingPlatform() {
    this.route(Path.courseTrainingPlatform, false);
  }

  goToTraining() {
    this.route(Path.registerAsTrainer, false);
  }
  goToBeOurPartner() {
    this.route(Path.beOurPartner, false);
  }

  goToServiceDetail() {
    this.route(Path.serviceDetail, false);
  }

  goToProgramArchive() {
    this.route(Path.programArchive, false);
  }

  goToProgramDetail(data: any) {
    this.route(Path.programDetail, false, data);
  }

  goToHallBooking() {
    this.route(Path.hallBooking, false);
  }

  goToSuggestCourse() {
    this.route(Path.suggestCourse, false);
  }

  goToJobDetail(data: any) {
    this.route(Path.jobDetail, false, data);
  }

  gotoSuggestionToContact() {
    this.isSuggestion = true;
  }

  goTojobList() {
    this.route(Path.jobList, false);
  }

  goToPersonalProfile() {
    this.route(Path.personalProfile, false);
  }

  dynamicPath(path: string, params: string = '') {
    if (params) {
      this.route(path, false, { id: params });
    } else {
      this.route(path);
    }
  }

  route(path: string, replaceUrl: boolean = false, data?: any) {
    if (!data) {
      this.router.navigate([path], { replaceUrl });
    } else {
      this.router.navigate([path], {
        replaceUrl,
        queryParams: data,
      });
    }
  }
}
