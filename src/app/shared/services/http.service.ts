import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InsertHallBooking } from '../helpers/models/insert-hall-booking.dto';
import { InsertPartner } from '../helpers/models/insert-partner.dto';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // baseUrl = environment.apiBaseUrl;
  private baseUrl: string = '/api/v1';
  // private baseUrl: string = 'http://192.168.100.7:1111/api/v1';
  constructor(public http: HttpClient) { }

  getJobs() {
    return this.http.get(`${this.baseUrl}/jobs`);
  }

  getCourses() {
    return this.http.get(`${this.baseUrl}/courses/list`);
  }

  getArchiveJob() {
    return this.http.get(`${this.baseUrl}/jobs/archive`);
  }

  getCoursesDetailById(id: string) {
    return this.http.get(`${this.baseUrl}/courses/${id}`);
  }

  getPartners() {
    return this.http.get(`${this.baseUrl}/partners`);
  }
  getAllPartners() {
    return this.http.get(`${this.baseUrl}/partners/getAll`);
  }

  getAllSadaatiCards() {
    return this.http.get(`${this.baseUrl}/sadaatiPartners/all`);
  }

  getSadaatiCardsbySearch(query: any) {
    return this.http.get(`${this.baseUrl}/sadaatiPartners/all${query}`);
  }

  getArchiveCourses() {
    return this.http.get(`${this.baseUrl}/courses/archive`);
  }

  getVideos(data: any) {
    return this.http.get(`${this.baseUrl}/videos?categoryId=${data}`);
  }

  getImages(data: any) {
    return this.http.get(`${this.baseUrl}/images?categoryId=${data}`);
  }

  getEvents() {
    return this.http.get(`${this.baseUrl}/events`);
  }

  getNews() {
    return this.http.get(`${this.baseUrl}/articles`);
  }

  getImagesCategories() {
    return this.http.get(`${this.baseUrl}/images/categories`);
  }

  getJobDetailById(id: string) {
    return this.http.get(`${this.baseUrl}/jobs/byId?id=${id}`);
  }

  getHumanResourceLaws() {
    return this.http.get(`${this.baseUrl}/humanResourceLaws/all`);
  }

  getCirculars() {
    return this.http.get(`${this.baseUrl}/circulars/all`);
  }

  getHumanResourceLawsKeyword(keyword: any) {
    return this.http.get(`${this.baseUrl}/humanResourceLaws/search/${keyword}`);
  }

  getCircularsKeywords(keyword: any) {
    return this.http.get(`${this.baseUrl}/circulars/search/${keyword}`);
  }

  getCourseKeyword(keyword: any) {
    return this.http.get(
      `${this.baseUrl}/courses/search/${keyword}?searchType=normal`
    );
  }
  getSearchKeyword(keyword: any) {
    return this.http.get(
      `${this.baseUrl}/jobs/search/${keyword}?searchType=normal`
    );
  }

  changePassword(data: any) {
    return this.http.put(`${this.baseUrl}/auth/changePassword`, data);
  }

  getLawsAndRegulations() {
    return this.http.get(`${this.baseUrl}/lawsAndRegulations/all`);
  }

  getServices() {
    return this.http.get(`${this.baseUrl}/singleServices/all`);
  }

  getAwards() {
    return this.http.get(`${this.baseUrl}/awards`);
  }

  getAboutUs() {
    return this.http.get(`${this.baseUrl}/aboutUs/all`);
  }

  getConfigs() {
    return this.http.get(`${this.baseUrl}/configs/all`);
  }

  getConfigsByType(type: any) {
    return this.http.get(`${this.baseUrl}/configs/type/${type}`);
  }

  getHomeEvent() {
    return this.http.get(`${this.baseUrl}/events/home`);
  }

  getVisitorCount() {
    return this.http.get(`${this.baseUrl}/visitors/count`);
  }

  getVisitorByDate(date: any) {
    return this.http.post(`${this.baseUrl}/visitors/getVisitorByDate/${date}`, {
      date,
    });
  }

  createVisitorCount(id: any) {
    return this.http.put(`${this.baseUrl}/visitors/${id}`, '');
  }

  createContactForm(data: any) {
    return this.http.post(`${this.baseUrl}/contactMessages`, data);
  }

  technicalSupport(data: any) {
    return this.http.post(`${this.baseUrl}/technicalSupport`, data);
  }

  createJobSeekerForm(data: any) {
    return this.http.post(`${this.baseUrl}/jobSeekers`, data);
  }

  updateJobSeekerForm(data: any) {
    return this.http.put(`${this.baseUrl}/jobSeekers`, data);
  }

  createSuggestCourseForm(data: any) {
    return this.http.post(`${this.baseUrl}/courses/suggest`, data);
  }

  createEmailSubscriptionsForm(data: any) {
    return this.http.post(`${this.baseUrl}/emailSubscriptions`, data);
  }

  createSadaatiCardsForm(data: any) {
    return this.http.post(`${this.baseUrl}/sadaatiCards`, data);
  }

  createTraineesForm(data: any) {
    return this.http.post(`${this.baseUrl}/trainees`, data);
  }

  updateTraineesForm(data: any) {
    return this.http.put(`${this.baseUrl}/trainees`, data);
  }

  createCourseRegistrationForm(data: any) {
    return this.http.post(
      `${this.baseUrl}/courseRegistration/postCurrentUser`,
      data
    );
  }

  createFeedBackTypeForm(data: any) {
    return this.http.post(`${this.baseUrl}/feedbacks`, data);
  }

  updateCourseRegistrationForm(data: any) {
    return this.http.put(`${this.baseUrl}/courseRegistration/updateCurrentUser`, data);
  }

  getCourseRegistration() {
    return this.http.get(`${this.baseUrl}/courseRegistration/getCurrentUser`);
  }



  getContactUs() {
    return this.http.get(`${this.baseUrl}/contactUs`);
  }

  createHallBooking(data: InsertHallBooking) {
    return this.http.post(`${this.baseUrl}/hall-bookings`, data);
  }

  signUpTrainingPartner(data: any) {
    return this.http.post(`${this.baseUrl}/trainingPartner/signUp`, data);
  }

  createPartnerForm(data: InsertPartner) {
    // return lastValueFrom(this.http.post(`${this.baseUrl}/partners`, data));
    return this.http.post(`${this.baseUrl}/partners`, data);
  }
  updatePartnerForm(data: InsertPartner) {
    // return lastValueFrom(this.http.post(`${this.baseUrl}/partners`, data));
    return this.http.put(`${this.baseUrl}/partners/`, data);
  }

  getAllEmirates(data: any) {
    return lastValueFrom(this.http.get(`${this.baseUrl}/emirates`));
  }

  getAllLicenseTypes() {
    // return lastValueFrom(this.http.get(`${this.baseUrl}/license-types`));
    return this.http.get(`${this.baseUrl}/license-types`);
  }

  getAllCountries(data: any) {
    return lastValueFrom(this.http.get(`${this.baseUrl}/countries`));
  }

  getCountries() {
    return this.http.get(`${this.baseUrl}/countries`);
  }
  getCitiesByCountryCode(counCode: string) {
    return this.http.get(`${this.baseUrl}/cities/getByCountryCode/${counCode}`);
  }

  getFeedbackTypes() {
    return this.http.get(`${this.baseUrl}/feedbackTypes`);
  }

  getEmirates() {
    return this.http.get(`${this.baseUrl}/emirates`);
  }

  getVisa() {
    return this.http.get(`${this.baseUrl}/visaStatus`);
  }

  getMaritalStatus() {
    return this.http.get(`${this.baseUrl}/maritalStatus`);
  }

  getLeavingForReason() {
    return this.http.get(`${this.baseUrl}/leavingWorkReasons`);
  }

  getEmployedStatus() {
    return this.http.get(`${this.baseUrl}/employementStatus`);
  }

  getEductaionalLevel() {
    return this.http.get(`${this.baseUrl}/educationalLevels`);
  }

  getEductaionalInstitues() {
    return this.http.get(`${this.baseUrl}/educationalInstitues`);
  }

  getSpecialities() {
    return this.http.get(`${this.baseUrl}/specialities`);
  }

  getJobSeekers() {
    return this.http.get(`${this.baseUrl}/jobSeekers`);
  }
  getJobSeekersById(id: string) {
    return this.http.get(`${this.baseUrl}/jobSeekers/${id}`);
  }

  getJobSeekerByIdDetailed(id: string) {
    return this.http.get(
      `${this.baseUrl}/jobSeekers/getUserById/1680076011173`
    );
  }

  getTrainees() {
    return this.http.get(`${this.baseUrl}/trainees`);
  }

  getAcademicAttainments() {
    return this.http.get(`${this.baseUrl}/academicAttainments`);
  }

  getAcademicQualifications() {
    return this.http.get(`${this.baseUrl}/academicQualifications`);
  }

  getDocumentTypes() {
    return this.http.get(`${this.baseUrl}/documentTypes`);
  }


  getUaePassLink() {
    // return this.http.get(`${this.baseUrl}/auth/uaePassWebLink`);
    // https://stg-id.uaepass.ae/idshub/userinfo?response_type=code&client_id=sandbox_stage&scope=urn:uae:digitalid:profile:general&state=HnlHOJTkTb66Y5H&redirect_uri=http://3.28.78.204/public/uae-pass-redirection&acr_values=urn:safelayer:tws:policies:authentication:level:low
    return this.http.get(`${this.baseUrl}/auth/uaePassWebLink`);
  }

  loginWithUae(data: any) {
    return this.http.post(`${this.baseUrl}/auth/uaePassWebLogin`, data);
  }

  logoutFromUAE_PASS() {
    return this.http.get(`https://stg-id.uaepass.ae/idshub/logout?redirect_uri=${this.baseUrl}/public/login`);
  }


  getFaqs() {
    return this.http.get(`${this.baseUrl}/faqs`);
  }

  getCmsById(id: any) {
    return this.http.get(`${this.baseUrl}/cms/${id}`);
  }

  getSiteMap() {
    return this.http.get(`${this.baseUrl}/sitemapSections`);
  }

  getSearchByKeyword(query: any) {
    return this.http.get(`${this.baseUrl}/search/${query}`);
  }

  getAppiedCourseRegistrationById(id: any) {
    return this.http.post(`${this.baseUrl}/courseRegistration/apply/${id}`, {});
  }

  getAppiedJobSeekersById(id: any) {
    return this.http.post(`${this.baseUrl}/jobSeekers/apply/${id}`, {});
  }

  // =================  Discount Percentage ============================
  getAllDiscountPercentage() {
    return this.http.post(`${this.baseUrl}/discountPercentage/getAll`, {});
  }

  createSadaatiPartnersForm(data: any) {
    return this.http.post(`${this.baseUrl}/sadaatiPartners`, data);
  }

  updateSadaatiPartnersForm(data: any) {
    return this.http.put(`${this.baseUrl}/sadaatiPartners`, data);
  }

  getSadaatiPartners() {
    return this.http.get(`${this.baseUrl}/sadaatiPartners`);
  }

  getEventDetailById(id: string) {
    return this.http.get(`${this.baseUrl}/events/detail/${id}`);
  }

  getArticlesDetailById(id: string) {
    return this.http.get(`${this.baseUrl}/articles/detail/${id}`);
  }

  getSadaatiDetailById(id: string) {
    return this.http.get(`${this.baseUrl}/sadaatiPartners/byId/${id}`);
  }

  getPublications() {
    return this.http.get(`${this.baseUrl}/publications`);
  }

  getSpokepersons() {
    return this.http.get(`${this.baseUrl}/spokepersons`);
  }

  /*============== Sadaati Cards =============*/

  getsadaatiCards() {
    return this.http.get(`${this.baseUrl}/sadaatiCards`);
  }

  createSadaatiCards(data: any) {
    return this.http.post(`${this.baseUrl}/sadaatiCards`, data);
  }

  printSadaatiPartnersForm(data: any) {
    return this.http.post(`${this.baseUrl}/sadaatiCards/print`, data);
  }







  // =================  Sadati  User Registration ============================
  createSadatiPartnerUser(data: any) {
    return this.http.post(`${this.baseUrl}/auth/signUp`, data);
  }

  updateSadatiPartnerUser(data: any) {
    return this.http.put(`${this.baseUrl}/auth/update`, data);
  }

  loginSadatiPartnerUser(data: any) {
    return this.http.post(`${this.baseUrl}/auth/signIn`, data);
  }

  getSadatiPartnerUser() {
    return this.http.get(`${this.baseUrl}/auth/user`);
  }

  // =================  Forgot Password ============================
  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}/auth/forgotPassword`, email);
  }
  resetPassword(data: any) {
    return this.http.put(`${this.baseUrl}/auth/resetPassword`, data);
  }


  // =================  Simple User Registration ============================

  signUpUser(data: any) {
    return this.http.post(`${this.baseUrl}/users/signUp`, data);
  }
  updateUserPersonalInfo(data: any) {
    return this.http.put(`${this.baseUrl}/users/updateUser`, data);
  }
  updateUserType(data: any) {
    return this.http.put(`${this.baseUrl}/users/update`, data);
  }

  loginUser(data: any) {
    return this.http.post(`${this.baseUrl}/users/signIn`, data);
  }

  // =================  Recapcha Key ============================
  getRecaptchaKey() {
    return this.http.get(`${this.baseUrl}/cms/getRecaptchaKey`);
  }
  // =================  Recapcha Key ============================
  getAllSadaatiCtegories() {
    return this.http.post(`${this.baseUrl}/sadaatiCategories/getAll`, { sort: { "titleEN": 1 } });
  }


}
